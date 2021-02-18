import { firestore } from '../lib/firebase'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'next/image'
import styled from '@emotion/styled'

const StyledImage = styled(Image)`
    border-radius: 50%;
`

export default function User({ data }) {
    const {
        photoUrl,
        email,

    } = data[0]

    return (
        <>
            <Row className="d-flex justify-content-center text-center">
                <Col lg={2}>
                    <StyledImage
                        src={photoUrl}
                        alt="Profile picture"
                        width={100}
                        height={100}
                    />
                    <p>@{email.split('@')?.[0]}</p>
                </Col>
            </Row>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const ref = firestore.collection('users').where("uid", "==", params.slug)
    const data = (await ref.get()).docs.map((doc) => doc.data())
    return {
        props: { data },
    };
}