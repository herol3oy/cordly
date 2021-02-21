import Link from 'next/link'
import _ from 'lodash'
import { Box, Image, Text } from "@chakra-ui/react"

export default function Musician({ data }) {
    const musicians = _.map(data, (i, idx) => (
        <Box key={idx}>
            <Link href={i.uid}>
                <Box>
                    <Image src={i.photoUrl} />
                    <Box>
                        <Text>{i.email}</Text>
                    </Box>
                </Box>
            </Link>
        </Box>
    ))

    return (
        <>
            {musicians}
        </>
    )
}
