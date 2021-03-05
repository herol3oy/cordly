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
        url: '/avatar.jpg',
    },
    {
        name: 'Segun Adebayo',
        url: '',
    },
    {
        name: 'Kent Dodds',
        url: '',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: '',
    },
    {
        name: 'Christian Nwamba',
        url: '',
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

    const handleSignUp = (e) => {
        e.preventDefault()

        // try {
        //     setError("")
        //     setLoading(true)
        //     await login(emailRef.current.value, passwordRef.current.value)
        //     history.push("/")
        // } catch {
        //     setError("Failed to log in")
        // }

        // setLoading(false)
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
                        Cordly brought pro musicians together{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            /
              </Text>{' '}
              That's why, you are here!
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
                    alignSelf='center'
                    bg={'gray.700'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>


                    <Stack spacing={4}>
                        <Heading
                            color={'gray.50'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Sign Up with Email
                        </Heading>
                    </Stack>

                    <Box as={'form'} mt={10} onSubmit={handleSignUp}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Email"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                placeholder="Password"
                                type='password'
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                type='password'
                                placeholder="Confirm password"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                        </Stack>
                        <Button
                            type={'submit'}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Submit
            </Button>
                    </Box>


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
