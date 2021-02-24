import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../utils/auth'
import { FaFacebook } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react'
import {
    Button,
    Stack,
    Text,
    IconButton,
    Heading,
    useColorModeValue,
    Spacer,
    Flex,
    useColorMode,
} from '@chakra-ui/react'

export default function Navigation() {
    const [userSignin, userSigninSet] = useState(false)

    const auth = useAuth()

    const toast = useToast()

    const uid = auth.user?.uid

    useEffect(() => {
        if (userSignin && uid !== undefined) {
            toast({
                title: 'Welcome.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [uid, userSignin])

    const { colorMode, toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    const text = useColorModeValue('dark', 'light')

    const googleSignin = () => {
        auth.signinWithGoogle()

        userSigninSet(true)
    }

    const facebookSignin = () => {
        auth.signinWithFacebook()

        userSigninSet(true)
    }

    const signOut = () => {
        auth.signout()

        userSigninSet(false)

        toast({
            title: 'See ya!.',
            description: 'Good news for you!',
            status: 'error',
            duration: 2000,
            isClosable: false,
        })
    }

    return (
        <Flex
            align={{ base: 'flex-start', sm: 'center' }}
            direction={{ base: 'row', sm: 'row' }}
            justify={'center'}
            px={{ base: '3', md: '6', lg: '8' }}
            borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
            borderBottomWidth={'2px'}
            py={'3'}
            color={'white'}
            bg={'gray.800'}
            shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
        >
            <Link href={'/'}>
                <a>
                    <Heading>Cordly</Heading>
                </a>
            </Link>
            <Spacer />
            <IconButton
                size={'md'}
                fontSize={'lg'}
                aria-label={`Switch to ${text} mode`}
                variant={'ghost'}
                color={'current'}
                ml={{ base: '0', md: '3' }}
                icon={<SwitchIcon />}
                onClick={toggleColorMode}
                mr={2}
            />
            {!auth.user && (
                <Stack direction={{ base: 'column', sm: 'row' }}>
                    <Button
                        colorScheme={'twitter'}
                        leftIcon={<FaGoogle />}
                        onClick={googleSignin}
                    >
                        Google
                    </Button>
                    <Button
                        colorScheme={'facebook'}
                        leftIcon={<FaFacebook />}
                        onClick={facebookSignin}
                    >
                        Facebook
                    </Button>
                </Stack>
            )}
            {auth.user && (
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={'center'}
                >
                    <Text>Welcome {auth.user.email.split('@')[0]}!</Text>
                    <Button colorScheme={'red'} onClick={signOut}>
                        Sign out
                    </Button>
                    <Link href={'/dashboard'}>
                        <Button colorScheme={'pink'}>Dashboard</Button>
                    </Link>
                </Stack>
            )}
        </Flex>
    )
}
