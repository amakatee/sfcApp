import React from 'react'

const PackageItem = ({product}) => {
    console.log(product.recipient)
    const { recipient, domesticCode, info, type, weight, billing, internationalCode} = product
  return (
    <div className='item-cont'>
    <div className='item-img'>
      <img width="100px" src='/banner-thumb.png'></img>
    </div>
    <div className='item-desc'>
        {recipient && <p>Recipient: <span className='item-span' >{recipient} </span></p> }
         
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