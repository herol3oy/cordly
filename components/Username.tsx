import debounce from 'lodash.debounce'
import { useState, useEffect, useCallback, useContext } from 'react'
import { UserContext } from '../lib/context'
import { useForm } from 'react-hook-form'
import { firestore } from '../lib/firebase'
import { FaCheck, FaTimes } from 'react-icons/fa'
import {
    Stack,
    InputLeftAddon,
    InputGroup,
    FormControl,
    FormHelperText,
    Input,
    Code,
    Button,
    Alert,
    AlertIcon,
    InputRightElement,
    Spinner,
} from '@chakra-ui/react'

export default function Username({ formValue, formValueSet, userNameValue, userNameValueSet }) {
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useContext(UserContext)

    const query = firestore.collection('users').doc(user.uid)

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        query.get().then((doc) => {
            if (doc.data()?.username === undefined) {
                userNameValueSet(user.uid)
            }
            userNameValueSet(doc.data()?.username)
        })

        checkUsername(formValue)
    }, [formValue])

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                await query.get().then((doc) => {
                    if (doc.data().username === username) {
                        setIsValid(false)
                        setLoading(false)
                    } else {
                        setIsValid(true)
                        setLoading(false)
                    }
                })
            }
        }, 500),
        []
    )

    const onChange = (e) => {
        const val = e.target.value.toLowerCase()
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

        if (val.length < 3) {
            formValueSet(val)
            setLoading(false)
            setIsValid(false)
        }

        if (re.test(val)) {
            formValueSet(val)
            setLoading(true)
            setIsValid(false)
        }
    }

    const onSubmit = () => {
        query.update({ username: formValue })

        userNameValueSet(formValue)
        formValueSet('')
        setIsValid(false)
    }

    const inputStatus = () => {
        if (loading) {
            return <Spinner color={'gray.100'} bg={'transparent'} />
        }
        if (isValid) {
            return <FaCheck color={'green.100'} />
        }
        if (formValue && !isValid) {
            return <FaTimes color={'red'} />
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="100%" spacing={8}>
                <FormControl>
                    <InputGroup>
                        <InputLeftAddon children="🔑 cord.ly/" />
                        <Input
                            value={formValue}
                            onChange={onChange}
                            name="username"
                            placeholder="Update your username"
                            ref={register}
                        />

                        {
                            <InputRightElement
                                color="green.500"
                                children={inputStatus()}
                            />
                        }
                    </InputGroup>
                    <FormHelperText
                        color={'gray.200'}
                        mt={'3'}
                        textAlign="left"
                    >
                        Current username:
                        <Code fontSize="lg" colorScheme="green">
                            https://cord.ly/
                            {formValue || userNameValue || user.uid.slice(0, 5)}
                        </Code>
                    </FormHelperText>
                    <Button
                        mt={'10'}
                        type="submit"
                        colorScheme="green"
                        disabled={!isValid}
                    >
                        Submit
                    </Button>
                </FormControl>
                <UsernameMessage
                    username={formValue}
                    isValid={isValid}
                    loading={loading}
                />
            </Stack>
        </form>
    )
}

const UsernameMessage = ({ username, isValid, loading }) => {
    if (loading) {
        return (
            <Alert status="info">
                <AlertIcon />
                Checking...
            </Alert>
        )
    } else if (isValid) {
        return (
            <Alert status="success" variant="solid">
                <AlertIcon />
                {username} is available!
            </Alert>
        )
    } else if (username && !isValid) {
        return (
            <Alert status="error">
                <AlertIcon />
                That username is taken!
            </Alert>
        )
    } else {
        return <p></p>
    }
}
