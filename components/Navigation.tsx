import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { createUser } from '../utils/db'
import { auth, googleAuthProvider, facebookAuthProvider } from '../lib/firebase'
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
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Link,
} from '@chakra-ui/react'

export default function Navigation() {
    const [newProfileImg, newProfileImgSet] = useState('')

    const { user, username } = useContext(UserContext)

    const toast = useToast()
    const router = useRouter()

    const { colorMode, toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    const text = useColorModeValue('dark', 'light')

    const query = firestore.collection('users').doc(user?.uid)

    useEffect(() => {
        query.get().then((doc) => {
            doc.data()?.profileImg && newProfileImgSet(doc.data().profileImg)
        })
    }, [user])

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider).then((response) =>
            handleUser(response.user)
        )
    }

    const signInWithFacebook = () => {
        auth.signInWithPopup(facebookAuthProvider).then((response) =>
            handleUser(response.user)
        )
    }

    const signOut = () => {
        auth.signOut()

        toast({
            title: 'See ya!.',
            description: 'Good news for you!',
            status: 'error',
            duration: 2000,
            isClosable: false,
        })

        router.push('/')
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
            <NextLink href={'/'} passHref>
                <Link>
                    <Heading textStyle={'logo'}>Cordly</Heading>
                </Link>
            </NextLink>

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
            {!user && (
                <Stack direction={{ base: 'column', sm: 'row' }}>
                    <NextLink href={'/signin'} passHref>
                        <Link>
                            <Button
                                colorScheme={'blue'}
                                variant='solid'
                            >
                                Sign Up
                    </Button>
                        </Link>
                    </NextLink>
                </Stack>
            )}
            {user && (
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={'center'}
                >
                    <Text display={['none', 'block']}>
                        Hi {username || user.displayName?.split(' ')[0] || 'Sneeky'}!
                    </Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Menu button"
                            icon={
                                <Avatar
                                    showBorder={true}
                                    borderColor={'white'}
                                    name={user.displayName}
                                    src={newProfileImg || user.photoURL}
                                />
                            }
                            size="xs"
                            variant="outline"
                        />
                        <MenuList>
                            <MenuItem>
                                <NextLink href={'/dashboard'} passHref>
                                    <Link>Dashboard</Link>
                                </NextLink>
                            </MenuItem>

                            <MenuDivider />

                            <MenuItem onClick={signOut}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            )}
        </Flex>
    )
}
