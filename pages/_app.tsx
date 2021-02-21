import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth'
import Navigation from '../components/Navigation'
import { ChakraProvider } from "@chakra-ui/react"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
          <Navigation />
          <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}