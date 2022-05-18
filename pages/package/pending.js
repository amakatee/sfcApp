import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'

import {client} from './../../lib/client'

const pending = ({products}) => {

  return (
      <InnerLayout>
    <div className='text-white '>
      
      <div className='packages-cont'>
      {products.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : products?.map(product => (<PackageItem  key={product.id} product={product}/>))}
        
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