import Navigation from '../components/Navigation'
import { firestore } from '../lib/firebase'
import Musician from '../components/Musician'
import {
    Text,
    Flex,
    Container,
    IconProps,
    Icon,
    Box,
    useBreakpointValue,
    SimpleGrid
} from '@chakra-ui/react'

export default function Home({ musicians }) {
    return (
        <>
            <Navigation />
            <Container maxW="container.xl">
                <SimpleGrid columns={2}>
                    <Flex justify={'center'} flexDirection={'column'} alignItems={'center'} >
                        <Text
                            mt={12}
                            mb={4}
                            textStyle={'intro'}
                            textAlign={'left'}
                            fontSize={['2xl', '2xl', '4xl', '4xl']}
                        >
                            Musician Community Minimalized
                    </Text>
                        <Text
                            mt={6}
                            textStyle={'textsub'}
                            textAlign={'left'}
                            m={'auto'}
                            fontSize="2xl"
                            maxW={'container.md'}
                        >
                            We are taking a short break while we move
                            physical locations and get ready to launch the next
                    </Text>
                    </Flex>
                    <Text>Rightside</Text>
                </SimpleGrid>
            <Musician data={musicians} />
            </Container>

            <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
            />
        </>
    )
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -22, md: -1, lg: -2 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    )
}


export async function getServerSideProps() {
    const query = firestore.collection('users')

    const musicians = (await query.get()).docs.map((doc) => doc.data())

    return {
        props: { musicians },
    }
}
