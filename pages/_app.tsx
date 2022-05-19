import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from './../store/store'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '@auth0/nextjs-auth0'


function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
   <Provider store={store}>
   <Layout>
     <Component {...pageProps} />
  </Layout>
  </Provider>
  </UserProvider>
 
}

export default MyApp
