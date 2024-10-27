import React, { useState } from 'react';
import Logo from "../assets/Logo(7).png";
import Home from "../assets/Vector(1).png";
import Person from "../assets/Ellipse1.png";
import { Link } from "react-router-dom";

const Dashboard_navbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletConnected(true);
          console.log("Connected account:", accounts[0]);
        }
      } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <nav className="flex justify-between border-b p-[2rem]">
      <Link to='/'>
        <img
          src={Logo}
          alt="Brand Logo"
          className="top-[4px] h-[47px] w-[109px]"
        />
      </Link>

      <div className="flex gap-7">
        <div className="flex h-[53px] w-[136px] gap-2 rounded-[12px] bg-[rgba(245,239,235,1)] p-[16px]">
          <img src={Home} alt="Home" className="mt-1 h-[16px] w-[16px]" />
          <h1 className="text-[rgba(255,69,13,1)] text-[16px] font-[500]">
            Dashboard
          </h1>
        </div>

        <h1 className="h-[53px] w-[140px] rounded-[10px] p-[16px]">
          Departments
        </h1>

        <h1 className="h-[53px] w-[140px] rounded-[10px] p-[16px]">
          Fund Requests
        </h1>
      </div>

      <button 
        onClick={connectWallet} 
        className="flex h-[40px] w-[159px] gap-3 rounded-[4px] bg-gray-200 p-[8px] hover:bg-gray-300 focus:outline-none"
      >
        <img src={Person} alt="User Avatar" />
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-[700] leading-[20.8px]">
          {walletConnected ? "Connected" : "Connect Wallet"}
        </h1>
      </button>
    </nav>
  );
};

export default Dashboard_navbar;
