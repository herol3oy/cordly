import { useState, useEffect, useCallback } from 'react'
import { firestore } from '../lib/firebase'
import debounce from 'lodash.debounce';
import {
    Stack,
    InputLeftAddon,
    InputGroup,
    FormControl,
    FormHelperText,
    Input,
    Code,
    Text,
    Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../utils/auth'

export default function Username() {
    const [formValue, setFormValue] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')

    const auth = useAuth()

    const { register, handleSubmit, watch, reset, errors } = useForm()

    useEffect(() => {

        const checkUserName = async () => {
            firestore.collection('usernames').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid && doc.data().uid === auth.user.uid) {
                        setUsername(doc.id)
                    }
                })
            })
        }

        checkUserName()

        checkUsername(formValue)
    }, [formValue])



    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`)
                const { exists } = await ref.get()
                console.log('Firestore read executed!')
                setIsValid(!exists)
                setLoading(false)
            }
        }, 500),
        []
    )

    const onChange = (e) => {

        const val = e.target.value.toLowerCase();
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
        const usernameDoc = firestore.doc(`usernames/${formValue}`)

        usernameDoc.set({ uid: auth.user.uid })

        setUsername(formValue)
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
                            name='username'
                            placeholder="Update your username"
                            ref={register}
                        />
                    </InputGroup>
                    <FormHelperText textAlign="left">
                        Current username: https://cord.ly/{` `}
                        <Code colorScheme="green">{username || auth.user.uid}</Code>
                    </FormHelperText>
                    <Button
                        type='submit'
                        colorScheme='green'
                        disabled={!isValid}
                    >
                        Submit
                </Button>
                </FormControl>
                <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

            </Stack>
        </form>
    )
}


function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <Text bg='green'>{username} is available!</Text>;
    } else if (username && !isValid) {
        return <Text bg='red'>That username is taken!</Text>;
    } else {
        return <p></p>;
    }
}
