import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [isLoading, setIsLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [addressTo, setAddressTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState("");
    const [transactions, setTransactions] = useState([]);

    const getAllTransactions = async () => {
      try
      {
        if (!ethereum) return alert("Please install metamask");
        const transactionContract = getEthereumContract();  
        const availableTransactions = await transactionContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        })).reverse();
        
        console.log(structuredTransactions);
        setTransactions(structuredTransactions);
      }
      catch(error)
      {
        console.log(error);
      }
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
                // getAllTransactions();
            }
            else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const checkIfTransactionsExist = async () => {
      try
      {
        const transactionContract = getEthereumContract();
        const transactionCount = await transactionContract.getTransactionCount();
        window.localStorage.setItem("transactionCount", transactionCount);
      }
      catch(error)
      {
        console.log(error);
        throw new Error("No ethereum object");
      }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please connect metamask wallet");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]); // mery hisaab sey yaha currentAccount ki jaga connectedAccount ayga
        }
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object");

        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please connect metamask wallet");
            const transactionContract = getEthereumContract();
            // using builtin utility function to convert decimal amount into GWEI
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
              method: 'eth_sendTransaction',
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208',
                value: parsedAmount._hex,
              }]
            });
            
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            
            await transactionHash.wait();
            
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            location.reload();

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, isLoading, connectWallet, currentAccount, sendTransaction, addressTo, setAddressTo, amount, setAmount, keyword, setKeyword, message, setMessage }} >
            {children}
        </TransactionContext.Provider>
    );
}
