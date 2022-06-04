import React, { useContext } from 'react'
import { SfcContext } from '../../context/sfcContext'

const index = () => {
  const {currentAccount} = useContext(SfcContext)
  return (
    <div className='profile-section'>
    <div className='profile'>
      <h1>Current Accound Id</h1>
      <p>{currentAccount}</p>
      <p className='help-title mt-[8px]'> Contact me for any issues <a target='_blank' href='https://tlgg.ru/zininaa'> <span className='link-tele'>Telegram</span></a> </p>
    </div>
    </div>
  )
}

export default index