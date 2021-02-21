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
			py="3"
			direction={{ base: 'row', sm: 'row' }}
			px={{ base: '3', md: '6', lg: '8' }}
			color="white"
			bg={useColorModeValue('blue.600', 'blue.400')}
			justify="center"
			align={{ base: 'flex-start', sm: 'center' }}
		>
			<Heading>Cordly</Heading>
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