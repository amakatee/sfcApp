import React,{useEffect} from 'react'
import {useRouter } from 'next/router'
import Link from 'next/link'


const InnerNavComp = ({text, setSelected, path}) => {
    const router = useRouter()



 
  return (
    <>
    <Link href={path}>
        <div
        className={router.asPath === path ? 'section-header-title active-inner-nav' : 'section-header-title '}
        onClick={() => setSelected(text)}
        >
          {text} 
        </div>
        </Link>
       </>   

   
  )
}

export default InnerNavComp