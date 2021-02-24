import { useState, useEffect } from 'react'
import { updateProfilePicture } from '../utils/db'
import { useAuth } from '../utils/auth'
import { firestore, storage, STATE_CHANGED, arrayUnion } from '../lib/firebase'
import _ from 'lodash'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useForm } from 'react-hook-form'
import {
    Divider,
    Flex,
    Stack,
    chakra,
    Avatar,
    InputLeftAddon,
    InputGroup,
    FormControl,
    Text,
    FormHelperText,
    Input,
    Code,
    Button,
} from '@chakra-ui/react'

export interface Item {
    label: string
    value: string
}

const countries = [
    { value: 'guitaris', label: 'Guitaris' },
    { value: 'drummer', label: 'Drummer' },
    { value: 'vocalist', label: 'Vocalist' },
    { value: 'bassist', label: 'Bassist' },
    { value: 'keyboardist', label: 'Keyboardist' },
]

export default function Bio() {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState(null)
    const [data, dataSet] = useState('/avatar.png')
    const [avatarName, avatarNameSet] = useState('No file choosen')
    const [pickerItems, setPickerItems] = useState(countries)
    const [selectedItems, setSelectedItems] = useState([])

    const auth = useAuth()

    const { register, handleSubmit, watch, errors } = useForm()

    const query = firestore
        .collection('users')
        .where('uid', '==', auth.user.uid)

    useEffect(() => {
        const getAllDashData = async () => {
            await query
                .where('uid', '==', auth.user.uid)
                .onSnapshot((snapshot) => {
                    let changes = snapshot.docChanges()
                    changes.forEach((i) => {
                        dataSet(i.doc.data().profileImg)
                    })
                })
        }
        getAllDashData()
    }, [auth.user.uid])

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item])
        setSelectedItems((curr) => [...curr, item])
    }

    const handleSelectedItemsChange = (selectedItems) => {
        if (selectedItems) {
            setSelectedItems(selectedItems)
        }
    }

    const customRender = (selected) => {
        return (
            <Flex flexDir="row" alignItems="center">
                <Avatar mr={2} size="sm" name={selected.label} />
                <Text>{selected.label}</Text>
            </Flex>
        )
    }

    const onSubmit = (data) => {
        const skills = selectedItems.map((i) => {
            const label = Object.values(i)[1]
            return label
        })

        firestore
            .collection('users')
            .doc(auth.user.uid)
            .update({
                ...data,
                skills,
            })
    }

    const uploadFile = async (e) => {
        const file = e.target.files[0]
        const extension = file['type'].split('/')[1]

        avatarNameSet(file['name'])

        const ref = storage.ref(
            `uploads/${auth.user.uid}/${Date.now()}.${extension}`
        )
        setUploading(true)

        const task = ref.put(file)

        task.on(STATE_CHANGED, (snapshot) => {
            const pct = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
            ).toFixed(0)
            setProgress(+pct)
        })

        task.then((d) => ref.getDownloadURL()).then((url) => {
            downloadURLSet(url)
            updateProfilePicture(auth.user.uid, url)
            setUploading(false)
        })
    }

    return (
        <Flex
            display="flex"
            justify="center"
            alignItems="center"
            margin="auto"
            flexDirection="column"
            w={['90vw', '70vw', '60vw', '30vw']}
        >
            <Stack>
                <Avatar
                    src={data || auth.user.photoUrl || '/avatar.png'}
                    alt="Profile picture"
                    size="xl"
                    margin="auto"
                    mb={4}
                />
                <InputGroup>
                    <InputLeftAddon children="📸 Choose file" />
                    <Flex
                        w="100%"
                        whiteSpace="nowrap"
                        px={4}
                        align="center"
                        borderWidth={1}
                        borderRightRadius="md"
                    >
                        {avatarName}
                        <chakra.input
                            type="file"
                            onChange={(e) => uploadFile(e)}
                            w="100%"
                            opacity={0}
                            pos="absolute"
                            inset="0"
                        />
                    </Flex>
                </InputGroup>
                <FormControl>
                    <FormHelperText textAlign="left">
                        Update your avatar by choosing a new image.
                    </FormHelperText>
                </FormControl>
            </Stack>

            <Divider my={8} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack width="100%" spacing={8}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="👩‍🎤 Stage Name" />
                            <Input
                                name="stagename"
                                placeholder="Lexi Rose"
                                ref={register}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Displays on your card in front page.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="📍Location" />
                            <Input
                                name="location"
                                placeholder="Barcelona, Spain"
                                ref={register}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Where are you based in. Change when you move to a
                            new city.
                        </FormHelperText>
                    </FormControl>
                    <CUIAutoComplete
                        tagStyleProps={{
                            rounded: 'full',
                        }}
                        listStyleProps={{
                            bg: 'gray.900',
                            textAlign: 'left',
                        }}
                        highlightItemBg="gray.300"
                        label="🤹🏽 Skills"
                        placeholder="Type your skill"
                        onCreateItem={handleCreateItem}
                        items={pickerItems}
                        itemRenderer={customRender}
                        selectedItems={selectedItems}
                        onSelectedItemsChange={(changes) =>
                            handleSelectedItemsChange(changes.selectedItems)
                        }
                    />
                    <Button type="submit" colorScheme="green">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Flex>
    )
}
