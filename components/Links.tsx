import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import { FaPlusCircle } from 'react-icons/fa'
import { LinkIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Button,
    Input,
    Stack,
    useToast,
    Link,
    Spacer,
    Divider,
    Flex,
    InputGroup,
    InputLeftAddon,
    FormControl,
    Text,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react'

export default function Links() {
    const [state, stateSet] = useState({ title: '', link: '' })
    const [urls, urlsSet] = useState([])

    const auth = useAuth()

    const toast = useToast()

    const query = firestore.collection('users')

    useEffect(() => {
        const getAllUrls = async () => {
            await query
                .where('uid', '==', auth.user.uid)
                .onSnapshot((snapshot) => {
                    let changes = snapshot.docChanges()
                    changes.forEach((i) => {
                        urlsSet(i.doc.data().urls)
                    })
                })
        }
        getAllUrls()
    }, [auth.user.uid])

    const addLink = () => {
        query.doc(auth.user.uid).update({
            urls: arrayUnion({ [state.title]: state.link }),
        })

        stateSet({ title: '', link: '' })

        toast({
            title: 'Link added to your public portfolio.',
            status: 'success',
            duration: 2000,
        })
    }

    const deleteLink = (title, link) => {
        query.doc(auth.user.uid).update({
            urls: arrayRemove({ [title]: link }),
        })

        toast({
            title: 'Link deleted.',
            status: 'error',
            duration: 2000,
        })
    }

    return (
        <Flex
            display={'flex'}
            justify={'center'}
            alignItems={'center'}
            margin={'auto'}
            flexDirection={'column'}
            w={['90vw', '70vw', '60vw', '30vw']}
        >
            <FormControl>
                <Stack spacing={2}>
                    <InputGroup size={'lg'}>
                        <InputLeftAddon children={'Title'} />
                        <Input
                            type={'text'}
                            placeholder={'Youtube'}
                            value={state.title}
                            onChange={(e) =>
                                stateSet({ ...state, title: e.target.value })
                            }
                            name={'title'}
                        />
                    </InputGroup>
                    <InputGroup size={'lg'}>
                        <InputLeftAddon children={'URL'} />
                        <Input
                            type={'url'}
                            value={state.link}
                            onChange={(e) =>
                                stateSet({ ...state, link: e.target.value })
                            }
                            placeholder="https://youtube.com/cordly"
                        />
                    </InputGroup>
                    <Button
                        size={'lg'}
                        colorScheme={'green'}
                        w={'100%'}
                        onClick={addLink}
                        leftIcon={<FaPlusCircle />}
                    >
                        Add
                    </Button>
                </Stack>
            </FormControl>

            <Divider my={5} />

            {urls?.map((i, idx) => (
                <Flex
                    key={idx}
                    display={'flex'}
                    justify={'center'}
                    alignItems={'center'}
                    margin={'auto'}
                    flexDirection={'column'}
                    w={['90vw', '70vw', '60vw', '30vw']}
                >
                    <Stack
                        bg={useColorModeValue('gray.100', 'gray.900')}
                        rounded={'xl'}
                        px={4}
                        py={3}
                        direction={'row'}
                        align={'center'}
                        w={'100%'}
                        mb={2}
                    >
                        <Stack
                            color={'green.400'}
                            direction={'row'}
                            align={'center'}
                        >
                            <LinkIcon />
                            <NextLink href={Object.values(i)[0]} passHref>
                                <Link isExternal>
                                    <Text align={'left'} fontWeight={700}>
                                        {/* youtube */}
                                        {Object.keys(i)[0]}
                                    </Text>
                                    <Text fontSize="xs" color={'gray.400'}>
                                        {Object.values(i)[0]}
                                    </Text>
                                </Link>
                            </NextLink>
                        </Stack>
                        <Spacer />
                        <IconButton
                            onClick={() =>
                                deleteLink(
                                    Object.keys(i)[0],
                                    Object.values(i)[0]
                                )
                            }
                            aria-label={'Delete url'}
                            icon={<DeleteIcon color={'red.500'} />}
                        />
                    </Stack>
                </Flex>
            ))}
        </Flex>
    )
}
