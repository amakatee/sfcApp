import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { SfcProvider } from '../context/sfcContext'

import { ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material'

import { amber } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    secondary: {
      main: amber[50],
      
    },
   
    primary: {
      main: amber[50],

    },
   
    
  }
})



function MyApp({ Component, pageProps }: AppProps) {
  return  <ThemeProvider theme={theme}>
  <SfcProvider>
  <Layout>
     <Component {...pageProps} />
  </Layout>
  </SfcProvider>
  </ThemeProvider>

 
}

export default MyApp
