import { createContext,useEffect,useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { nanoid } from "nanoid";
import {contractABI, contractAddress} from '../lib/constants'
import { ethers } from "ethers"
import axios from 'axios'


const API_KEYETH = '0438a9a0df11b7b47c95fea38758a27d8e00debd9f5a388f090cd21a7f26083d'
const API_ETH = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'



export const SfcContext = createContext()


const getEtheriumContract = () => {
   const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      
    )
    console.log({
        provider, signer,transactionContract
    })
    return transactionContract
}




export const SfcProvider = ({ children }) => {
    const [choosenItems, setChoosenItemsAmount] = useState([])
    const [appStatus, setAppStatus ] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [products, setPackages] = useState([])
    const [storageProducts, setStorageProducts] = useState([])
    const [paymentPackages, setPaymentPackages] = useState([])
    const [recieptPackages, setRecieptPackages] = useState([])
    const [addressesArray, setAdresses] = useState([])
    const [ethPrice, setEthPrice] = useState() 

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
      })
    
    const router = useRouter()

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(()=>{
        if(!currentAccount && appStatus ==='connected') return 
        getCurrentUserDetails(currentAccount)
        fetchPackages()
        fetchStorage()
        fetchPayment()
        fetchReciept()
        fetchAddresses()
        laodEth()

    }, [currentAccount, appStatus])
 
    useEffect(() => {
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(res => res.json()).then(data => setEthPrice(Object.values(data)[0]))
      
      
      }, [])


    const checkIfWalletIsConnected = async  () => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts'
            })
            if(addressArray.length > 0) {
                //connected
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
                router.push('/home')

            }else {
                //not connected
                setAppStatus('notConnected')
                router.push('/')
            }

        } catch (error) {
            console.log(error)
        }

    }
    //Initialize meta mask wallet connection
    const connectWallet = async () => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try {
            setAppStatus('loading')
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            if(addressArray > 0) {
                setCurrentAccount(addressArray[0])
                 router.push('/home')
              
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }


        } catch(error) {
            console.log(error)

        }
    }
    


    
    // @param {string} userWalletAddress
    const createUserAccount = async (userWalletAddress = currentAccount) => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const userDoc = {
                _type: 'users',
                _id: userWalletAddress,
                 nickname: 'noname',
                 walletAddress: userWalletAddress


            }
            await client.createIfNotExists(userDoc)

        }catch(err) {
            router.push('/')
            setAppStatus('error')

        }

    }

    const saveTransaction = async (
        txHash,
        amount,
        fromAddress = currentAccount,
        toAddress,

    ) => {
        const txDoc = {
            _type: 'transactions',
            _id: txHash,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamp: new Date(Date.now()).toISOString(),
            txHash: txHash,
            amount: parseFloat(amount)


        }
        await client.createIfNotExists(txDoc)


        await client
           .patch(currentAccount)
           .setIfMissing({ transactions: [] })
           .insert('after', 'transactions[-1]', [
               {
                   _key: txHash,
                   _ref: txHash,
                   type: 'reference'
               }
           ])
           .commit()
       
        return   

    }


    const sendTransaction = async (
        metamask = window.ethereum, 
        connectedAccount = currentAccount,
        
        ) => {
            try{
                if(!metamask) return alert('Please install metamask')
                const {addressTo, amount } = formData
                const transactionContract = getEtheriumContract()
                console.log(addressTo)
                const parsedAmount = ethers.utils.parseEther(amount)
                console.log(parsedAmount)
                await metamask.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: connectedAccount,
                            to: addressTo,
                            gas: '0x7EF40', 
                            value: parsedAmount._hex,

                        }
                    ]
                })
                const transactionHash = await transactionContract.publishTransactions(
                    addressTo,
                    parsedAmount,
                    `Transferring ETH ${parsedAmount} to ${addressTo}`,
                    'TRANSFER',
                )
                
               
                setIsLoading(true)
               
                await transactionHash.wait()
            

                await saveTransaction(
                    transactionHash.hash,
                    amount,
                    connectedAccount,
                    addressTo,
                  )
                setIsLoading(false)
            } catch(err){
                console.log(err)
            }
       
        
    }
   

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

  
    const fetchPackages = async () => {
        const query = `
        *[_type == 'packages']{
            "user": user->{walletAddress},
            info,
            domesticTrack,
            timestamp
        }| order(timestamp desc)
        `
        const packages = await client.fetch(query)
      
        packages.forEach(async (item) => {
            const newItem = {
                id: item.timestamp,
                domesticTrack: item.domesticTrack,
                info:item.info,
                timestamp: item.timestamp,
                user: {
                   
                    walletAddress: item.user.walletAddress
                },
           
            }
            setPackages( prev => [...prev , newItem])

        })
    }

    const fetchStorage = async () => {
        const query = ` 
        *[_type == 'pendingStorage']{
            "user": user->{walletAddress},
            info,
            weight,
            order
   
        }| order(timestamp desc)`
        const storagePackages = await client.fetch(query)
      
        storagePackages.forEach(async(item) => {
            const newItem = {
                id: item.order,
                info:item.info,
                weight: item.weight,
                order: item.order,
                checkbool:true,
             
                user: {
                   
                    walletAddress: item.user.walletAddress
                },
           
            }
           
            setStorageProducts(prev => [...prev, newItem])

        })
    }
    const fetchPayment = async () => {
        const query = `*[_type == "pendingPayment"]{
            "user": user->{walletAddress},
            type,
            recipient,
            billing,
            order,
            weight
        }| order(timestamp desc)`
        const paymentPackage = await client.fetch(query)

        paymentPackage.forEach(async (item) => {
            const newItem = {
                id: item.order,
                recipient: item.recipient,
                type: item.type,
                billing: item.billing,
                weight: item.weight,
                order:item.order,
                user: {
                   
                    walletAddress: item.user.walletAddress
                },


            }
            setPaymentPackages(prev => [...prev, newItem])
        }
      
        )
    }

    const fetchReciept = async () => {
        const query = `*[_type == "pendingReciept"]{
            "user":user->{walletAddress},
            billing,
            internationalCode,
            recipient,
            address,
            type,
            weight,
            order
        }`

        const recieptPackage = await client.fetch(query)
        recieptPackage.forEach( async (item) => {
            const newItem = {
                id: item.order,
                billing: item.billing,
                internationalCode: item.internationalCode,
                recipient: item.recipient,
                type: item.type,
                weight:item.weight,
                address: item.address,
                order: item.order,
                user: {
                    walletAddress: item.user.walletAddress

                }
            }
            setRecieptPackages(prev => [...prev, newItem])
        })
    }
    const fetchAddresses = async () => {
        const query = `*[_type == "addressShema"] {
            "user":user->{walletAddress},
            address,
            country,
            email,
            firstName,
            phone,
            secondName,
            telegram,
            fetchId,
            order,
            zip
        }`
        const addresses = await client.fetch(query)

        addresses.forEach( async (item) => {
            const newItem = {
                id: item.fetchId,
                address: item.address,
                country: item.country,
                email: item.email,
                firstName: item.firstName,
                phone: item.phone,
                secondName: item.secondName,
                order:item.order,
                telegram: item.telegram,
                zip: item.zip,
                user: {
                    walletAddress: item.user.walletAddress

                }


            }
            setAdresses (prev => [...prev, newItem])
        })
    }


    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if( appStatus !== 'connected') return 

        const query = `
        *[_type == "users" && _id == "${userAccount}"]{
            "packages": packages[]->{timestamp, domesticTrack, info}|order(timestamp desc),
            "pendingStorage": pendingStorage[]->{weight, info, order}|order(timestamp desc),
            "paymentPackages":paymentPackages[]->{weight, type, recipent, billing}|order(timestamp desc),
            "addressShema": addressShema[]->{address, country, email, secondName, telegram}|order(timestamp desc),
        
            walletAddress
                }
              
      `
      const response = await client.fetch(query)

      setCurrentUser({
        domesticTrack: response[0].domesticTrack,
        info: response[0].info,
        walletAddress: response[0].walletAddress,
        weight: response[0].weight,
        order: response[0].order,
        type: response[0].type,
        address: response[0].address
     
      })
    } 

    async function laodEth() {
        const res = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP')
      
        //   let config = {
        //     API_ETH,
        //     BASE_URL: API_ETH,
        //     method:'get',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': '*',
        //         'Access-Control-Allow-Credentials': 'true'
        //       },
        //     'x-api-key': API_KEYETH ,

        //   }
        //   try{
        //     let response = await axios.get(config)
      
        //     setEthPrice(response.data)

        //   } catch(err){
        //       console.log(err)

        //   }
       


        //    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP', {
        //     method: 'GET', 
        //     headers: {
        //          method: 'GET',
        //          responseType: "json",
        //         'Access-Control-Allow-Origin': '*',
        //         "Access-Control-Allow-Credentials":"true",
        //         'Access-Control-Allow-Methods':'*',
        //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        //         'Content-Type': 'application/json',
        //         "X-API-Key": API_KEYETH ,
        //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //     },
          
        //     credentials: 'same-origin',
         
           
        // })
        // .then((res) => setEthPrice(res))
        // .catch((err) => console.log(err))
        // const prices = await response.json()
        // console.log(response)
        // return users
        // setEthPrice(prices)
    }
    
  


    return (
       <SfcContext.Provider 
       value={{ 
        appStatus, 
        currentAccount,
        connectWallet,
        products,
        fetchPackages,
        currentUser,
        getCurrentUserDetails,
        storageProducts,
        paymentPackages,
        recieptPackages,
        fetchAddresses,
        addressesArray,
        setChoosenItemsAmount,
        choosenItems,
        
        sendTransaction,
        handleChange,
        formData,
        ethPrice



        
    }
       }> 
       {children}

       </SfcContext.Provider>
    )
}