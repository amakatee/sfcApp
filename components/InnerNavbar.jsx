import React,{useState} from 'react'
import Link from 'next/link'
import {useRouter } from 'next/router'
import InnerNavComp from './InnerNavComp'


const InnerNavbar = ({initialSelected = 'Domestic Package'}) => {
    const router = useRouter()
    const [selected, setSelected] = useState(initialSelected)

  return (
    <div className='flex content-center cursor-pointer justify-around gap-8 max-w-[400px] mx-auto text-white inner-nav'>
          <InnerNavComp
          text="Domestic Package"
          isActive={Boolean(selected==="Domestic Package")}
          setSelected={setSelected}
          path='/package'
           />
            <InnerNavComp
          text="Pending Storage"
          isActive={Boolean(selected==="Pending Storage")}
          setSelected={setSelected}
          path='/package/pending'
           />
               <InnerNavComp
          text="Pending Payment"
          isActive={Boolean(selected==="Pending Payment")}
          setSelected={setSelected}
          path='/package/payment'
           />
                 <InnerNavComp
          text="Pending Reciept"
          isActive={Boolean(selected==="Pending Reciept")}
          setSelected={setSelected}
          
          path='/package/reciept'
           />
         
         {/* <div className='section-header-title' onClick={() => {router.push('/package/domestic')}}>Pending Storage</div> */}
         {/* <div className='section-header-title' onClick={() => {router.push('/package/payment')}}>Pending Payment</div> */}
         {/* <div className='section-header-title' onClick={() => {router.push('/package/reciept')}}>Pending Reciept</div> */}
    </div>
  )
}

export default InnerNavbar