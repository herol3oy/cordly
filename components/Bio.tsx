import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import { useForm } from 'react-hook-form'
import { updateProfilePicture } from '../utils/db'
import { firestore, storage, STATE_CHANGED } from '../lib/firebase'
import _ from 'lodash'
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
    Button,
    Select,
    Radio,
    RadioGroup,
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

export default function Bio({ profileImg, profileImgSet }) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState(null)
    const [avatarName, avatarNameSet] = useState('No file choosen')

    const [edu, eduSet] = useState('')
    const [collaboration, collaborationSet] = useState('')

    const initialState = {
        stagename: '',
        location: '',
        skills: '',
        influences: '',
        edu: '',
        collaboration: null,
    }

    const [dashboardForm, dashboardFormSet] = useState(initialState)


    const { user } = useContext(UserContext)

    const { register, handleSubmit } = useForm()

    const query = firestore.collection('users').where('uid', '==', user.uid)

    useEffect(() => {
        const getAllDashData = async () => {
            await query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
                let changes = snapshot.docChanges()
                changes.forEach((i) => {
                    profileImgSet(i.doc.data().profileImg)
                })
            })
        }
        getAllDashData()
    }, [user.uid])

    const uploadFile = async (e) => {
        const file = e.target.files[0]
        const extension = file['type'].split('/')[1]

        avatarNameSet(file['name'])

        const ref = storage.ref(
            `uploads/${user.uid}/${Date.now()}.${extension}`
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
            updateProfilePicture(user.uid, url)
            setUploading(false)
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        console.log(dashboardForm)

        firestore
            .collection('users')
            .doc(user.uid)
            .update(dashboardForm)

        dashboardFormSet(initialState)
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
                    src={profileImg || user.photoURL}
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

            <form onSubmit={handleSubmitForm}>
                <Stack width="100%" spacing={6}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="👩‍🎤 Stage Name" />
                            <Input
                                name="stagename"
                                placeholder="Lexi Rose"
                                value={dashboardForm.stagename}
                                onChange={(e) => dashboardFormSet({ ...dashboardForm, 'stagename': e.target.value })}
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
                                value={dashboardForm.location}
                                onChange={(e) => dashboardFormSet({ ...dashboardForm, 'location': e.target.value })}

                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Where are you based in. Change when you move to a
                            new city.
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="💯 Skills" />
                            <Input
                                name="skill"
                                placeholder="Guitarist, Drummer, Pianist"
                                value={dashboardForm.skills}
                                onChange={(e) => dashboardFormSet({ ...dashboardForm, 'skills': e.target.value })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 3 skills seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="🔥 Influences" />
                            <Input
                                name="influence"
                                placeholder="Metallica, Pink Floyd, Coldplay"
                                value={dashboardForm.influences}
                                onChange={(e) => dashboardFormSet({ ...dashboardForm, 'influences': e.target.value })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 3-5 influences seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <Select
                        onChange={(e) => dashboardFormSet({ ...dashboardForm, 'edu': e.target.value })}
                        placeholder="Choose your education"
                        size="lg"
                        variant="filled"
                    >
                        <option value="self-studied">Self-Studied</option>
                        <option value="academic">Academic</option>
                    </Select>

                    <Select
                        onChange={(e) => dashboardFormSet({ ...dashboardForm, 'collaboration': e.target.value === 'true' ? true : false })}
                        placeholder="Open to requests for collaboration"
                        size="lg"
                        variant="filled"
                    >
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                    </Select>



                    <Button type="submit" colorScheme="green">
                        Submit
                    </Button>

                </Stack>
            </form>

        </Flex>
    )
}