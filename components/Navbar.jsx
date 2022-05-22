import React from 'react'
import Link from 'next/link'
import {CgHome} from 'react-icons/cg'
import { BsFillPersonFill} from 'react-icons/bs'
import {GoPackage} from 'react-icons/go'
import {AiOutlinePayCircle} from 'react-icons/ai'
import {FaEthereum} from 'react-icons/fa'
import { useRouter } from 'next/router'
import { SfcContext } from '../context/sfcContext'
import { useContext } from 'react'





export default function Navbar() {
    const router = useRouter()
    const {currentAccount, curentUser, products} = useContext(SfcContext)
    console.log(products)
  

    
  return (
    <>
 
   <header className="header ">
       {/* {user ?   <button onClick={() => router.push("api/auth/logout")} id='logo' className='z-100'><h1>{'Log Out'}</h1></button>  :   <button onClick={() => router.push("api/auth/login")} id='logo' className='z-100'><h1>{'Sign In'}</h1></button>} */}

       <nav className="container nav">
          <div className="nav__menu">
               <ul className="nav__list">

                  

                   <li onClick={() => {router.push(`/home/?mint=${currentAccount}`)}} className="nav__item">
            
                           <i className="nav__link active__link" ><CgHome size={20} color="fff" /></i>
              
                   </li>
                   <li  onClick={() => {router.push(`/package`)}} className="nav__item">
     
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

// export const getStaticProps = async () => {
//   const query = "*[_type == 'users']"
//   const users = await client.fetch(query)
//   console.log(users)
//   return {
//     props: {users}
//   }
// }