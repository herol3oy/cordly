import { useState, useEffect } from 'react'
import { firestore } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function User() {
    const [users, usersSet] = useState(null)
    const router = useRouter()
    const { slug } = router.query

    useEffect(async () => {
        const query = firestore
            .collection('users')
        const user = (await query.where("uid", "==", 'VZu2twkPqta2IAmdkHVgAqD9q0K3').get()).docs.map((doc) => doc.data())
        usersSet(user)

    }, [])

    return (
        <>
            <pre>
                {slug}
                {JSON.stringify(users, null, 2)}
                {console.log(users)}
            </pre>
        </>
    )
}