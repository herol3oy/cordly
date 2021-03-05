import { useRouter } from 'next/router'
import Navigation from '../components/Navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { createUser } from '../utils/db'
import { auth, googleAuthProvider, facebookAuthProvider } from '../lib/firebase'
import {
    Box,
    Flex,
    Stack,
    Center,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
} from '@chakra-ui/react'

const avatars = [
    {
        name: 'Ryan Florence',
        url: 'https://bit.ly/ryan-florence',
    },
    {
        name: 'Segun Adebayo',
        url: 'https://bit.ly/sage-adebayo',
    },
    {
        name: 'Kent Dodds',
        url: 'https://bit.ly/kent-c-dodds',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: 'https://bit.ly/prosper-baba',
    },
    {
        name: 'Christian Nwamba',
        url: 'https://bit.ly/code-beast',
    },
]

export default function SignIn() {

    const router = useRouter()

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider).then((response) =>
            handleUser(response.user)
        )

        router.push('/dashboard')
    }

    const signInWithFacebook = () => {
        auth.signInWithPopup(facebookAuthProvider).then((response) =>
            handleUser(response.user)
        )

        router.push('/dashboard')
    }

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)

            createUser(user.uid, user)
            return user
        } else {
            return false
        }
    }

    const formatUser = (user) => {
        return {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            provider: user.providerData[0].providerId,
            photoUrl: user.photoURL,
        }
    }

    return (
        <Box position={'relative'}>
            <Navigation />
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Senior web designers{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
              </Text>{' '}
              Full-Stack Developers
            </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                        content: '""',
                                        width: 'full',
                                        height: 'full',
                                        rounded: 'full',
                                        transform: 'scale(1.125)',
                                        bgGradient: 'linear(to-bl, red.400,pink.400)',
                                        position: 'absolute',
                                        zIndex: -1,
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
              </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            width={useBreakpointValue({ base: '44px', md: '60px' })}
                            height={useBreakpointValue({ base: '44px', md: '60px' })}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            YOU
              </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    {/* <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Join our team
                <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                !
                </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            We’re looking for amazing engineers just like you! Become a part
                            of our rockstar engineering team and skyrocket your career!
              </Text>
                    </Stack> */}
                    <Center p={8}>
                        <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>

                            {/* Google */}
                            <Button w={'full'} colorScheme={'facebook'} variant={'solid'} leftIcon={<FcGoogle />}>
                                <Center>
                                    <Text onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Text>
                                </Center>
                            </Button>

                            {/* Facebook */}
                            <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
                                <Center>
                                    <Text onClick={signInWithFacebook}>
                                        Sign in with Facebook
                                    </Text>
                                </Center>
                            </Button>

                        </Stack>
                    </Center>
                </Stack>
            </Container>
            <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
            />
        </Box>
    )
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1111, md: -1, lg: -9999 })}
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
