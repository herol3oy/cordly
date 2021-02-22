import _ from 'lodash'
import {
    Heading,
    Avatar,
    Box,
    Image,
    Text,
    LinkBox,
    LinkOverlay,
    Stack,
    Button,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Musician({ data }) {

    return (

        <SimpleGrid
            p={[2, 4, 1, 4]}
            columns={[2, 3, 6, 6]}
            spacing={10}
        >
            {
                _.map(data, (i, idx) => (
                    <LinkBox>
                        <Box
                            key={idx}
                            maxW={'270px'}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            overflow={'hidden'}>
                            <Image
                                h={'120px'}
                                w={'full'}
                                src='https://femalerockers.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fldn05m4o%2Fproduction%2Fdb81d58d73fdc6dbc20cf3f6cb7cb186247ba281-1200x801.jpg&w=1200&q=75'
                                objectFit={'cover'}
                            />
                            <Box
                                maxW={'320px'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'}
                                rounded={'lg'}
                                p={6}
                                textAlign={'center'}>
                                <Avatar
                                    mt={-12}
                                    size={'xl'}
                                    src={i.photoUrl}
                                    alt={'Avatar Alt'}
                                    mb={4}
                                    pos={'relative'}
                                    _after={{
                                        content: '""',
                                        w: 4,
                                        h: 4,
                                        bg: 'green.300',
                                        border: '2px solid white',
                                        rounded: 'full',
                                        pos: 'absolute',
                                        bottom: 0,
                                        right: 3,
                                    }}
                                />
                                <LinkOverlay href={i.uid}>
                                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                                        Lindsey James
                                    </Heading>
                                </LinkOverlay>
                                <Text fontWeight={600} color={'gray.500'} mb={4}>
                                    @{i.email.split('@')[0]}
                                </Text>
                                {/* <Text
                                textAlign={'center'}
                                color={useColorModeValue('gray.700', 'gray.400')}
                                px={3}>
                                Actress, musician, songwriter and artist. PM for work inquires or{' '}
                                <Link href={i.uid} color={'blue.400'}>
                                    #tag
                            </Link>{' '}
                             me in your posts
                        </Text> */}

                                {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #art
                            </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #photography
                            </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #music
                            </Badge>
                            </Stack> */}

                                <Stack mt={8} direction={'row'} spacing={4}>
                                    <Button
                                        flex={1}
                                        fontSize={'sm'}
                                        rounded={'full'}
                                        _focus={{
                                            bg: 'gray.200',
                                        }}>
                                        Message
                            </Button>
                                    <Button
                                        flex={1}
                                        fontSize={'sm'}
                                        rounded={'full'}
                                        bg={'blue.400'}
                                        color={'white'}
                                        boxShadow={
                                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                        }
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        _focus={{
                                            bg: 'blue.500',
                                        }}>
                                        Follow
                            </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </LinkBox>
                )
                )}
        </SimpleGrid>
    )
}
