import React, { useContext } from 'react'
import {FaEthereum} from 'react-icons/fa'
import { SfcContext } from '../../context/sfcContext'


const ethpay = () => {
  const {setChoosenItemsAmount, choosenItems, paymentPackages} = useContext(SfcContext)
  console.log(choosenItems)
  const ids = paymentPackages.map(p => p.id)
  const filteredId = [...new Set(ids)]

const filteredPackages = filteredId.map(id => {
   return paymentPackages.find(p => p.id === id)
 })
const items = choosenItems.map(id => {
  return filteredPackages.find(p => p.id === id)
})
console.log(items)
const total = items.reduce((sum, i) => {
  return sum + parseInt(i.billing)

}, 0)
console.log(total)

  return (
    <div className='payment-section width-[10vw] min-h-[100vh]' >
      <div>
        <h1 className='section-header-title mb-[8px]'>Transfer <span>{total}$</span>  worth Etherium/USDT</h1>
        <div className='payment-container glass-background'>
          <div className='pay-input-cont'>
            <div className='flex items-center justify-between pr-[18px] pl-[8px]'>
            <input 
            type='text'
            className='pay-input'
            placeholder='0.0'
            pattern='^[0-9]*[.,]?[0-9]*$'
            onChange={e => handleChange(e, 'amount')}
             />

             <span className='pl-[8px]'><FaEthereum /> </span> 
             <p>ETH</p>
             </div>

          </div>
          <div className='pay-input-cont  pl-[8px]'>
            <input 
            type='text'
            className='pay-input'
            placeholder='0x...'
            onChange={e => handleChange(e, 'addressTo')}
             />

          </div>
          <div  onClick={e => handleSubmit(e)} className='pay-confirm button-main'>
          Confirm
        </div>

        </div>
      </div>
      <div className='payment-hashs'>
        <h1 className='section-header-title mb-[8px]'>Previos Transactions:</h1>
        <div className='prev-trans glass-background'>
          <div>2831928</div>
        </div>
      </div> 
    </div>
  )
}

export default ethpay