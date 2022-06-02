import React, { useContext, useEffect, useState } from 'react'
import {FaEthereum} from 'react-icons/fa'
import { SfcContext } from '../../context/sfcContext'


const ethpay = () => {

  const {setChoosenItemsAmount, choosenItems, paymentPackages, formData, handleChange, sendTransaction, currentAccount} = useContext(SfcContext)
  const [acc, setAcc] = useState()

  useEffect(() => {
    setAcc(`${currentAccount.slice(0, 7)}...${currentAccount.slice(37)}`)

  }, [currentAccount])
  const ids = paymentPackages.map(p => p.id)
  const filteredId = [...new Set(ids)]

const filteredPackages = filteredId.map(id => {
   return paymentPackages.find(p => p.id === id)
 })
const items = choosenItems.map(id => {
  return filteredPackages.find(p => p.id === id)
})
console.log(choosenItems)
const total = items.reduce((sum, i) => {
  return sum + parseInt(i.billing)

}, 0)
console.log(total)

const handleSubmit = async (e) => {
  const {addressTo, amount } = formData
  console.log(addressTo, amount)
  e.preventDefault()
  if(!addressTo || !amount)  return 
  sendTransaction()

}

  return (
    <div className='payment-section width-[10vw] min-h-[100vh]' >
      <div>{acc}</div>
      <div className='cc'> <span className='p-desc'>send to:</span>  0x2a7bC55a1943259cFad2951Cc73bf50FbCC2fefA</div>
      <div>
        <h1 className='section-header-title mb-[8px]'>Transfer <span>{total}$</span>  worth Etherium/USDT</h1>
        <div className='payment-container glass-background'>
          <div className='pay-input-cont'>
            <div className='flex items-center justify-between i-cs'>
              <p className='p-desc'>amount:</p>
            <input 
            type='text'
           
            className='pay-input'
            placeholder='0.0'
            pattern='^[0-9]*[.,]?[0-9]*$'
            onChange={e => handleChange(e, 'amount')}
             />
              <div className='flex-icon '>
             <span className='pl-[8px]'><FaEthereum /> </span> 
             <p>ETH</p>
             </div>
             </div>

          </div>
          <div className='pay-input-cont '>
          <div className='flex items-center justify-between i-cs'>
          <p className='p-desc'>send to:</p>
            <input 
            type='text'
            className='pay-input'
            placeholder='0x...'
            // value='0x2a7bC55a1943259cFad2951Cc73bf50FbCC2fefA'
            onChange={e => handleChange(e, 'addressTo')}
             />

          </div>
          </div>
          <div  onClick={e => handleSubmit(e)} className='pay-confirm button-main'>
          Confirm
        </div>

        </div>
        <p className='help-title mt-[8px]'> Contact me for any issues <a target='_blank' href='https://tlgg.ru/zininaa'> <span className='link-tele'>Telegram</span></a> </p>
      </div>
      <div className='payment-hashs'>
        {/* <h1 className='section-header-title mb-[8px]'>Previos Transactions:</h1>
        <div className='prev-trans glass-background'>
          <div>2831928</div>
        </div> */}
      </div> 
    </div>
  )
}

export default ethpay