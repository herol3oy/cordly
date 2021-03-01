import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import { LinkIcon, DeleteIcon } from '@chakra-ui/icons'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import { FaPlusCircle } from 'react-icons/fa'
import _ from 'lodash'
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
    VStack,
    Heading,
} from '@chakra-ui/react'

export default function Links() {
    const [state, stateSet] = useState({ title: '', link: '' })
    const [urls, urlsSet] = useState([])

    const { user } = useContext(UserContext)

    const toast = useToast()

    const query = firestore.collection('users')

    useEffect(() => {
        const getAllUrls = async () => {
            query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
                let changes = snapshot.docChanges()
                changes.forEach((i) => urlsSet(i.doc.data().urls))
            })
        }
        getAllUrls()
    }, [user.uid])

    const addLink = () => {
        query.doc(user.uid).update({
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
        query.doc(user.uid).update({
            urls: arrayRemove({ [title]: link }),
        })

        toast({
            title: 'Link deleted.',
            status: 'error',
            duration: 2000,
        })
    }

    const userUrls = urls?.map((i, idx) => (
        <Flex
            key={idx}
            display={'flex'}
            justify={'center'}
            alignItems={'center'}
            margin={'auto'}
            flexDirection={'row'}
            w={['90vw', '70vw', '60vw', '30vw']}
        >
            <Stack
                rounded={'xl'}
                px={4}
                py={3}
                direction={'row'}
                alignItems={'flex-start'}
                w={'100%'}
                mb={2}
                spacing={2}
                bg="gray.700"
            >
                <Stack
                    color={'green.400'}
                    direction={'row'}
                    align={'center'}
                    w={'100%'}
                >
                    <LinkIcon />

                    <Link
                        textAlign="left"
                        href={Object.values(i)[0].toString()}
                        isExternal
                    >
                        <Text fontSize={'xl'} fontWeight={'bold'}>
                            {Object.keys(i)[0]}
                        </Text>
                        <Text fontSize={'sm'}>{Object.values(i)[0]}</Text>
                    </Link>
                    <Spacer />

                    <IconButton
                        onClick={() =>
                            deleteLink(Object.keys(i)[0], Object.values(i)[0])
                        }
                        aria-label={'Delete url'}
                        icon={<DeleteIcon color={'red.500'} />}
                    />
                </Stack>
            </Stack>
        </Flex>
    ))

    return (
        <Flex
            display={'flex'}
            justify={'center'}
            alignItems={'center'}
            margin={'auto'}
            flexDirection={'column'}
            w={['90vw', '70vw', '60vw', '30vw']}
        >
            <VStack my={'6'}>
                <Heading borderBottom={'1px'} pb={2} fontWeight="500" as="h1">
                    Social Links
                </Heading>
                <Text
                    fontSize={['xl', '2xl']}
                    color={useColorModeValue('gray.500', 'gray.200')}
                    maxW="lg"
                    textAlign="center"
                >
                    Add your social media links
                </Text>
            </VStack>
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

            {userUrls}
        </Flex>
    )
}
