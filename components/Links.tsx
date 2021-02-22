import { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import { FaTrash } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import {
    Button,
    FormLabel,
    Input,
    Stack,
    useToast,
    Link,
    Spacer,
    Divider,
    Flex,
    FormControl,
} from "@chakra-ui/react"


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
            description: "Please add more links",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
    }

    const deleteLink = (title, link) => {
        query.doc(auth.user.uid).update({
            urls: arrayRemove({ [title]: link })
        })
    }

    return (
        <Flex
            display='flex'
            justify='center'
            alignItems='center'
            margin='auto'
            flexDirection='column'
            w={['90vw', '90vw', '60vw', '30vw']}
        >
            <FormControl

            >
                <FormLabel marginRight='auto'>Link</FormLabel>
                <Input
                    value={state.title}
                    onChange={(e) => stateSet({ ...state, title: e.target.value })}
                    name='title'
                    placeholder='Title (e.g. Youtube)'
                    mb={2}
                />
                <Input
                    value={state.link}
                    onChange={(e) => stateSet({ ...state, link: e.target.value })}
                    name='link'
                    placeholder='URL (e.g. https://youtube.com/2xS2k)'
                    mb={2}
                />
                <Button colorScheme='green' w='100%' onClick={addLink} leftIcon={<FaPlusCircle />}>Add</Button>
            </FormControl>
            <Divider my={5} />

            {urls?.map((i, idx) => (
                <Flex
                    display='flex'
                    justify='center'
                    alignItems='center'
                    margin='auto'
                    flexDirection='row'
                    w={['90vw', '90vw', '60vw', '30vw']}
                >
                    <Flex mb='2' w='100%' bg='orange.100'>
                        <Link href={Object.values(i)[0].toString()} target='_blank'>
                            <Button size='sm'  minWidth='100%'  >
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
