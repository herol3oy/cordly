import { GetServerSideProps } from 'next'
import { firestore } from '../lib/firebase'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'next/image'
import styled from '@emotion/styled'

const StyledImage = styled(Image)`
    border-radius: 50%;
`

export default function User({ data }) {

    const {
        photoUrl,
        email,
        urls,
    } = data[0]

    return (
        <>
            <Row className="d-flex justify-content-center text-center">
                <Col lg={7}>
                    <StyledImage
                        src={photoUrl}
                        alt="Profile picture"
                        width={100}
                        height={100}
                    />
                    <p>@{email.split('@')?.[0]}</p>

                    {
                        urls?.map((i, idx) => (
                            <a key={idx} href={Object.values(i)[0]}>
                                <Button className='mb-2 w-100' variant="outline-primary">{Object.keys(i)[0]}</Button>
                            </a>
                        ))

                    }
                </Col>
            </Row>




        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const ref = firestore.collection('users').where("uid", "==", params.slug)
    const data = (await ref.get()).docs.map((doc) => doc.data())
    return {
        props: { data },
    };
}