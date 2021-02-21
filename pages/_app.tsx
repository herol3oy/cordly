import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth'
import Navigation from '../components/Navigation'
import { ChakraProvider, theme } from "@chakra-ui/react"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider
        theme={theme}
      >
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}