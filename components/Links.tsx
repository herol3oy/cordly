import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import { LinkIcon, DeleteIcon } from '@chakra-ui/icons'
import { firestore, arrayUnion, arrayRemove } from '../lib/firebase'
import { FaPlusCircle } from 'react-icons/fa'
import { useForm } from "react-hook-form"
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

export default function Links({ urls, urlsSet }) {

    const [data, dataSet] = useState({ title: '', url: '' })

    const { user } = useContext(UserContext)

    const toast = useToast()

    const query = firestore.collection('users')

    const { register, handleSubmit, watch, errors, reset } = useForm()

    useEffect(() => {
        const getAllUrls = async () => {
            query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
                let changes = snapshot.docChanges()
                changes.forEach((i) => urlsSet(i.doc.data().urls))
            })
        }
        getAllUrls()
    }, [user.uid])

    const addLink = async (data) => {
        const { title, url } = data

        await query.doc(user.uid).update({
            urls: arrayUnion({ [title]: url }),
        })


        toast({
            title: 'Link added to your public portfolio.',
            status: 'success',
            duration: 1000,
        })

        reset()
    }

    const deleteLink = (title, link) => {
        query.doc(user.uid).update({
            urls: arrayRemove({ [title]: link }),
        })

        toast({
            title: 'Link deleted.',
            status: 'error',
            duration: 1000,
        })
    }

    const handleKeyPress = (e, data) => {
        if (e.code === 'Enter') {

            addLink(data)
        }
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
                        <Text color='gray.300' fontSize={'sm'}>{Object.values(i)[0]}</Text>
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
                <Stack as={'form'} onSubmit={handleSubmit(addLink)} spacing={2}>
                    <InputGroup size={'lg'}>
                        <InputLeftAddon children={'Title'} />
                        <Input
                            onChange={(e) => dataSet({ ...data, title: e.target.value })}
                            value={data.title}
                            name={'title'}
                            type={'text'}
                            placeholder={'Youtube'}
                            ref={register}
                        />
                    </InputGroup>
                    <InputGroup size={'lg'}>
                        <InputLeftAddon children={'URL'} />
                        <Input
                            onChange={(e) => dataSet({ ...data, url: e.target.value })}
                            value={data.url}
                            name={'url'}
                            type={'url'}
                            placeholder="https://youtube.com/cordly"
                            ref={register}
                            onKeyPress={(e) => handleKeyPress(e, data)}

                        />
                    </InputGroup>
                    <Button
                        size={'lg'}
                        colorScheme={'green'}
                        w={'100%'}
                        type={'submit'}
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
