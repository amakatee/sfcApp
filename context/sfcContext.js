import { createContext,useEffect,useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { nanoid } from "nanoid";




export const SfcContext = createContext()

export const SfcProvider = ({ children }) => {
    const [appStatus, setAppStatus ] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [products, setPackages] = useState([])
    const [storageProducts, setStorageProducts] = useState([])
    const [paymentPackages, setPaymentPackages] = useState([])
    const [recieptPackages, setRecieptPackages] = useState([])
    const [addressesArray, setAdresses] = useState([])
    
    const router = useRouter()

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(()=>{
        if(!currentAccount && appStatus =='connected') return 
        getCurrentUserDetails(currentAccount)
        fetchPackages()
        fetchStorage()
        fetchPayment()
        fetchReciept()
        fetchAdresses()

    }, [currentAccount, appStatus])

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
        const paymentPackages = await client.fetch(query)

        paymentPackages.forEach(async (item) => {
            const newItem = {
                id: item.order,
                recipient: item.recipient,
                type: item.type,
                billing: item.billing,
                weight: item.weight,
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
            type,
            weight,
            order
        }`

        const recieptPackages = await client.fetch(query)
        recieptPackages.forEach( async (item) => {
            const newItem = {
                id: item.order,
                billing: item.billing,
                internationalCode: item.internationalCode,
                reciepent: item.reciepent,
                type: item.type,
                weight:item.weight,
                order: item.order,
                user: {
                    walletAddress: item.user.walletAddress

                }
            }
            setRecieptPackages(prev => [...prev, newItem])
        })
    }
    const fetchAdresses = async () => {
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
                telegram: item.telegram,
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
        fetchAdresses,
        addressesArray


        
    }
       }> 
       {children}

       </SfcContext.Provider>
    )
}