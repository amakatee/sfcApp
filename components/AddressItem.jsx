import React from 'react'
import { Checkbox } from '@mui/material'

const AddressItem = ({item, curAddress, setCurrentAdress}) => {
  const {firstName, secondName, address, country, telegram, email, phone, timestamp, zip, id} = item
  
  return (
 
  
    <div className='address-cart mb-[15px] '>
    <Checkbox onChange={() => setCurrentAdress(id)} />
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
