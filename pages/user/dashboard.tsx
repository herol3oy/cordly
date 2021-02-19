import { useState } from 'react'
import { useAuth } from '../../utils/auth'
import { firestore, arrayUnion } from '../../lib/firebase'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Dashboard() {
    const [state, stateSet] = useState({ title: '', link: '', })

    const auth = useAuth()

    const addLink = () => {
        const ref = firestore.collection('users')
        ref
            .where('uid', '==', auth.user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const urlRef = firestore.collection('users').doc(doc.id)
                    urlRef.update({
                        urls: arrayUnion({ [state.title]: state.link })
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
        </>
    )
}
