import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { SfcProvider } from '../context/sfcContext'





function MyApp({ Component, pageProps }: AppProps) {
  return  <SfcProvider>
  <Layout>
     <Component {...pageProps} />
  </Layout>
  </SfcProvider>


 
}

export default MyApp
