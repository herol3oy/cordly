import { useContext } from 'react'
import { UserContext } from '../lib/context'

export default function AuthCheck(props) {
    const { user } = useContext(UserContext)
    return user ? props.children : props.fallback || <p>You must be signed</p>
}
