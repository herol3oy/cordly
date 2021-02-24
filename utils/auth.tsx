import { useState, useEffect, useContext, createContext } from 'react'
import { auth, googleAuthProvider, facebookAuthProvider } from '../lib/firebase'
import { createUser } from './db'

export const authContext = createContext(null)

export const AuthProvider = ({ children }) => {
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

    const signinWithFacebook = () => {
        return auth
            .signInWithPopup(facebookAuthProvider)
            .then((response) => handleUser(response.user))
    }

    const signout = () => {
        return auth.signOut().then(() => handleUser(false))
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handleUser)
        return () => unsubscribe()
    }, [])

    return {
        user,
        signinWithGoogle,
        signinWithFacebook,
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
