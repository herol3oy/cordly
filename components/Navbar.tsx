import { Flex, Box, Spacer, Button, Heading } from '@chakra-ui/react'
import { useAuth } from '../utils/auth'

export default function Navbar() {
	const auth = useAuth()
	return (
		<Flex p='16'>
			<Box p='2'>
				<Heading size='md'>Cordly</Heading>
			</Box>
			<Spacer />
			<Box>
				<Button
					onClick={(e) => auth.signinWithGoogle()}
					colorScheme='teal'>
					Sign Up
				</Button>
			</Box>
			{/* {console.log('header',auth.user)} */}

		</Flex>
	)
}
