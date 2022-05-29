import React,{useEffect, useState} from 'react'
import InnerLayout from '../../components/InnerLayout'
import { useContext } from 'react'
import { SfcContext } from '../../context/sfcContext'
import {  Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import {Checkbox, Grid, TextField} from '@mui/material'
import {AiOutlinePlus} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'
import { client } from '../../lib/client'
import { nanoid } from 'nanoid'
import AddressItem from '../../components/AddressItem'
import SmallAddressItem from '../../components/SmallAddressItem'




const pending = () => {
  const {storageProducts, currentAccount, fetchAddresses, addressesArray} = useContext(SfcContext)
  const { register, handleSubmit, reset, errors} = useForm()
  const [showAdress , setShowAdress] = useState(false)
  const [curAddress, setCurrentAdress] = useState({})
  const [showAddresesList, setShowAddressesList ] = useState(false)
  const [submited, setSubmited] = useState()
  const [submittedProduct, setSubmitedProduct] = useState(false)



 const st = storageProducts.filter(item => item.user.walletAddress === currentAccount)
   const storage = [...new Set(st)]
  const ids = storage.map(stor => stor.id)
  const filteredId = [...new Set(ids)]
  

  const fStorage = filteredId.map(id => {
    return storage.find(item => item.id ===id)
  })
  const [filteredStorage , setFilteredStorage] = useState(fStorage)

  const addressesCurrent  = addressesArray?.filter(item => item.user.walletAddress === currentAccount)
  const addressIds = addressesCurrent.map(item => item.id)
  const uniqAdId = [...new Set(addressIds)]
  const fAdress = uniqAdId.map(id => {
    return addressesCurrent.find(item => item.id === id )
  })
  const [filteredAddresses, setFilteredAddreses] = useState(fAdress)

  const currentChosenAddress = filteredAddresses.find(address => address.id === curAddress) 
const addressHandler = () => {
  setShowAdress( prev => !prev)

}

useEffect(() => {
  let timer = setTimeout(() => setSubmited(false) , 1000)

  return () => clearTimeout(timer)
  

},[submited])
useEffect(() => {
  let timer = setTimeout(() => setSubmitedProduct(false) , 3000)

  return () => clearTimeout(timer)
  

},[submittedProduct])




  async function onSubmit({product}) {
    const pr = `${JSON.stringify(product)}`
    const cr = `${JSON.stringify(currentChosenAddress)}`
    console.log(`${JSON.stringify(product)}`)
    console.log(cr)
    const stotageId = `${currentAccount}_${Date.now()}`
    const storageOrderDoc = {
      _type:'storageOrders',
      _id: stotageId,
     
      packInfo: pr,
      address: cr,
      timestamp: new Date().toISOString(),
      user: {
        _key: stotageId,
        _type:'reference',
        _ref: currentAccount,

      }
     }
     await client.createIfNotExists(storageOrderDoc)
     await client
     .patch(currentAccount)
     .setIfMissing({srorageOrders: []})
     .insert('after', 'srorageOrders[-1]', [
       {_key: stotageId,
         _type:'reference',
         _ref: stotageId
       }
     ]).commit()

 

     setSubmited(true)
     setSubmitedProduct(true)
    
  
  const filteredId = filteredStorage.map(i => i.id)
   const similaritiy = filteredId.filter(x=> !product.includes(x))
   console.log(similaritiy)
  
  
   const items = similaritiy.map(s => {
     return filteredStorage.find(storage => storage.id === s)
   })

     setFilteredStorage(items)
   
  }


  const onSubmitAdress = async (data) => {
    const {address, email, country, familyName, name, telegram, phone, zip} = data
    const adressId = `${currentAccount}_${Date.now()}`
    const addressDoc = {
    _type: "addressShema",
    _id: adressId,
    firstName: name,
    secondName: familyName,
    address:address,
    country: country,
    telegram:telegram,
    email: email,
    phone:phone,
    timestamp: new Date().toISOString(),
    fetchId: nanoid(),
    zip,
    user: {
      _key: adressId,
      _type:'reference',
      _ref: currentAccount,

    }



    }
    await client.createIfNotExists(addressDoc)
    await client
    .patch(currentAccount)
    .setIfMissing({addressShema: []})
    .insert('after', 'addressShema[-1]', [
      {_key: adressId,
        _type:'reference',
        _ref: adressId
      }
    ]).commit()
    reset()
    setFilteredAddreses([...filteredAddresses, addressDoc ])
    await fetchAddresses()
    console.log(filteredAddresses)
    setShowAddressesList(true)
   

   
    // setShowAdress(false)
  }


   

// })


  return (
    <>
     {submited ? <span className='copy-alert glass-background '>Submited</span> : null}
      <InnerLayout>
     
        <form onSubmit={handleSubmit(onSubmit)}>
    <div className='text-white '>
      <div>
      <div className='flex items-center gap-1 flex-start'>
    
        
        </div>
        <div className='flex items-center  justify-end gap-10 mt-[10px] mr-[20px] cursor-pointer'>
          <div className='flex items-center '  onClick={addressHandler}>
          <AiOutlinePlus />
          <h1>   Add Address</h1>
          </div>
          {/* <div onClick={() => setShowAddressesList(true)}>
          <h1>Choose Existing</h1>
          </div> */}
         
          
       </div>
   
       <div className='flex items-center justify-end gap-1 mt-[5px] mr-[20px]'>
          {currentChosenAddress ?  <SmallAddressItem  item={currentChosenAddress}/> : <p className='sub-title'>No address choosen</p>}  
          </div>
        </div>
      <div className='packages-cont'>
      {filteredAddresses.length < 1 ? <div className='empty-cont-span'>No Products Yet</div> : filteredStorage?.map(product => 
        (<div className='item-cont'>
           <div className='mr-[10px]'>
             
             <Checkbox
             value={product.order} 
             name="product"
             {...register('product')}
             />

      
           
           </div>
           <div className='item-img'>
              <img width="100px" src='/banner-thumb.png'></img>
            </div>
            <div className='item-desc'>
            {product.user && <p>User: <span className='item-span' >{product.user.walletAddress.slice(0,5)} </span></p>}
            {product.weight &&  <p>Weight: <span className='item-span' >{product.weight}</span></p>}
            {product.info &&  <p>Info: <span className='item-span' >{product.info} </span> </p>}
            {product.order &&  <p>Order No: <span className='item-span' >{product.order} </span> </p>}

           
               </div>
               
        </div>)
        
        )}
        
      </div>
      <div className='flex justify-end mr-[10px]'><Button  type='submit'> Continiu</Button></div>
     
    </div>
  
    </form>
    {submittedProduct ? <span className='copy-alert glass-background '>Thank you for your order! Processing time 1-12 hours! We will contact you via email. </span> : null}

    </InnerLayout>
  
   {/* Form */}
  


  {showAdress &&
  <section className='address-container'>
     <div  className='absolute cursor-pointer top-20 right-10 z-100' >
    <GrClose color='#ffffff' onClick={() => setShowAdress(false)} />
    </div>
    {/* <div className='adress-list'>
    {filteredAddresses?.map(item => (
      <div className='address-item-cont'>
         <AddressItem item={item} setCurrentAdress={setCurrentAdress} setShowAdress={setShowAdress} curAddress={curAddress} />
      </div>
      ))}
     
    </div> */}

  <div>
  <div className='adress-list'>
    {filteredAddresses?.map(item => (
      <div className='address-item-cont'>
         <AddressItem item={item} setCurrentAdress={setCurrentAdress} setShowAdress={setShowAdress} curAddress={curAddress} />
      </div>
      ))}
     
    </div>
    </div>




  <div className='adress-section'>
    
   
  <form  className="contact-form" onSubmit={handleSubmit(onSubmitAdress)}>
    <Grid container direction='column' alignItems='center' spacing={3}>
      <Grid item  >
        <TextField
        name="name"
        
        {...register('name')}
        variant="standard"
        sx={{width:"18rem"}}
        label="First Name"
        color='secondary'
       
        helperText={errors?.Name && <p>No less than 5 symbols!</p>}
        required
        >

        </TextField>
      </Grid>
      <Grid item  >
        <TextField
        name="familyName"
        {...register('familyName')}
        variant="standard"
        sx={{width:"18rem"}}
        label="Second Name"
        color='secondary'
       
       
        required
        >

        </TextField>
      </Grid>
      <Grid item>
        <TextField
        name="email"
        {...register("email", {
          required: "Req",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        variant="standard"
        
        sx={{width:"18rem"}}
        helperText={errors?.Email && <p>Invalid E-mail!</p>}
        label="Email"
        color='secondary'
        required
        >

        </TextField>
      </Grid>
      <Grid item>
        <TextField
        name='telegram'
        {...register("telegram")}
        variant="standard"
        
        sx={{width:"18rem"}}
        label="Telegram"
        color='secondary'
      
        >

        </TextField>
      </Grid>
      <Grid item>
        <TextField
        name='phone'
        {...register("phone")}
        variant="standard"
        
        sx={{width:"18rem"}}
        label="Phone Number"
        color='secondary'
      
        >

        </TextField>
      </Grid>
      <Grid item>
        <TextField
        name='country'
        {...register("country")}
        variant="standard"
        
        sx={{width:"18rem"}}
        label="Country"
        color='secondary'
      
        >

        </TextField>
      </Grid>
      <Grid item >
        <TextField
        variant="standard"
        name="address"
        {...register("address")}
        sx={{width:"18rem"}}
        label="Address"
        multiline
        rows={2}
        required
        color='secondary'
        >

        </TextField>
      </Grid>
      <Grid item>
        <TextField
        name='zip'
        {...register("zip")}
        variant="standard"
        
        sx={{width:"18rem"}}
        label="Zip Code"
        color='secondary'
      
        >

        </TextField>
      </Grid>
      
      <button className='grid content-center header__button mt-[1rem]'> Save Address </button>

    </Grid>
  
   
   

  </form>
  </div>
  </section>
  }  
    </>
  )
}

export default pending

export const getServerSideProps = async () => {
  const query =  `*[_type == "addressShema"] {
    "user":user->{walletAddress},
    address,
    country,
    email,
    firstName,
    phone,
    secondName,
    telegram,
    fetchId,
    order,
    zip
}`
  const products = await client.fetch(query)
  console.log(products)
  return {
    props: {products}
  }
}