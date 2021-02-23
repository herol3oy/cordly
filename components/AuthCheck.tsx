import { useContext } from 'react'
import { authContext } from '../utils/auth'

export default function AuthCheck(props) {
    const { user } = useContext(authContext)
    return user ? props.children : props.fallback || <p>You must be signed</p>
}
