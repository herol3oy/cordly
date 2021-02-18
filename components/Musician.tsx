import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import map from 'lodash/map'
import Link from 'next/link'

export default function Musician({ data }) {

    const musicians = map(data, (i, idx: number) => (
        <div key={idx} className='col-3'>
            <Link href={i.uid}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={i.photoUrl} />
                    <Card.Body>
                        <Card.Title>{i.email}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    ))

    return (
        <Row>
            {musicians}
        </Row>
    )
}
