import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
import { useSelector } from 'react-redux'
import { allPackages } from '../../store/features/packageSlice'
import { client } from '../../lib/client'

const payment = ({products}) => {

  return (
      <InnerLayout>
        <div className='text-white '>
      
      <div className='packages-cont'>
      { products.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : products?.map(product => (<PackageItem  key={product.id} product={product}/>))}
      </div>
    
    </div>
      </InnerLayout>
  )
}

export default payment
export const getServerSideProps = async () => {
  const query = "*[_type == 'pendingPayment']"
  const products = await client.fetch(query)
  console.log(products)
  return {
    props: {products}
  }
}