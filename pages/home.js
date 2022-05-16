import React, {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const HomePage = () => {
  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)
  return (
    <div className='color=[#fff]w-[100vw] min-h-[100vh] grid content-center '>
      <div className='track-code-cont  '>
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

    
      <div className='warehouse-cont '>
      <h1 className='section-header-title'>Transshipment warehouse address</h1>

      <div className='track glass-background grid gap-2  '>
          <div className='flex items-center'>
            <h4 className='track-label'>Recipient:</h4>
         <input className='track-input min-h-[5%]'
          type='text' 
          value='PNNKYHHT金桔(8个字母不能错)'
          // onCnange={({target: {value}}) => setValue(value)}
        
          >
  
 
         </input>
          </div>
       
         
          <div className='flex items-center'>
            <h4 className='track-label'>Shipping address:</h4>
         <input className='track-input min-h-[5%]' value='广州市白云区太和镇太和北路120号A3君丰集运中心(PNNKYHHT)室'>

 
         </input>
          </div>
   
          <div className='flex items-center'>
            <h4 className='track-label'>Phone:</h4>
         <input className='track-input min-h-[5%]' value='19924237889'>
            
 
         </input>
          </div>
          <div className='flex items-center'>
            <h4 className='track-label'>Postcode:</h4>
         <input className='track-input min-h-[5%]' value='510540'>
          
 
         </input>
          </div>
          {console.log(value)}
        <CopyToClipboard text={value}
        onCopy = {() => setCopied(true)}
        > 
          <div className='button-main' >copy</div>
         </CopyToClipboard>
         {copied ? <span>coppied</span> : null}
        </div>
  

    
      </div>
    </div>
    </div>
    
  )
}

export default HomePage