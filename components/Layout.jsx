import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <main className='main-container w-[100vw] min-h-[100vh]'>
            {children}
        </main>
      

    </div>
  )
}

export default Layout