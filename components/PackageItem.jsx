import React, {useState} from 'react'
import {Checkbox} from '@mui/material'
import {useForm } from 'react-hook-form'

const PackageItem = ({product}) => {

    const {domesticTrack, user, recipient, domesticCode, info, type, weight, billing, internationalCode, timestamp, checkbool, id} = product
    const { register, handleSubmit, reset} = useForm()
  


    
  return (
    <div className='item-cont'>
      {checkbool &&
       <div>
         <Checkbox value={checboxVal} name={id}></Checkbox>
     
     </div>
     }
     
    <div className='item-img'>
      <img width="100px" src='/banner-thumb.png'></img>
    </div>
    <div className='item-desc'>
        {user && <p>User: <span className='item-span' >{user.walletAddress.slice(0,5)} </span></p>}
        {recipient && <p>Recipient: <span className='item-span' >{recipient} </span></p> }
         
        {domesticTrack &&  <p>Track code: <span className='item-span' >{domesticTrack}</span></p>}
        {timestamp &&  <p>Operated at: <span className='item-span' >{timestamp}</span></p>}


        {domesticCode &&  <p>Track code: <span className='item-span' >{domesticCode}</span></p>}

        {info &&  <p>Info: <span className='item-span' >{info} </span> </p>}
        
        {type &&  <p>Type: <span className='item-span' > {type} </span> </p>}

        {weight &&  <p>Weight: <span className='item-span' >{weight}</span></p>}

        {billing && <p>Billing: <span className='item-span' >{billing} </span></p>}

        {internationalCode &&  <p>International TrackingNumber: <span className='item-span' >EV1287302K </span></p>}
 

    </div>
  </div>
  )
}

export default PackageItem