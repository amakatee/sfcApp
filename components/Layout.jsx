import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div className='background-gradient'>
        <Navbar />
        <main className='main-container w-[100vw] min-h-[100vh]'>
            {children}
        </main>
      

    </div>
  )
}

export default Layout