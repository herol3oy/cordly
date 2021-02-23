import {
	Button,
	Stack,
	Text,
	IconButton,
	Heading,
	useColorModeValue,
	Spacer,
	Flex,
	useColorMode
} from "@chakra-ui/react"
import { useAuth } from '../utils/auth'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';

export default function Navigation() {
	const auth = useAuth()
	const { colorMode, toggleColorMode } = useColorMode()
	const SwitchIcon = useColorModeValue(FaMoon, FaSun)
	const text = useColorModeValue("dark", "light")

	return (
		<Flex
		align={{ base: 'flex-start', sm: 'center' }}
		direction={{ base: 'row', sm: 'row' }}
		justify="center"
		px={{ base: '3', md: '6', lg: '8' }}
		borderBottomColor={useColorModeValue("gray.100", "gray.700")}
		borderBottomWidth="2px"
		py="3"
		color='white'
		// bg={useColorModeValue("white", "gray.800")}
		bg='gray.800'
		shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
		// boxShadow="lg"
		
		>
			<Link href='/'>
				<a>
					<Heading>Cordly</Heading>
				</a>
			</Link>
			<Spacer />
			<IconButton
				size="md"
				fontSize="lg"
				aria-label={`Switch to ${text} mode`}
				variant="ghost"
				color="current"
				ml={{ base: "0", md: "3" }}
				icon={<SwitchIcon />}
				onClick={toggleColorMode}
				mr={2}
			/>
			{!auth.user && (
				<Stack
					direction={{ base: 'column', sm: 'row' }}

				>
					<Button
						colorScheme="twitter"
						leftIcon={<FaGoogle />}
						onClick={() => auth.signinWithGoogle()}>Google</Button>
					<Button
						colorScheme="facebook"
						leftIcon={<FaFacebook />}
						onClick={() => auth.signinWithFacebook()}>Facebook</Button>
				</Stack>
			)}
			{auth.user && (
				<Stack
					direction={{ base: 'column', sm: 'row' }}
					alignItems='center'
				>
					<Text>Welcome {auth.user.email.split('@')[0]}!</Text>
					<Button colorScheme="red" onClick={() => auth.signout()}>Sign out</Button>
					<Link href='/dashboard'>
						<Button colorScheme="pink">Dashboard</Button>
					</Link>
				</Stack>
			)}
		</Flex>
	)
}