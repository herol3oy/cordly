import { useState, useEffect, useContext } from 'react'
import NextLink from 'next/link'
import { auth, googleAuthProvider, facebookAuthProvider } from '../lib/firebase';
import { firestore } from '../lib/firebase'
import { UserContext } from '../lib/context'
import { FaFacebook } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react'
import { createUser } from '../utils/db'
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
    const [singleUser, singleUserSet] = useState(null)
    const [newProfileImg, newProfileImgSet] = useState('')

    const { user, username } = useContext(UserContext)

    const toast = useToast()

    const { colorMode, toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    const text = useColorModeValue('dark', 'light')

    const query = firestore.collection('users').doc(user?.uid)

    useEffect(() => {
        query.get().then((doc) => {
            doc.data()?.profileImg &&
                newProfileImgSet(doc.data().profileImg)
        })
    }, [user])

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then((response) => handleUser(response.user))
    }

    const signInWithFacebook = () => {
        auth.signInWithPopup(facebookAuthProvider)
            .then((response) => handleUser(response.user))
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
    }

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)

            createUser(user.uid, user)
            singleUserSet(user)
            return user
        } else {
            singleUserSet(false)
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
                    <Button
                        colorScheme={'twitter'}
                        leftIcon={<FaGoogle />}
                        onClick={signInWithGoogle}
                    >
                        Google
                    </Button>
                    <Button
                        colorScheme={'facebook'}
                        leftIcon={<FaFacebook />}
                        onClick={signInWithFacebook}
                    >
                        Facebook
                    </Button>
                </Stack>
            )}
            {user && (
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={'center'}
                >
                    <Text>
                        Hi {username || user.displayName}!
                    </Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Menu button"
                            icon={<Avatar showBorder={true} borderColor='green.200' name={user.displayName} src={newProfileImg || user.photoURL} />}
                            size="xs"
                            variant="outline"
                        />
                        <MenuList>
                            <MenuItem>
                                <NextLink href={'/dashboard'} passHref>
                                    <Link>
                                        Dashboard
                                    </Link>
                                </NextLink>
                            </MenuItem>

                            <MenuDivider />

                            <MenuItem onClick={signOut}>
                                Sign out
                             </MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            )}
        </Flex>
    )
}
