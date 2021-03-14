import type { AppProps } from 'next/app'
import theme from '../theme'
import { useUserData } from '../lib/hooks'
import { UserContext } from '../lib/context'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { AuthProvider } from '../utils/auth'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
    const userData = useUserData()
    const router = useRouter()
    const isUserSlug = router.query.slug
    const homepage = router.route === '/'
    const dashboard = router.route === '/dashboard'

    return (
        <UserContext.Provider value={userData}>
            <ChakraProvider resetCSS theme={theme}>
                <Flex flexDirection={dashboard ? 'row' : 'column'}>
                    {!isUserSlug && <Navigation dashboard={dashboard} />}
                    <Component {...pageProps} />
                    {homepage && !dashboard && !isUserSlug && <Footer />}
                </Flex>
            </ChakraProvider>
        </UserContext.Provider>
    )
}
