import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'

import { SfcContext } from '../../context/sfcContext'
import { useContext } from 'react'


const payment = () => {
 const {paymentPackages, currentAccount} = useContext(SfcContext)

 const packages = paymentPackages.filter(item => item.user.walletAddress = currentAccount)
 const ids = packages.map(item => item.id)
 const filteredIds = [...new Set(ids)]
 const products =  filteredIds.map(id=> {
   return packages.find(item => item.id === id)
 })

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
// export const getServerSideProps = async () => {
//   const query = "*[_type == 'pendingPayment']"
//   const products = await client.fetch(query)
//   console.log(products)
//   return {
//     props: {products}
//   }
// }