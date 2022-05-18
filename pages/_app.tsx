import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from './../store/store'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return <SessionProvider>
   <Provider store={store}>
   <Layout>
     <Component {...pageProps} />
  </Layout>
  </Provider>
  </SessionProvider>
 
}

export default MyApp
