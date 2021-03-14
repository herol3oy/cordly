import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../lib/context'
import { updateProfilePicture } from '../utils/db'
import { firestore, storage, STATE_CHANGED } from '../lib/firebase'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useForm, Controller } from "react-hook-form"
import { ThemeProvider } from "@material-ui/styles";
import {
    DatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers"
import styled from 'styled-components';
import DayjsUtils from "@date-io/dayjs"
import {
    Divider,
    Flex,
    Stack,
    chakra,
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
    RadioGroup,
    Radio,
    Progress,
    Spacer,
    useToast,
    IconButton,
} from '@chakra-ui/react'

export default function Bio({ avatarCoverImg, avatarCoverImgSet, dashboardFormSet }) {

    const [uploading, setUploading] = useState({ avatar: false, cover: false })
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState({ avatar: null, cover: null })
    const [imageFileChosenName, imageFileChosenNameSet] = useState({ avatar: 'No file choosen', cover: 'No file choosen' })
    const [googleLoc, googleLocSet] = useState(null)
    const [disabled, disabledSet] = useState(false)
    const [currentLocation, currentLocationSet] = useState('no value')
    const [radioEdu, radioEduSet] = useState<number | string>(null)
    const [radioGender, radioGenderSet] = useState<number | string>(null)
    const [birthdate, birthdateSet] = useState(new Date())
    const [colabSwitch, colabSwitchSet] = useState(false)

    const { register, handleSubmit, errors, control, setValue } = useForm({
        defaultValues: {
            stagename: '',
            location: '',
            skills: '',
            influences: '',
            education: '',
            collaboration: false,
            styles: '',
            gender: '',
            birthdate: '',
        }
    })

    const { user } = useContext(UserContext)

    const toast = useToast()

    const query = firestore.collection('users').where('uid', '==', user.uid)

    useEffect(() => {

        query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges()
            changes.forEach((i) => {
                avatarCoverImgSet({ ...avatarCoverImg, avatar: i.doc.data().profileImg, cover: i.doc.data().coverImg })

                setValue('stagename', i.doc.data().bio?.stagename)
                // setValue('location', i.doc.data().bio?.location)
                setValue('skills', i.doc.data().bio?.skills)
                setValue('influences', i.doc.data().bio?.influences)
                setValue('education', i.doc.data().bio?.education)
                setValue('styles', i.doc.data().bio?.styles)
                setValue('gender', i.doc.data().bio?.gender)
                setValue('birthdate', i.doc.data().bio?.birthdate)

                currentLocationSet(i.doc.data().bio?.location)

                birthdateSet(i.doc.data().bio?.birthdate?.toString())

                colabSwitchSet(i.doc.data().bio?.collaboration)
            })
        })

    }, [user.uid])


    const uploadFile = async (e) => {
        const file = e.target.files[0]
        const name = e.target.name
        const extension = file['type'].split('/')[1]

        if (name === 'avatar') {
            imageFileChosenNameSet({ ...imageFileChosenName, avatar: file['name'] })

            const ref = storage.ref(
                `uploads/${user.uid}/avatar-${Date.now()}.${extension}`
            )

            setUploading({ ...uploading, avatar: true })

            const task = ref.put(file)

            task.on(STATE_CHANGED, (snapshot) => {
                const pct = (
                    (snapshot.bytesTransferred / snapshot.totalBytes) *
                    100
                ).toFixed(0)
                setProgress(+pct)
            })

            task.then((d) => ref.getDownloadURL()).then((url) => {
                downloadURLSet({ ...downloadURL, avatar: url })
                updateProfilePicture(user.uid, url)
                setUploading({ ...uploading, avatar: false })
                toast({
                    title: "Profile image updated.",
                    status: "success",
                    duration: 2000,
                    isClosable: false,
                })
            })

        } else {
            imageFileChosenNameSet({ ...imageFileChosenName, cover: file['name'] })
            const ref = storage.ref(
                `uploads/${user.uid}/cover-${Date.now()}.${extension}`
            )

            setUploading({ ...uploading, cover: true })

            const task = ref.put(file)

            task.on(STATE_CHANGED, (snapshot) => {
                const pct = (
                    (snapshot.bytesTransferred / snapshot.totalBytes) *
                    100
                ).toFixed(0)
                setProgress(+pct)
            })

            task.then((d) => ref.getDownloadURL()).then((url) => {
                downloadURLSet({ ...downloadURL, cover: url })
                updateProfilePicture(user.uid, url)
                setUploading({ ...uploading, cover: false })
                toast({
                    title: "Cover image updated.",
                    status: "success",
                    duration: 2000,
                    isClosable: false,
                })
            })
        }


    }

    const onSubmit = (data) => {

        if (!googleLoc || !birthdate) {
            toast({
                title: "Error",
                description: 'Please fill in location or birthdate field',
                status: "error",
                duration: 2000,
                isClosable: false,
            })
        }

        else {
            disabledSet(true)

            const bio = {
                ...data,
                location: googleLoc?.label,
                birthdate: birthdate,
            }

            dashboardFormSet(bio)

            firestore
                .collection('users')
                .doc(user.uid)
                .update({ bio: bio })
                .finally(() => disabledSet(false))
        }
    }

    const StyledMuiPickersUtilsProvider = styled(MuiPickersUtilsProvider)`
             background-color: 'red' !important;
             color:'red' !important;
             background:'blue' !important;
    `

    return (
        <Flex
            flexDirection="column"
            w={['90vw', '70vw', 'sm', '30vw']}
        >
            <Stack>
                <InputGroup>
                    <InputLeftAddon children="📸 Profile Image" />
                    <Flex
                        w="100%"
                        whiteSpace="nowrap"
                        px={4}
                        align="center"
                        borderWidth={1}
                        borderRightRadius="md"
                    >
                        {imageFileChosenName.avatar.split('').slice(0, 20)}
                        <chakra.input
                            name='avatar'
                            type="file"
                            onChange={(e) => uploadFile(e)}
                            w="100%"
                            opacity={0}
                            pos="absolute"
                            inset="0"
                        />
                    </Flex>
                </InputGroup>

                {uploading.avatar &&
                    <Progress
                        hasStripe
                        size="xs"
                        colorScheme="green"
                        isIndeterminate={uploading.avatar}
                        value={progress > 0 ? progress : 0}
                    />}

                {/* <FormControl mb={'10'}>
                    <FormHelperText textAlign="left">
                        Update your profile picture by choosing a new file.
                    </FormHelperText>
                </FormControl> */}

                <InputGroup >
                    <InputLeftAddon children="🖼️ Cover Background" />
                    <Flex
                        w="100%"
                        whiteSpace="nowrap"
                        px={4}
                        align="center"
                        borderWidth={1}
                        borderRightRadius="md"
                    >
                        {imageFileChosenName.cover.split('').slice(0, 20)}
                        <chakra.input
                            name='coverImg'
                            type="file"
                            onChange={(e) => uploadFile(e)}
                            w="100%"
                            opacity={0}
                            pos="absolute"
                            inset="0"
                        />
                    </Flex>
                </InputGroup>

                {uploading.cover &&
                    <Progress
                        hasStripe
                        size="xs"
                        colorScheme="green"
                        isIndeterminate={uploading.cover}
                        value={progress > 0 ? progress : 0}
                    />}

                {/* <FormControl >
                    <FormHelperText textAlign="left">
                        Update your cover background by choosing a new image.
                    </FormHelperText>
                </FormControl> */}
            </Stack>

            <Divider my={6} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack width="100%" spacing={6}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="👩‍🎤 Stage Name" />
                            <Input
                                isDisabled={disabled}
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

                    {/* birthdate */}
                    <InputGroup>
                        <InputLeftAddon children="Birthdate" />
                        <Flex
                            align='flex-start'
                            borderWidth={1}
                            borderRightRadius="md"
                        // whiteSpace="nowrap"
                        // w="100%"
                        >
                            <IconButton
                                colorScheme="transparent"
                                aria-label="birthdate"
                                icon={<MuiPickersUtilsProvider utils={DayjsUtils}>
                                        <DatePicker
                                            variant="dialog"
                                            value={birthdate}
                                            onChange={(e) => birthdateSet(e.$d.toString())}
                                            openTo='year'
                                            animateYearScrolling={true}
                                            format="MM/DD/YYYY" />
                                    </MuiPickersUtilsProvider>}
                            />
                        </Flex>
                    </InputGroup>


                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="📍Location" />

                            <Box w={'100%'}>
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.NEXT_PUBLIC_API_KEY}
                                    selectProps={{
                                        name: 'googleLocation',
                                        required: true,
                                        isDisabled: disabled,
                                        googleLoc,
                                        onChange: googleLocSet,
                                        styles: {
                                            input: (provided) => ({
                                                ...provided,
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
                            new city. Current location: {currentLocation}
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="💯 Skills" />
                            <Input
                                isDisabled={disabled}
                                type='text'
                                name="skills"
                                placeholder="Guitar, Drum, Piano, Edit & Master, Base"
                                ref={register({ required: true })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 5 (max) skills seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="💅 Styles" />
                            <Input
                                isDisabled={disabled}
                                type='text'
                                name="styles"
                                placeholder="Rock, Pop, Jazz"
                                ref={register({ required: true })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 3 (max) styles seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon children="🔥 Influences" />
                            <Input
                                isDisabled={disabled}
                                type='text'
                                name="influences"
                                placeholder="Metallica, Pink Floyd, Coldplay"
                                ref={register({ required: true })}
                            />
                        </InputGroup>
                        <FormHelperText textAlign="left">
                            Please type your top 5 (max) influences seprating with comma ','
                        </FormHelperText>
                    </FormControl>

                    <Controller
                        as={<RadioGroup
                            rounded={'xl'}
                            px={4}
                            py={3}
                            direction={'row'}
                            alignItems={'center'}
                            spacing={2}
                            bg="gray.700"
                            color={'green.400'}
                            align={'center'}
                            size={'md'}
                            ref={register}
                            onChange={radioGenderSet}
                            value={radioGender}
                        >
                            <Stack direction="row">
                                <Text fontSize={['sm', 'lg']}>👾 Gender:</Text>
                                <Spacer />
                                <Radio isDisabled={disabled} name='female' value="female">👩‍🎤 Female</Radio>
                                <Radio isDisabled={disabled} name='male' value="male">👨‍🎤 Male</Radio>
                                <Radio isDisabled={disabled} name='non-binary' value="non-binary">Non-binary</Radio>
                            </Stack>
                        </RadioGroup>}
                        name='gender'
                        control={control}
                    />


                    <Controller
                        as={<RadioGroup
                            rounded={'xl'}
                            px={4}
                            py={3}
                            direction={'row'}
                            alignItems={'center'}
                            spacing={2}
                            bg="gray.700"
                            color={'green.400'}
                            align={'center'}
                            size={'md'}
                            ref={register}
                            onChange={radioEduSet}
                            value={radioEdu}
                        >
                            <Stack direction="row">
                                <Text>🎓 Education:</Text>
                                <Spacer />
                                <Radio isDisabled={disabled} name='self-taught' value="self-taught">Self-taught</Radio>
                                <Radio isDisabled={disabled} name='academic' value="academic">Academic</Radio>
                            </Stack>
                        </RadioGroup>}
                        name='education'
                        control={control}
                    />

                    <FormControl
                        rounded={'xl'}
                        px={4}
                        py={3}
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                        bg="gray.700"
                        color={'green.400'}
                        align={'center'}
                        display="flex"
                    >
                        <FormLabel htmlFor="collaboration" mb="0" >
                            🟢 Open to request for collaboration?
                        </FormLabel>
                        <Spacer />
                        <Switch
                            isChecked={colabSwitch}
                            // value={colabSwitch}
                            onChange={() => colabSwitchSet(p => !p)}
                            isDisabled={disabled}
                            name='collaboration'
                            size={'lg'}
                            colorScheme={'green'}
                            ref={register} />
                    </FormControl>

                    <Button
                        isLoading={disabled}
                        disabled={disabled}
                        // onClick={() => setValue("firstName", "Bill")}
                        type="submit" colorScheme="green">
                        Submit
                    </Button>

                </Stack>
            </form>
        </Flex>
    )
}