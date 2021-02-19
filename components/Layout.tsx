import Container from 'react-bootstrap/Container'

export default function Layout({ children }) {
    return (
        <Container fluid>
            {children}
        </Container>
    )
}
