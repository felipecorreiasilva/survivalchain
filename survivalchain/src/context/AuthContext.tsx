'use client'

import { ethers, Wallet } from 'ethers';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';


const AuthContext = createContext({
    account: [null],
    setAccount: function (value:any) { return value },
    connectWallet: function () {},
    disconnectWallet: function () {},
    
});

interface AuthProviderProps {
    children: ReactNode;
}

const API_KEY_TEST_NETWORK = process.env.NEXT_PROVIDER_URL_TEST_NETWORK

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any|null>(AuthContext);

const getInitialAuth = () => {
    const account = (typeof window !== 'undefined') && localStorage.getItem('account')
    return account && JSON.parse(account)
}

export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

    const [account, setAccount] = useState<any|null>(getInitialAuth);

    const requestAccount=async()=> {
        console.log('Requesting account: ')

        if (window.ethereum){
            console.log('detected')
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                console.log(accounts)
                setAccount(accounts)
                return accounts
            }catch(err){
                console.log('error: ', err)
            }
        }else {
            alert('Meta mask not detected')
        }
    }

    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account))
    }, [account]);

    const connectWallet= async() => {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();

            // const provider = new ethers.providers.AlchemyProvider('optimism', API_KEY_TEST_NETWORK)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            // const erc20 = new ethers.Contract()
            

        }
        
    }

    const disconnectWallet = async() => {
        if (window.ethereum){
            console.log('detected')
            try {
                await window.ethereum.request({
                    "method": "wallet_revokePermissions",
                    "params": [
                      {
                        "eth_accounts": {}
                      }
                    ]
                  });
                setAccount(null)
            }catch(err){
                console.log('error: ', err)
            }
        }else {
            alert('Meta mask not detected')
        }
        
        
    }

    

    const value = {
        account,
        setAccount,
        connectWallet,
        disconnectWallet

    }


    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
};