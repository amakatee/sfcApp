import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useSelector } from 'react-redux'
import { allPackages } from '../../store/features/packageSlice'

const pending = () => {
  const products = useSelector(allPackages)
  return (
      <InnerLayout>
    <div className='text-white '>
      
      <div className='packages-cont'>
      {products.map(product => (<PackageItem  key={product.id} product={product}/>))}
        
      </div>
    
    </div>
    </InnerLayout>
  )
}

export default pending