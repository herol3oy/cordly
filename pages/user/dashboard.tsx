import { useAuth } from '../../utils/auth'
import { useForm } from "react-hook-form"
import { firestore } from '../../lib/firebase'

export default function Dashboard() {
    const auth = useAuth()

    const { register, handleSubmit, watch, errors } = useForm()

    const onSubmit = data => {
        const ref = firestore.collection('users')
        ref
            .where('uid', '==', auth.user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const urlRef = firestore.collection('users').doc(doc.id)
                    urlRef.update(data)
                })
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            })
    }

    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                youtube
                <input name="youtube" placeholder='Youtube' ref={register} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </>
    )
}
