import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useContext } from 'react'
import { SfcContext } from '../../context/sfcContext'

import {client} from './../../lib/client'


const pending = () => {
  const {storageProducts, currentAccount} = useContext(SfcContext)

  const st = storageProducts.filter(item => item.user.walletAddress === currentAccount)
   const storage = [...new Set(st)]
  const ids = storage.map(stor => stor.id)
  const filteredId = [...new Set(ids)]

  const filteredStorage = filteredId.map(id => {
    return storage.find(item => item.id ===id)
  })
  


  return (
      <InnerLayout>
    <div className='text-white '>
      
      <div className='packages-cont'>
      {filteredStorage.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : filteredStorage?.map(product => (<PackageItem  key={product.id} product={product}/>))}
        
      </div>
    
    </div>
    </InnerLayout>
  )
}

export default pending

// export const getServerSideProps = async () => {
//   const query = "*[_type == 'pendingStorage']"
//   const products = await client.fetch(query)
//   console.log(products)
//   return {
//     props: {products}
//   }
// }