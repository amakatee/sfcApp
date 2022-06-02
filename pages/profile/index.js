import React, { useContext } from 'react'
import { SfcContext } from '../../context/sfcContext'

const index = () => {
  const {currentAccount} = useContext(SfcContext)
  return (
    <div className='profile-section'>
    <div className='profile'>
      <h1>Current Accound Id</h1>
      <p>{currentAccount}</p>
    </div>
    </div>
  )
}

export default index