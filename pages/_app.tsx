import type { AppProps /*, AppContext */ } from 'next/app'
import { AuthProvider } from '../utils/auth'
import Navigation from '../components/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'

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