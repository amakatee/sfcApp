import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useSelector } from 'react-redux'


const index = () => {
 
  const products = []

  
 
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

export default index