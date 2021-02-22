import { useState, useEffect } from 'react'
import { updateProfilePicture } from '../utils/db'
import { useAuth } from '../utils/auth'
import { firestore, storage, STATE_CHANGED } from '../lib/firebase'
import {
    Flex,
    chakra,
    Avatar,
    InputLeftAddon,
    InputGroup,
} from '@chakra-ui/react'

export default function Bio() {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState(null)
    const [data, dataSet] = useState('/avatar.png')
    const [avatarName, avatarNameSet] = useState('No file choosen')

    const auth = useAuth()
    const query = firestore.collection('users').where("uid", "==", auth.user.uid)

    useEffect(() => {
        const getAllDashData = async () => {
            await query.where('uid', '==', auth.user.uid)
                .onSnapshot(snapshot => {
                    let changes = snapshot.docChanges()
                    changes.forEach(i => {
                        dataSet(i.doc.data().profileImg)
                    })
                })
        }
        getAllDashData()
    }, [auth.user.uid])

    const uploadFile = async (e) => {

        const file = e.target.files[0]
        const extension = file['type'].split('/')[1]
        avatarNameSet(file['name'])
        const ref = storage.ref(`uploads/${auth.user.uid}/${Date.now()}.${extension}`)
        setUploading(true)

        const task = ref.put(file)

        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
            setProgress(+pct)
        })

        task
            .then((d) => ref.getDownloadURL())
            .then((url) => {
                downloadURLSet(url)
                updateProfilePicture(auth.user.uid, url)
                setUploading(false)
            })
    }

    return (
        <Flex
            direction='column'
            justify='center'
        >
            <Avatar
                src={data || auth.user.photoUrl || '/avatar.png'}
                alt="Profile picture"
                size='xl'
                margin='auto'
                mb={4}
            />
            <InputGroup>
                <InputLeftAddon children="Choose file" />
                <Flex
                    w="100%"
                    whiteSpace="nowrap"
                    px={4}
                    align="center"
                    borderWidth={1}
                    borderRightRadius="md">
                    {avatarName}
                    <chakra.input
                        type="file"
                        onChange={(e) => uploadFile(e)}
                        w="100%" opacity={0} pos="absolute" inset="0"
                    />
                </Flex>
            </InputGroup>
        </Flex>

    )
}
