import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../utils/auth'
import Link from 'next/link'

export default function Navigation() {
	const auth = useAuth()
	return (
		<Navbar bg="dark" variant="dark">
			<Link href='/'>
				<Navbar.Brand href="#home">Cordly</Navbar.Brand>
			</Link>
			<Nav className="mr-auto">
				<Nav.Link href="#home">Home</Nav.Link>
				<Nav.Link href="#features">Features</Nav.Link>
				<Nav.Link href="#pricing">Pricing</Nav.Link>
			</Nav>
			{!auth.user && (
				<>
					<Button onClick={() => auth.signinWithGoogle()} variant="outline-info">Google</Button>
					<Button onClick={() => auth.signinWithFacebook()} variant="outline-success">Facebook</Button>
				</>
			)}
			{auth.user && (
				<>
					<small className='text-light'>Welcome {auth.user.email}!</small>
					<Button onClick={(e) => auth.signout()} variant="outline-danger">Sign out</Button>
					<Link href='/dashboard'>
						<Button variant="outline-success">Dashboard</Button>
					</Link>
				</>
			)}
		</Navbar>
	)
}