import { useState, useEffect } from 'react'
import Image from 'next/image'
import { updateProfilePicture } from '../utils/db'
import { useAuth } from '../utils/auth'
import { firestore, storage, STATE_CHANGED } from '../lib/firebase'

export default function Bio() {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, downloadURLSet] = useState(null)
    const [data, dataSet] = useState('/avatar.png')

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
        <main>
            <label className="btn">
                📸 Upload Img
            <input type="file" onChange={(e) => uploadFile(e)} accept="image/x-png,image/gif,image/jpeg" />

            </label>
            <Image
                src={data || auth.user.photoUrl || '/avatar.png'}
                alt="Profile picture"
                width={100}
                height={100}
            />
        </main>

    )
}
