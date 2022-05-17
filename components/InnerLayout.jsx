import React from 'react'

import InnerNavbar from './InnerNavbar'



const InnerLayout = ({children}) => {
   
  return (
    <div className='w-[100vw] min-h-[100vh] grid  package-container '>
         
         <div className='w-[70vw] mx-auto  '>
             <InnerNavbar />
         </div>
       
       <div className='inner-nav-child-cont glass-backgrounds max-w-[700px]'>
          {children}
  
       </div>
       
    </div>
  )
}

export default InnerLayout