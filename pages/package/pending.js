import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useContext } from 'react'
import { SfcContext } from '../../context/sfcContext'

import {client} from './../../lib/client'


const pending = ({products}) => {
  const {storageProducts, currentAccount} = useContext(SfcContext)

console.log(storageProducts)

  return (
      <InnerLayout>
    <div className='text-white '>
      
      <div className='packages-cont'>
      {storageProducts.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : storageProducts?.map(product => (<PackageItem  key={product.id} product={product}/>))}
        
      </div>
    
    </div>
    </InnerLayout>
  )
}

export default pending

export const getServerSideProps = async () => {
  const query = "*[_type == 'pendingStorage']"
  const products = await client.fetch(query)
  console.log(products)
  return {
    props: {products}
  }
}