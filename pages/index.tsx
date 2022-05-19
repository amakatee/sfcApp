import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { client } from '../lib/client'
import { useContext } from 'react'
import {SfcContext} from './../context/sfcContext'
import { useRouter } from 'next/router'





const Home: NextPage = () => {
  const {appStatus, connectWallet } = useContext(SfcContext)
  const router = useRouter()
  const app = (status = appStatus) =>{
    switch(status){
      case 'connected': 
         return userLoggedIn
      case 'notConnected': 
         return noUserFound

      case 'notConnected': 
         return noUserFound
      case'noMetaMask':
        return moMetaMaskFound
      case 'error':
        return error  

      default:
        
        return loading  
    }
  }

  const userLoggedIn = (
    <div >Logged In</div>
    
  )
  const  noUserFound = (
    <div >
      <h1
      onClick={() => connectWallet()}
      >Connect Wallet</h1>
     

    </div>
   
  )

  const moMetaMaskFound = (
    <div >
      You Must Install Meta Mask :)
    </div>

  )
  const error = (
    <div> Error  occruied</div>
  )
  const loading = (
    <div > 
      Loading ...
    </div>
  )
  return ( 
    <div className='index-container ' >{app(appStatus)}</div>
      // <HomePage />
     
  
  )
}

export default Home
