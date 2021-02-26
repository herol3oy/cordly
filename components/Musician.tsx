import Nextlink from 'next/link'
import _ from 'lodash'
import {
    SimpleGrid,
    Box,
    Image,
    Heading,
    Avatar,
    Text,
    LinkBox,
    Link,
    LinkOverlay,
    Stack,
    Button,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react'

export default function Musician({ data }) {
    return (

        <Flex mt={'28'}>
            {_.map(data, (i, idx) => (
                <Box key={idx}>
                    <Nextlink
                        href={`/${i.username ? i.username : i.uid}`}
                        passHref
                    >
                        <Link>
                            <Avatar
                                size="xl"
                                name={i.name}
                                src={i.photoUrl}
                                objectFit='cover'
                            />
                        </Link>
                    </Nextlink>
                </Box>
            ))}
        </Flex>
    )
}
