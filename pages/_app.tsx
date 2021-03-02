import type { AppProps } from 'next/app'
import theme from '../theme'
import { useUserData } from '../lib/hooks'
import { UserContext } from '../lib/context'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../utils/auth'

export default function MyApp({ Component, pageProps }: AppProps) {
    const userData = useUserData()

    return (
        <UserContext.Provider value={userData}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider>
    )
}
