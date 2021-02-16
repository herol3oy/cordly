// import { getAllUsers } from '../utils/db'
import { useState, useEffect } from 'react'
import { firestore } from '../lib/firebase'
export default function Home() {
	const [users, usersSet] = useState([])

	useEffect(async () => {
		const query = firestore
			.collectionGroup('users')
		const user = (await query.get()).docs.map((doc) => doc.data());
		usersSet(users.concat(user))
	}, [])

	return (
		<>
			<pre>
				{JSON.stringify(users, null, 2)}
			</pre>
		</>
	)
}
