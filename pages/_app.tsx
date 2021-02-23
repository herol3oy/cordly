import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation'
import { AuthProvider } from '../utils/auth'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ChakraProvider resetCSS theme={theme}>
                <Navigation />
                <Component {...pageProps} />
            </ChakraProvider>
        </AuthProvider>
    )
}
