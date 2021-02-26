import { firestore } from '../lib/firebase'
import Musician from '../components/Musician'
import FeatureMusician from '../components/FeatureMusician'
import {
    Text,
    Flex,
    Container,
    Divider
} from '@chakra-ui/react'

export default function Home({ musicians }) {
    return (
        <Flex
            justify={'center'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Container
                maxW="container.xl"
            >

                <Text
                    mt={12}
                    mb={4}
                    textStyle={'intro'}
                    textAlign={'center'}
                    fontSize={['2xl','2xl','4xl','5xl']}
                >
                    Musician Community Minimalized
            </Text>
                <Text
                    mt={6}
                    textStyle={'textsub'}
                    textAlign={'center'}
                    m={'auto'}
                    fontSize='2xl'
                    maxW={'container.md'}
                >
                    Oh You Pretty Things is taking a short break while we move
                    physical locations and get ready to launch the next evolution of our site.

            </Text>
                {/* <FeatureMusician /> */}
                <Musician data={musicians} />
            </Container>
        </Flex>
    )
}

export async function getServerSideProps() {
    const query = firestore.collection('users')
    const musicians = (await query.get()).docs.map((doc) => doc.data())
    return {
        props: { musicians },
    }
}
