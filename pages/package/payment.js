import React from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'

import { SfcContext } from '../../context/sfcContext'
import { useContext, useState } from 'react'
import { Checkbox,Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { client } from '../../lib/client'



const payment = () => {
 const {paymentPackages, currentAccount, choosenItems, setChoosenItemsAmount} = useContext(SfcContext)
 const router = useRouter()
 const{register, handleSubmit} = useForm()
 const [submittedProduct, setSubmittedProduct] = useState(false)
 const packages = paymentPackages.filter(item => item.user.walletAddress === currentAccount)


 const ids = packages.map(item => item.id)
 const filteredIds = [...new Set(ids)]
 const pr =  filteredIds.map(id=> {
   return packages.find(item => item.id === id)
 })
 const [products, setProducts] = useState(pr)
 console.log(pr)
 console.log(packages)
 console.log(products)
 console.log(currentAccount)
 


 async function onSubmit({product}) {
  const pr = `${JSON.stringify(product)}`
   const filteredId = products.map(p => p.id)
   const similaritiy = filteredId.filter(x=> !product.includes(x))
   console.log(similaritiy)
   const items = similaritiy.map(s => {
     return products.find(p => p.id === s)
   })
   
   const i = `${JSON.stringify(pr)}`
   
      const stotageId = `${currentAccount}_${Date.now()}`
      const payOrderDoc = {
        _type:'storagePayments',
        _id: stotageId,
     
        type: i,
        // recipient: item.recipient,
        // billing:item.billing,
        // order:item.order,
        timestamp: new Date().toISOString(),
        user: {
          _key: stotageId,
          _type:'reference',
          _ref: currentAccount,
    
        }
       }
       await client.createIfNotExists(payOrderDoc)
       await client
       .patch(currentAccount)
       .setIfMissing({storagePayments: []})
       .insert('after', 'storagePayments[-1]', [
         {_key: stotageId,
           _type:'reference',
           _ref: stotageId
         }
       ]).commit()


  


      
       setChoosenItemsAmount(product)
       console.log(choosenItems)
      setProducts(items)
      router.push('/payment')

  
  // const unsimilaritiy = filteredId.filter(x=> product.includes(x))
  //  console.log(similaritiy)
  //  const nonitems = unsimilaritiy.map(s => {
  //    return products.find(p => p.id === s)
  //  })
   

  }
  


  return (
      <InnerLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-white '>
        
      
      <div className='packages-cont'>
     
      { products.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : products?.map(product => (
      
      // <PackageItem  key={product.id} product={product}/>
      <div className='item-cont'>
           <div className='mr-[10px]'>
             
             <Checkbox
             value={product.order} 
             name="product"
             {...register("product")}
             />

      
           
           </div>
           <div className='item-img'>
              <img width="100px" src='/banner-thumb.png'></img>
            </div>
            <div className='item-desc'>
            {product.user && <p>User: <span className='item-span' >{product.user.walletAddress.slice(0,5)} </span></p>}
            {product.recipient && <p>Recipient: <span className='item-span' >{product.recipient} </span></p> }
            {product.billing && <p>Billing: <span className='item-span' >{product.billing}$ </span></p>}
            {product.type &&  <p>Type: <span className='item-span' > {product.type} </span> </p>}

            {product.weight &&  <p>Weight: <span className='item-span' >{product.weight}</span></p>}
            {product.info &&  <p>Info: <span className='item-span' >{product.info} </span> </p>}
            {product.order &&  <p>Order No: <span className='item-span' >{product.order} </span> </p>}

           
               </div>
               
        </div>
      )
      )}
      </div>
      
      <div className='flex justify-end mr-[10px]'><Button  type='submit'> Proceed Payment</Button></div>

    </div>
    </form>
    {submittedProduct ? <span className='copy-alert glass-background '>Thank you for your order! Processing time 1-12 hours! We will contact you via email. </span> : null}

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
