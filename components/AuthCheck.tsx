import Link from 'next/link'
import { useContext } from 'react'
import {authContext} from '../utils/auth'

export default function AuthCheck(props) {
  const { user } = useContext(authContext)
  return user ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>
}
