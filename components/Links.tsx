import { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import { FaTrash } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
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
} from "@chakra-ui/react"
import { Head } from 'next/document';


export default function Links() {
    const [state, stateSet] = useState({ title: '', link: '', })
    const [urls, urlsSet] = useState([])

    const auth = useAuth()

    const toast = useToast()

    const query = firestore.collection('users')

    useEffect(() => {
        const getAllUrls = async () => {
            const userData = await query.where('uid', '==', auth.user.uid)
                .onSnapshot(snapshot => {
                    let changes = snapshot.docChanges()
                    changes.forEach(i => {
                        urlsSet(i.doc.data().urls)
                    })
                })
        }
        getAllUrls()
    }, [auth.user.uid])

    const addLink = () => {
        query.doc(auth.user.uid).update({
            urls: arrayUnion({ [state.title]: state.link })
        })

        stateSet({ title: '', link: '', })
        toast({
            title: "Link added to your public portfolio.",
            status: "success",
            duration: 3000,
        })
    }

    const deleteLink = (title, link) => {
        query.doc(auth.user.uid).update({
            urls: arrayRemove({ [title]: link })
        })

        toast({
            title: "Link deleted.",
            status: 'error',
            duration: 2000,
        })
    }

    return (
        <Flex
            display='flex'
            justify='center'
            alignItems='center'
            margin='auto'
            flexDirection='column'
            w={['90vw', '70vw', '60vw', '30vw']}
            mt={24}
        >
            <FormControl>
                <Stack spacing={2}>
                    <InputGroup size='lg'>
                        <InputLeftAddon children="Title" />
                        <Input
                            type='text'
                            placeholder="Youtube"
                            value={state.title}
                            onChange={(e) => stateSet({ ...state, title: e.target.value })}
                            name='title'
                        />
                    </InputGroup>
                    <InputGroup size='lg'>
                        <InputLeftAddon children='URL' />
                        <Input
                            value={state.link}
                            onChange={(e) => stateSet({ ...state, link: e.target.value })}
                            placeholder='https://youtube.com/cordly'
                        />
                    </InputGroup>
                    <Button size='lg' colorScheme='green' w='100%' onClick={addLink} leftIcon={<FaPlusCircle />}>Add</Button>
                </Stack>
            </FormControl>

            <Divider my={5} />

            {urls?.map((i, idx) => (
                <Flex
                    display='flex'
                    justify='center'
                    alignItems='center'
                    margin='auto'
                    flexDirection='row'
                    w={['90vw', '70vw', '60vw', '30vw']}
                    key={idx}
                >
                    <Flex mb='2' width='100%'>
                        <Link width='90%' href={Object.values(i)[0].toString()} isExternal>
                            <Button size='sm' minWidth='100%'  >
                                {Object.keys(i)[0]}
                            </Button>
                        </Link>
                        <Spacer />
                        <Button
                            size='sm'
                            colorScheme='red'
                            onClick={() => deleteLink(Object.keys(i)[0], Object.values(i)[0])}>
                            <FaTrash />
                        </Button>
                    </Flex>
                </Flex>
            ))}

        </Flex>
    )
}
