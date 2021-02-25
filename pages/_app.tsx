import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation'
import { AuthProvider } from '../utils/auth'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';


export default function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

    return (
        <UserContext.Provider value={userData}>
            <ChakraProvider resetCSS theme={theme}>
                <Navigation />
                <Component {...pageProps} />
            </ChakraProvider>
        </UserContext.Provider >
    )
}
