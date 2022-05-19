import { createContext,useEffect,useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";




export const SfcContext = createContext()

export const SfcProvider = ({ children }) => {
    const [appStatus, setAppStatus ] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [packs, setPackages] = useState([])
    const router = useRouter()

    useEffect(() => {
        checkIfWalletIsConnected()
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

    const fetchPAckages = async () => {
        const query = `
        *[_type == 'packages']{
            "user": user->{nicname, walletAddress},
            package,
            timestamp
        }| order(timestamp desc)
        `
        const packages = await client.fetch(query)
        setPackages([])
        sanityResponse.forEach(async (item) => {
            const newItem = {
                package: item.package,
                timestamp: item.timestamp,
                user: {
                    nickname: item.user.nickname,
                    walletAddress: item.user.walletAddress
                },
           
            }
            setPackages( prev => [...prev , newItem])

        })
    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if( appStatus !== 'connected') return 
    } 

    return (
       <SfcContext.Provider 
       value={{ 
        appStatus, 
        currentAccount,
        connectWallet
    }
       }> 
       {children}

       </SfcContext.Provider>
    )
}