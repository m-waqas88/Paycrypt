import React, { useState, useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { TransactionContext } from '../context/TransactionContext';
import { Loader } from './';
import { shortenAddress } from '../utils/shortenAddress';

const Welcome = () => {

    const { isLoading, connectWallet, currentAccount, sendTransaction, addressTo, setAddressTo, amount, setAmount, keyword, setKeyword, message, setMessage  } = useContext(TransactionContext);
    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
    const Input = ({ placeholder, name, type, value, handleChange }) => (
        <input
            placeholder={placeholder}
            type={type}
            step="0.0001"
            onChange={handleChange}
            value={value}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
            name={name}
        />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!addressTo || !amount || !keyword || !message) return;

        sendTransaction();

    }
    
    const changeAddressTo = (e) => {
      setAddressTo(e.target.value);  
    }

    const changeAmount = (e) => {
      setAmount(e.target.value);  
    }

    const changeKeyword = (e) => {
      setKeyword(e.target.value);  
    }

    const changeMessage = (e) => {
      setMessage(e.target.value);  
    }

      return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between lg:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrency easily on Paycrypt.
                    </p>
                    {
                        !currentAccount && (
                            <button className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]" type="button" onClick={connectWallet}>
                                <p className="text-white text-base font-semibold">Connect Wallet</p>
                            </button>
                        )
                    }
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Etheruem
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}>
                            Low fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        {/*
                        <Input placeholder="Address To" name="addressTo" type="text" value={addressTo} handleChange={changeAddressTo}/>
                        <Input placeholder="Amount (ETH)" name="amount" type="number" value={amount} handleChange={changeAmount}/>
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={keyword} handleChange={changeKeyword}/>
                        <Input placeholder="Enter message" name="message" type="text" value={message} handleChange={changeMessage}/>
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        */}
              
                        <input
                            placeholder="Address To"
                            type="text"
                            onChange={changeAddressTo}
                            value={addressTo}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
                            name="addressTo"
                        />
                        <input
                            placeholder="amount"
                            type="number"
                            step="0.0001"
                            onChange={changeAmount}
                            value={amount}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
                            name="amount"
                        />
                        <input
                            placeholder="Keyword GIF"
                            type="text"
                            onChange={changeKeyword}
                            value={keyword}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
                            name="keyword"
                        />
                        <input
                            placeholder="message"
                            type="text"
                            onChange={changeMessage}
                            value={message}
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
                            name="message"
                        />
                        {isLoading ?
                            <Loader /> :
                            (<button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send Now
                            </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
