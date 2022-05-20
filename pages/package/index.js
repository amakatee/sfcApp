import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useSelector } from 'react-redux'

import { SfcContext } from '../../context/sfcContext';
import { useContext } from 'react'


const index = () => {
  const {products , currentAccount, currentUser} = useContext(SfcContext)
  console.log(currentUser)
 
  const packages = products.filter(item => item.user.walletAddress === currentAccount)

  const ids = packages.map(item => item.id)
  const filteredIds = [...new Set(ids)]
  const filteredPackages = filteredIds.map( id => {
    return packages.find(item => item.id === id)
  })





  
 
  return (
    <InnerLayout>
        <div className='text-white '>
      
          <div className='packages-cont'>
            {filteredPackages.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : filteredPackages?.map(product => (<PackageItem key={product.id} product={product}/>))}
           
          </div>
        
        </div>
    </InnerLayout>
  )
}

export default index