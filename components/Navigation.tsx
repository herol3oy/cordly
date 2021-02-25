import { useEffect, useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider, facebookAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context'
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
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Link,
} from '@chakra-ui/react'

export default function Navigation() {

    const { user, username } = useContext(UserContext)

    const router = useRouter();

    const toast = useToast()

    useEffect(() => {
        if (user) {
            toast({
                title: 'Welcome.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [user])

    const { colorMode, toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    const text = useColorModeValue('dark', 'light')

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    const signInWithFacebook = async () => {
        await auth.signInWithPopup(facebookAuthProvider);
    }

    const signOut = () => {
        auth.signOut()
        router.reload()

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
            <NextLink href={'/'} passHref>
                <Link>
                    <Heading>Cordly</Heading>
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

                        Welcome {username || user.email}!
                    </Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Menu button"
                            icon={<Avatar showBorder={true} borderColor='green.200' name={user.displayName} src={user.photoUrl} />}
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
