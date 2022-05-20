import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useSelector } from 'react-redux'

import { SfcContext } from '../../context/sfcContext';
import { useContext } from 'react'


const index = () => {
  const {products , currentAccount, currentUser} = useContext(SfcContext)
  console.log(currentUser)
 
  const packasges = products.filter(item => item.user.walletAddress === currentAccount)
    




  
 
  return (
    <InnerLayout>
        <div className='text-white '>
      
          <div className='packages-cont'>
            {packasges.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : packasges?.map(product => (<PackageItem  key={product.id} product={product}/>))}
           
          </div>
        
        </div>
    </InnerLayout>
  )
}

export default index