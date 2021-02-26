import { useState, useEffect, useCallback, useContext } from 'react'
import { firestore } from '../lib/firebase'
import { useForm } from 'react-hook-form'
import { UserContext } from '../lib/context'
import { useAuth } from '../utils/auth'
import debounce from 'lodash.debounce'
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
} from '@chakra-ui/react'

export default function Username() {
    const [formValue, setFormValue] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userNameValue, userNameValueSet] = useState('')

    // const auth = useAuth()

    const {user, username} = useContext(UserContext)


    const query = firestore.collection('users').doc(user.uid)

    const { register, handleSubmit, watch, reset, errors } = useForm()

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
            setFormValue(val)
            setLoading(false)
            setIsValid(false)
        }

        if (re.test(val)) {
            setFormValue(val)
            setLoading(true)
            setIsValid(false)
        }
    }

    const onSubmit = () => {
        query.update({ username: formValue })

        userNameValueSet(formValue)
        setFormValue('')
        setIsValid(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="100%" spacing={8}>
                <FormControl>
                    <InputGroup>
                        <InputLeftAddon children="🔑 Username" />
                        <Input
                            value={formValue}
                            onChange={onChange}
                            name="username"
                            placeholder="Update your username"
                            ref={register}
                        />
                    </InputGroup>
                    <FormHelperText textAlign="left">
                        Current username: https://cord.ly/{` `}
                        <Code colorScheme="green">
                            {userNameValue || user.uid}
                        </Code>
                    </FormHelperText>
                    <Button
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
