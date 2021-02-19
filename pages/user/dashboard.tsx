import { useState, useEffect } from 'react'
import { useAuth } from '../../utils/auth'
import { firestore, arrayUnion } from '../../lib/firebase'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import _mapKeys from 'lodash/mapKeys'

export default function Dashboard() {
    const [state, stateSet] = useState({ title: '', link: '', })
    const [urls, urlsSet] = useState([])

    const auth = useAuth()
    
    useEffect(() => {
        const getAllUrls = async () => {
            (await firestore
                .collection('users')
                .where('uid', '==', auth.user.uid).get())
                .docs.map((doc) => urlsSet(doc.data().urls))
            // urlsSet(urls.concat(query))
        }
        getAllUrls()
    }, [auth.user.uid]);

    const addLink = () => {
        const query = firestore.collection('users')
        const getData = query.where('uid', '==', auth.user.uid).get()
        getData
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const urlRef = firestore.collection('users').doc(doc.id)
                    urlRef.update({
                        urls: arrayUnion({ [state.title]: state.link })
                    })
                })
                // const newData = (getData.docs.map((doc) => doc.data())
                const newData = getData.then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        urlsSet(doc.data().urls)
                    })
                })
            })
            .catch((error) => {
                console.log('Error updateing documents: ', error)
            })
    }

    return (
        <>
            <Form>
                <Form.Row>
                    <Col lg={3}>
                        <Form.Control
                            value={state.title}
                            onChange={(e) => stateSet({ ...state, title: e.target.value })}
                            name='title' placeholder='Link title'
                        />
                    </Col>
                    <Col lg={6}>
                        <Form.Control
                            value={state.link}
                            onChange={(e) => stateSet({ ...state, link: e.target.value })}
                            name='link' placeholder='Add your social link'
                        />
                    </Col>
                    <Col lg={3}>
                        <Button variant="success" onClick={() => addLink()}>+ Add</Button>
                    </Col>
                </Form.Row>
            </Form>
            <pre>
                {JSON.stringify(urls, null, 2)}
            </pre>
        </>
    )
}
