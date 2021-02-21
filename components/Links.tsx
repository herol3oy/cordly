import { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import {
    Button,
    FormControl,
} from "@chakra-ui/react"


export default function Links() {
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
            <FormControl className='my-5'>
                <input
                    value={state.title}
                    onChange={(e) => stateSet({ ...state, title: e.target.value })}
                    name='title' placeholder='Link title'
                />
                <input
                    value={state.link}
                    onChange={(e) => stateSet({ ...state, link: e.target.value })}
                    name='link' placeholder='Add your social link'
                />
                <Button onClick={addLink}>+ Add</Button>
            </FormControl>

            {urls?.map((i, idx) => (
                <div key={idx}>
                    <a href={Object.values(i)[0].toString()} target='_blank'>
                        <Button>
                            {Object.keys(i)[0]}
                        </Button>
                    </a>
                    <Button
                        onClick={() => deleteLink(Object.keys(i)[0], Object.values(i)[0])}>X</Button>
                </div>
            ))}
        </>
    )
}
