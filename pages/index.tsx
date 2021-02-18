import { useState, useEffect } from 'react'
import { firestore } from '../lib/firebase'
import Musician from '../components/Musician'

export default function Home() {
	const [musicians, musiciansSet] = useState([])

	useEffect(async () => {
		const query = firestore
			.collection('users')
		const user = (await query.get()).docs.map((doc) => doc.data())
		musiciansSet(musicians.concat(user))
	}, [])

	return (
		<>
			<Musician data={musicians}/>
		</>
	)
}
