import React from 'react'

const SmallAddressItem = ({item}) => {
    const {firstName, secondName, address, country, telegram, email, phone, timestamp, zip, id} = item
  return (
    <div className='address-cart mb-[15px] flex-col  '>
        <div className='mr-[30px] mb-[-5px]'>
   <p className='sub-title '>Current Address</p>
   </div>
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

export default SmallAddressItem