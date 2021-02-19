import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth'
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Navigation />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )

}