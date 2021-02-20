import { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import AuthCheck from '../components/AuthCheck'

export default function Dashboard(props) {
    return (
        <AuthCheck>
            <DashboardPanel />
        </AuthCheck>
    )
}

function DashboardPanel() {
    const [state, stateSet] = useState({ title: '', link: '', })
    const [urls, urlsSet] = useState([])

    const auth = useAuth()
    
    const query = firestore.collection('users')

    useEffect(() => {
        const getAllUrls = async () => {
            const userData = await query.where('uid', '==', auth.user.uid)
                .onSnapshot(snapshot => {
                    let changes = snapshot.docChanges()
                    changes.forEach(i => {
                        urlsSet(i.doc.data().urls)
                    })
                })
        }
        getAllUrls()
    }, [auth.user.uid])

    const addLink = () => {
        query.doc(auth.user.uid).update({
            urls: arrayUnion({ [state.title]: state.link })
        })

        stateSet({ title: '', link: '', })
    }

    const deleteLink = (title, link) => {
        query.doc(auth.user.uid).update({
            urls: arrayRemove({ [title]: link })
        })
    }

    return (
        <>
            <Form className='my-5'>
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
                        <Button className='w-100' variant="success" onClick={addLink}>+ Add</Button>
                    </Col>
                </Form.Row>
            </Form>

            {urls?.map((i, idx) => (
                <div className='my-2' key={idx}>
                    <a href={Object.values(i)[0].toString()} target='_blank'>
                        <Button className=' w-75' variant="outline-primary">
                            {Object.keys(i)[0]}
                        </Button>
                    </a>
                    <Button
                        className='w-25'
                        variant="outline-danger"
                        onClick={() => deleteLink(Object.keys(i)[0], Object.values(i)[0])}>X</Button>
                </div>
            ))}
        </>
    )
}
