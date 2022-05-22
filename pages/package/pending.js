import React,{useEffect, useState} from 'react'
import InnerLayout from '../../components/InnerLayout'
import PackageItem from '../../components/PackageItem'
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
  const {storageProducts, currentAccount, fetchAdresses, addressesArray} = useContext(SfcContext)
  const { register, handleSubmit, reset, errors} = useForm()
  const [showAdress , setShowAdress] = useState(false)
  const [curAddress, setCurrentAdress] = useState({})


 const st = storageProducts.filter(item => item.user.walletAddress === currentAccount)
   const storage = [...new Set(st)]
  const ids = storage.map(stor => stor.id)
  const filteredId = [...new Set(ids)]
  

  const filteredStorage = filteredId.map(id => {
    return storage.find(item => item.id ===id)
  })
  console.log(addressesArray)
  const addressesCurrent  = addressesArray?.filter(item => item.user.walletAddress === currentAccount)
  const addressIds = addressesCurrent.map(item => item.id)
  const uniqAdId = [...new Set(addressIds)]
  const filteredAddresses = uniqAdId.map(id => {
    return addressesCurrent.find(item => item.id === id )
  })

  const currentChosenAddress = filteredAddresses.find(address => address.id === curAddress) 
const addressHandler = () => {
  setShowAdress( prev => !prev)

}



  const onSubmit = (data) => {
     alert(JSON.stringify(data))
}
  const onSubmitAdress = async (data) => {
    const {address, email, country, familyName, name, telegram, phone} = data
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
    fetchAdresses()
    setCurrentAdress(addressDoc)

    reset()
    // setShowAdress(false)
  }

console.log(curAddress)
  return (
    <>
      <InnerLayout>
     
        <form onSubmit={handleSubmit(onSubmit)}>
    <div className='text-white '>
      <div>
      <div className='flex items-center gap-1 flex-start'>
       
        {/* <Checkbox 
        
         name="selectAll"
         id="selectAll"
        //  handleClick={handleSelectAll}
        //  isChecked={isCheckAll}
        ></Checkbox> */}
       
        
        </div>
        <div className='flex items-center justify-end gap-1 mt-[10px] mr-[20px] cursor-pointer' onClick={addressHandler}>
          <AiOutlinePlus />
          <h1>Add Address</h1>
          
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
             value={`(Product: ${product.weight}  ${product.info} ${product.user.walletAddress})`} 
             name={product.id}
             {...register(product.id)}
             />

      
           
           </div>
           <div className='item-img'>
              <img width="100px" src='/banner-thumb.png'></img>
            </div>
            <div className='item-desc'>
            {product.user && <p>User: <span className='item-span' >{product.user.walletAddress.slice(0,5)} </span></p>}
            {product.weight &&  <p>Weight: <span className='item-span' >{product.weight}</span></p>}
            {product.info &&  <p>Info: <span className='item-span' >{product.info} </span> </p>}

           
               </div>
   
        </div>)
        
        )}
        
      </div>
    
    </div>
    <div className='flex justify-end mr-[10px]'><Button  type='submit'> Continiu</Button></div>
    </form>
    
    </InnerLayout>

   {/* Form */}
  
  
  {showAdress &&
  <section className='address-container'>
     <div  className='absolute cursor-pointer top-20 right-10 z-100' >
    <GrClose color='#ffffff' onClick={() => setShowAdress(false)} />
    </div>
    <div className='adress-list'>
    {filteredAddresses?.map(item => (
      <div className='address-item-cont'>
         <AddressItem item={item} setCurrentAdress={setCurrentAdress} curAddress={curAddress}/>
      </div>
      ))}
     
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

// export const getServerSideProps = async () => {
//   const query = "*[_type == 'pendingStorage']"
//   const products = await client.fetch(query)
//   console.log(products)
//   return {
//     props: {products}
//   }
// }