import React, {useState, useRef, useEffect} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const HomePage = () => {


  const [copied, setCopied] = useState(false)
  const [recipient, setRecipient] = useState('PNNKYHHT金桔(8个字母不能错)')
  const [address, setAddress] = useState('广州市白云区太和镇太和北路120号A3君丰集运中心(PNNKYHHT)室')
  const [phone, setPhone] = useState('19924237889')
  const [zip, setZip] = useState('510540')

  const warehouseInfo =  
  `${recipient}
  ${address}
  ${phone}
  ${zip}
  `


  useEffect(() => {
    let timer = setTimeout(() => setCopied(false) , 1000)

    return () => clearTimeout(timer)
    

  },[copied])

  return (
    <div >
    <div className='text-white w-[100vw] min-h-[100vh] grid content-center '>
      <div className='track-code-cont '>
        <div>
      <h1 className='section-header-title'>Add a tracking number</h1>
        <div className='track glass-background '>
          
          <div className='flex items-center justify-around gap-2'>
            <h4 className='track-label'>tracking number:</h4>
          <input
          className='track-input'
          placeholder=''
       
          ></input>
          </div>
       
          <br />
          <div className='flex items-center gap-2'>
            <h4 className='track-label'>additional info:</h4>
          <input
          className='track-input'
          placeholder=''
       
          ></input>
          </div>
         <div className='button-main' >submit</div>
        </div>
        </div>

    
      <div className='warehouse-cont '>
      <h1 className='section-header-title'>Transshipment warehouse address</h1>

      <div className='grid gap-2 track glass-background '>
          <div className='flex items-center'>
            <h4 className='track-label'>Recipient:</h4>
         <input className='track-input min-h-[5%]'
          type='text' 
          value={recipient}
          readOnly
          
          // onCnange={({target: {value}}) => setValue(value)}
        
          >
  
          </input>
          </div>
       
         
          <div className='flex items-center'>
            <h4 className='track-label'>Shipping address:</h4>
         <input className='track-input min-h-[5%]' 
         value={address}
         readOnly
         >
          </input>
          </div>
   
          <div className='flex items-center'>
            <h4 className='track-label'>Phone:</h4>
         <input className='track-input min-h-[5%]' value={phone} readOnly>
            
 
         </input>
          </div>
          <div className='flex items-center'>
            <h4 className='track-label'>Postcode:</h4>
         <input className='track-input min-h-[5%]' value={zip} readOnly>
          
 
         </input>
          </div>
  
        <CopyToClipboard text={warehouseInfo}
        onCopy = {() => setCopied(true)}
        > 
          <div className='cursor-pointer button-main'>copy</div>
         </CopyToClipboard>
         {copied ? <span className='copy-alert glass-background '>coppied</span> : null}
        </div>
    

    
      </div>
    </div>

   

    </div>
    <div className='flex items-center justify-around max-w-[80vw] mx-auto gap-12 flex-wrap storage-cont '>
      <div className='flex-1 '>
        <h3 className='section-header-title ml-[-15px]'>Free warehouse storage</h3>
        <p className='track-label'>Free warehouse storage for express parcels: 180 days (stock up and send at will)</p> <br />
        <p className='track-label'>Free warehouse storage for finished packages: 90 days (packages that have been packaged)</p>

      </div>
      <div className='flex flex-col flex-1'>
        <div>
          <p className='track-label'><strong>Reminder 1: </strong>After the package is overdue, it will be handled by the warehouse itself! Please send your package in time! The letters of the recipient and the detailed address remind the shipper not to miss it. Just click the copy button to avoid filling in errors.</p>
        </div>
        <br/>
        <div>
          <p className='track-label'>
         <strong>Reminder 2:</strong>  International express is strictly prohibited export regulations: parcels entering the warehouse will undergo strict security inspection and inspection. Anything with: cigarettes (including electronic cigarettes and other related products), alcohol, fresh animals and plants (including seeds), warehouse It will be confiscated directly; the four-piece set of bank cards, inflammable and explosive, corrosive products, illegal knives, arms, fireworks, drugs or related raw materials and other contraband will be directly transferred to the public security organs for processing.
          </p>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default HomePage