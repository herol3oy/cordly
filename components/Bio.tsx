import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../lib/context'
import { updateProfilePicture } from '../utils/db'
import { firestore, storage, STATE_CHANGED } from '../lib/firebase'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import _ from 'lodash'
import { useForm, Controller } from "react-hook-form"
import {
    Divider,
    Flex,
    Stack,
    chakra,
    Avatar,
    InputLeftAddon,
    InputGroup,
    FormControl,
    FormHelperText,
    Input,
    Button,
    Select,
    Text,
    Box,
    Switch,
    FormLabel,
} from '@chakra-ui/react'

export default function Bio({ profileImg, profileImgSet, dashboardFormSet }) {

    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState(null)
    const [avatarName, avatarNameSet] = useState('No file choosen')
    const [googleLoc, googleLocSet] = useState(null)

    const { register, handleSubmit, errors, control, reset, setValue } = useForm({
        defaultValues: {
            stagename: '',
            location: '',
            skills: '',
            influences: '',
            education: '',
            collaboration: false,
        }
    })

    const { user } = useContext(UserContext)
    const router = useRouter()

    const query = firestore.collection('users').where('uid', '==', user.uid)

    useEffect(() => {
        const getAllDashData = async () => {
            await query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
                let changes = snapshot.docChanges()
                changes.forEach((i) => {
                    profileImgSet(i.doc.data().profileImg)

                    setValue('stagename', i.doc.data().bio?.stagename)
                    setValue('location', i.doc.data().bio?.location)
                    setValue('skills', i.doc.data().bio?.skills)
                    setValue('influences', i.doc.data().bio?.influences)
                    setValue('education', i.doc.data().bio?.education)
                    setValue('collaboration', i.doc.data().bio?.collaboration)
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

    const onSubmit = (data) => {
console.log(data)

        const bio = {
            ...data,
            location: googleLoc.label
        }

        dashboardFormSet(bio)

        firestore
            .collection('users')
            .doc(user.uid)
            .update({ bio: bio })

        // reset()
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
                        {avatarName.split('').slice(0, 10)}
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
                <Stack width="100%" spacing={6}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="👩‍🎤 Stage Name" />
                            <Input
                                type='text'
                                name="stagename"
                                placeholder="Lexi Rose"
                                ref={register({ required: true })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Displays on your card in front page.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>

                        <InputGroup>
                            <InputLeftAddon children="📍Location" />

                            <Box w={'100%'}>
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.NEXT_PUBLIC_API_KEY}
                                    selectProps={{
                                        googleLoc,
                                        onChange: googleLocSet,
                                        styles: {
                                            input: (provided) => ({
                                                ...provided,
                                                borderBottomLeftRadius: '0 !important',
                                                borderBottomTopRadius: 0,
                                                paddingBottom: '2px',
                                            }),
                                            option: (provided) => ({
                                                ...provided,
                                                color: 'gray',
                                                backgroundColor: 'white',
                                            }),
                                        }
                                    }}
                                />
                            </Box>
                            {/* <Input
                                type='text'
                                name="location"
                                placeholder="Barcelona, Spain"
                                ref={register({ required: true })}
                            /> */}
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
                                type='text'
                                name="skills"
                                placeholder="Guitarist, Drummer, Pianist"
                                ref={register({ required: true })}
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
                                type='text'
                                name="influences"
                                placeholder="Metallica, Pink Floyd, Coldplay"
                                ref={register({ required: true })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 3-5 influences seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <Controller
                        as={<Select
                            ref={register}
                            placeholder="Choose your music education"
                            size="lg"
                            variant="filled"
                        >
                            <option value="self-studied">Self-Studied</option>
                            <option value="academic">Academic</option>
                        </Select>}
                        name="education"
                        control={control}
                    />

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="collaboration" mb="0" >
                            Open to request for collaboration?
                        </FormLabel>
                        <Switch name={'collaboration'} size={'lg'} colorScheme={'green'} ref={register} />
                    </FormControl>

                    <Button
                        // onClick={() => setValue("firstName", "Bill")}
                        type="submit" colorScheme="green">
                        Submit
                    </Button>

                </Stack>
            </form>
        </Flex>
    )
}