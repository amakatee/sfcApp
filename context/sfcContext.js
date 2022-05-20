import { createContext,useEffect,useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";




export const SfcContext = createContext()

export const SfcProvider = ({ children }) => {
    const [appStatus, setAppStatus ] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [products, setPackages] = useState([])
    const [storageProducts, setStorageProducts] = useState([])
    const router = useRouter()

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(()=>{
        if(!currentAccount && appStatus =='connected') return 
        getCurrentUserDetails(currentAccount)
        fetchPackages()
        fetchStorage()

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
   
        }| order(timestamp desc)`
        const storagePackages = await client.fetch(query)

        storagePackages.forEach(async (item) => {
            const newItem = {
                info:item.info,
                weight: item.weight,
                user: {
                   
                    walletAddress: item.user.walletAddress
                },
           
            }
            setStorageProducts(prev => [...prev, newItem])

        })
    }


    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if( appStatus !== 'connected') return 

        const query = `
        *[_type == "users" && _id == "${userAccount}"]{
            "packages": packages[]->{timestamp, domesticTrack, info}|order(timestamp desc),
            "pendingStorage": pendingStorage[]->{weight, info}|order(timestamp desc),
        
            walletAddress
                }
              
      `
      const response = await client.fetch(query)

      setCurrentUser({
        domesticTrack: response[0].domesticTrack,
        info: response[0].info,
        walletAddress: response[0].walletAddress,
        weight: response[0].weight,
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
        storageProducts

        
    }
       }> 
       {children}

       </SfcContext.Provider>
    )
}