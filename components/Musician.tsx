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
        <Stack
        spacing={2}
        flexDir='row'
        >

            {_.map(data, (i) => (
                <Box
                    key={i.uid}
                    width={['400px', '200px', '100px', '150px']}
                    p={3}
                    minH={['150px', '170px', '200px', '100px']}
                    bg='gray.900'
                >
                    <Nextlink href={`/${i.uid}`} passHref>
                        <Link>
                            <Stack >
                                <Avatar
                                    borderRadius={[20, 40, 20, 80]}
                                    // h={'200px'}
                                    size="xl"
                                    name={i.name}
                                    src={i.photoUrl}
                                    objectFit='cover'
                                />
                                <Text fontSize={'xs'}>{i.name}</Text>
                            </Stack>
                        </Link>
                    </Nextlink>
                </Box>
            ))}
        </Stack>
    )
}
