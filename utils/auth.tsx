import { useState, useEffect, useContext, createContext } from 'react'
import { auth, googleAuthProvider } from '../lib/firebase'
import { createUser } from './db'

const authContext = createContext(null)

export function AuthProvider({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)

            createUser(user.uid, user)
            setUser(user)
            return user
        } else {
            setUser(false)
            return false
        }
    }

    const signinWithGoogle = () => {
        return auth
            .signInWithPopup(googleAuthProvider)
            .then((response) => handleUser(response.user))
    }

    const signout = () => {
        return auth
            .signOut()
            .then(() => handleUser(false))
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handleUser)
        return () => unsubscribe()
    }, [])

    return {
        user,
        signinWithGoogle,
        signout,
    }
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    }
}
