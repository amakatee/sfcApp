import React, { useEffect } from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'

import { SfcContext } from '../../context/sfcContext'
import { useContext, useState } from 'react'
import { Checkbox,Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { client } from '../../lib/client'



const payment = () => {

 const [checked, setChecked] = useState(false)



 const {paymentPackages,ethPrice,sendTransaction, formData ,setFormData, currentAccount, choosenItems, setChoosenItemsAmount} = useContext(SfcContext)
 const router = useRouter()
 const{register, handleSubmit} = useForm()
 const [submittedProduct, setSubmittedProduct] = useState(false)
 const packages = paymentPackages.filter(item => item.user.walletAddress === currentAccount)



let ethWorth = parseFloat(1 /ethPrice)


 const ids = packages.map(item => item.id)
 const filteredIds = [...new Set(ids)]
 const products =  filteredIds.map(id=> {
   return packages.find(item => item.id === id)
 })
 const [pr, setProducts] = useState(products)


 const hadleSubmit = () => {
  if(!addressTo || !amount)  return 
  console.log(addressTo, amount)
 }



console.log(choosenItems)
console.log(products)
console.log(pr)

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
     
        timestamp: new Date().toISOString(),
        user: {
          _key: stotageId,
          _type:'reference',
          _ref: currentAccount,
    
        }
       }
      //  await client.createIfNotExists(payOrderDoc)
      //  await client
      //  .patch(currentAccount)
      //  .setIfMissing({storagePayments: []})
      //  .insert('after', 'storagePayments[-1]', [
      //    {_key: stotageId,
      //      _type:'reference',
      //      _ref: stotageId
      //    }
      //  ]).commit()


  
        
       console.log(product)
 
     
       setChoosenItemsAmount(product)
       handleSubmit()
      
      setProducts(items)
      formData.addressTo = '0x2a7bc55a1943259cfad2951cc73bf50fbcc2fefa'
      formData.amount = totalEth.toString()
      const {addressTo,  amount} = formData
      console.log(addressTo, amount)
      console.log(formData)
       
      sendTransaction()
  
      // router.push('/payment')
      
}




  // const choosenProductItems = choosenItems?.map(id => {
  //   return products.find(product => product.id === id)
  // })
  // console.log(choosenProductItems)
  // console.log(products)
  
//   const t = choosenItems.reduce((sum, i) => {
//     return sum + parseInt(i.billing)
  
//   }, 0)
// console.log( choosenItems)



  const [total, setTotal] = useState(0)
  // const totalE = total * ethWorth
  // setTotalEth(totalE)
  // console.log(totalEth)
  // console.log(total)
 


let totalEth = 0 

total > 0 ? totalEth = total * ethWorth : totalEth = 0





function handleChange(e){
 
     
      const id = e.target.value
       const checkedItems = products.find(p => {
      return p.id === id
      
    })
    setChoosenItemsAmount(prev => [...prev, checkedItems])
    e.target.checked ? setTotal(prev => prev + parseInt(checkedItems.billing)) : setTotal(prev => prev - parseInt(checkedItems.billing)) 
    
    
}




  return (
      <InnerLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-white '>
        
      
      <div className='packages-cont'>
     
      { pr.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : pr?.map(product => (
      
      // <PackageItem  key={product.id} product={product}/>
      <div className='item-cont'>
           <div className='mr-[10px]'>
             
             <Checkbox
             value={product.order} 
             name="product"
             {...register("product")}
             onChange={(e) => handleChange(e)}
           
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
      <div className='t-section'>
      <div className='t-flex'>
      <span className="t-text">Total: </span> ${total} ~ ETH {totalEth} </div>
      <div className='flex '><Button  type='submit'> Proceed Payment</Button></div>
      </div>

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
