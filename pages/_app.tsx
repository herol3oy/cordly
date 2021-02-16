import type { AppProps /*, AppContext */ } from 'next/app'
import { AuthProvider } from '../utils/auth'
import { ChakraProvider } from "@chakra-ui/react"
import Navbar from '../components/Navbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  </AuthProvider>

}