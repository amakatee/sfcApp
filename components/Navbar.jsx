import React from 'react'
import Link from 'next/link'
import {CgHome} from 'react-icons/cg'
import { BsFillPersonFill} from 'react-icons/bs'
import {GoPackage} from 'react-icons/go'
import {AiOutlinePayCircle} from 'react-icons/ai'
import {FaEthereum} from 'react-icons/fa'
import { useRouter } from 'next/router'




export default function Navbar() {
    const router = useRouter()
  return (
    <>
 
   <header className="header ">
       <div id='logo' className='z-100'><h1>SFH</h1></div>
       <nav className="container nav">
          <div className="nav__menu">
               <ul className="nav__list">

                  

                   <li onClick={() => {router.push('/home')}} className="nav__item">
            
                           <i className="nav__link active__link" ><CgHome size={20} color="fff" /></i>
              
                   </li>
                   <li  onClick={() => {router.push('/package')}} className="nav__item">
     
                           <i className="nav__link active__link"><GoPackage size={20} color="fff" /></i>
                     
                   </li>

               

                   <li className="nav__item">
                       <Link href="" className="nav__link active__link">
                           <i className="nav__link active__link"><FaEthereum size={20} color='fff' /></i>
                       </Link>
                   </li>

                   <li className="nav__item">
                       <Link href="" className="nav__link active__link">
                           <i ><BsFillPersonFill size={20} color="fff" /></i>
                       </Link>
                   </li>

               </ul>
           </div>
           {/* <img src="https://thumbs.dreamstime.com/b/abstract-sci-fi-shiny-huge-saturn-abstract-sci-fi-shiny-huge-saturn-galaxy-star-landscape-background-d-rendering-167177510.jpg" className="nav__img" alt=""></img> */}
       </nav>
   </header>
   </>
  )
}