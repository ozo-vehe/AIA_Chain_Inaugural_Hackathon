import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AnimationWrapper from "../common/page-Animaton";
import Dashboard_navbar from "../components/dashboard_navbar";
import { abi, contractAddress } from "../smartContract/constant";
import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";

const AdminDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [totalBudget, setTotalBudget] = useState(100);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchTotalBudget = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        setProvider(provider);
        setSigner(signer);

        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
          const budget = await contract.getTotalBudget();
          console.log("Total Budget:", budget)
          setTotalBudget(ethers.formatEther(budget)); // Display in ETH format
        } catch (error) {
          console.error("Error fetching total budget:", error.message);
        }
      }
    };

    fetchTotalBudget();
  }, []);

  const allocateBudget = async () => {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.allocateBudget(
          address,
          ethers.parseEther(amount)
        );
        const receipt = await tx.wait();
        console.log("Successfully allocated budget:", receipt);
      } catch (error) {
        console.error("Error allocating budget:", error.message);
      }
    }
  };

  const requestFunds = async () => {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.requestFunds(ethers.parseEther(amount));
        const receipt = await tx.wait();
        console.log("Funds successfully requested:", receipt);
      } catch (error) {
        console.error("Error requesting funds:", error.message);
      }
    }
  };

  const releaseFunds = async () => {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.releaseFunds(
          address,
          ethers.parseEther(amount)
        );
        const receipt = await tx.wait();
        console.log("Funds successfully released:", receipt);
      } catch (error) {
        console.error("Error releasing funds:", error.message);
      }
    }
  };

  return (
    <AnimationWrapper>
      <Dashboard_navbar />
      <div className="p-6">
        <div className="my-10 ml-10 flex h-[71px] w-[336px] gap-[24px]">
          <img src={Person} alt="User Avatar" className="h-[64] w-[64px] bg-[rgba(217,217,217,1)]" />
          <div>
            <h1 className="h-[42px] w-[248px] text-[32px] font-[600] leading-[41.6px]">
              Welcome Back
            </h1>
            <p className="h-[21px] w-[248px] text-[16px] font-[400] leading-[20.8px]">
              Here’s an overview of requested budgets
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 p-5">
          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">Total Budget</h2>
              <p className="text-[40px] font-[600]">{totalBudget} ETH</p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>
        </div>

        <div className="my-5">
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Ethereum address"
              className="border p-2 w-full mt-2 rounded"
            />
          </label>
          <label className="mt-4 block">
            Amount (ETH):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in ETH"
              className="border p-2 w-full mt-2 rounded"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={allocateBudget}
            className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
          >
            Allocate Budget
          </button>

          <button
            onClick={requestFunds}
            className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
          >
            Request Funds
          </button>

          <button
            onClick={releaseFunds}
            className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
          >
            Release Funds
          </button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminDashboard;
