import { firestore } from '../lib/firebase'
import Musician from '../components/Musician'

export default function Home({ musicians }) {
	return (
		<>
			<Musician data={musicians} />
		</>
	)
}

export async function getServerSideProps() {
	const query = firestore.collection('users')
	const musicians = (await query.get()).docs.map((doc) => doc.data())
	return {
		props: { musicians }
	}
}
