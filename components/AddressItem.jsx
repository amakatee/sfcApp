import React, {useState} from 'react'
import { Checkbox, Radio  } from '@mui/material'

const AddressItem = ({item, curAddress, setCurrentAdress,setShowAdress }) => {
  const {firstName, secondName, address, country,telegram, email, phone, timestamp, zip, id} = item

 const handleClick = (id) => {
  setCurrentAdress(id)
  setShowAdress(false)

 }
 
  
  return (
  
  
    <div onClick={() => handleClick(id)}  className='address-cart mb-[15px] cursor-pointer '>
    {/* <Checkbox checked={isChecked.checked} value={true} name={id}  onChange={(e) => handleChange(e, id)} /> */}
    <div>
      {firstName &&  <p className="item-p">First Name: <span className='item-span' >{firstName} </span> </p>}
      {secondName &&  <p className="item-p">Second Name: <span className='item-span' >{secondName} </span> </p>}
      {country &&  <p className="item-p">Country: <span className='item-span' >{country} </span> </p>}
      {address &&  <p className="item-p">Address: <span className='item-span' >{address} </span> </p>}
      {phone &&  <p className="item-p">Phone: <span className='item-span' >{phone} </span> </p>}
      {zip &&  <p className="item-p">Zipcode: <span className='item-span' >{zip} </span> </p>}
      </div>

      

      

      

    </div>
  
  )
}

export default AddressItem
