import { firestore } from '../lib/firebase'
import Musician from '../components/Musician'
import FeatureMusician from '../components/FeatureMusician'

export default function Home({ musicians }) {
    return (
        <>
            <FeatureMusician />
            <Musician data={musicians} />
        </>
    )
}

export async function getServerSideProps() {
    const query = firestore.collection('users')
    const musicians = (await query.get()).docs.map((doc) => doc.data())
    return {
        props: { musicians },
    }
}
