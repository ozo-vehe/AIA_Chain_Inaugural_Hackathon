import Dashboard_navbar from "../components/dashboard_navbar";
import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";
import nobudget from "../assets/Blue.png";
import AnimationWrapper from "../common/page-Animaton";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { abi, contractAddress } from "../smartContract/constant";

const Dashboard = () => {
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [requestedFunds, setRequestedFunds] = useState(0);
  const [spentFunds, setSpentFunds] = useState(0);
  const [totalBudget, setTotalBudget] = useState(100);
  const [amount, setAmount] = useState("");

  const getUserData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress(); 
  
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      try {
        const allocatedBudgetResponse = await contract.getAllocatedBudget(userAddress);
        setAllocatedBudget(ethers.formatEther(allocatedBudgetResponse)); // Convert and set allocated budget
  
        const requestedFundsResponse = await contract.getRequestFunds(userAddress);
        setRequestedFunds(ethers.formatEther(requestedFundsResponse)); // Convert and set requested funds
  
        const spentFundsResponse = await contract.getSpentFunds(userAddress);
        setSpentFunds(ethers.formatEther(spentFundsResponse)); // Convert and set spent funds
  
        const fetchBudget =  await contract.getTotalBudget();
        setTotalBudget(ethers.formatEther(fetchBudget)); // Format total budget as well
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    } else {
      console.log("Please install Metamask.");
    }
  };
  
  useEffect(() => {
    getUserData(); 
  }, []);

  const requestFunds = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
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

  return (
    <>
      <AnimationWrapper>
        <section>
          <Dashboard_navbar />
          <div className="flex justify-between p-[5rem]">
            <div className="flex h-[71px] w-[336px] gap-[24px]">
              <img
                src={Person}
                alt="User Avatar"
                className="h-[64] w-[64px] bg-[rgba(217,217,217,1)]"
              />
              <div>
                <h1 className="h-[42px] w-[248px] text-[32px] font-[600] leading-[41.6px]">
                  Welcome Back
                </h1>
                <p className="h-[21px] w-[248px] text-[16px] font-[400] leading-[20.8px]">
                  Here&lsquo;s an overview of your budgets
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <button className="h-[45px] w-[179px] gap-[8px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white">
                Fund Organization
              </button>
              <button
                className="h-[45px] w-[151px] gap-[8px] rounded-[12px] border-[1px] border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                onClick={requestFunds}
              >
                Request Budget
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 p-5">
            <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Budget
                </h2>
                <p className="text-[40px] font-[600]">{totalBudget}ETH</p>
              </div>
              <div>
                <img src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Allocated
                </h2>
                <p className="text-[40px] font-[600]">{allocatedBudget}ETH</p>
              </div>
              <div>
                <img src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Spent
                </h2>
                <p className="text-[40px] font-[600]">{spentFunds}ETH</p>
              </div>
              <div>
                <img src={Money} alt="Money Box" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-5 p-5">
  
          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                Requested Funds
              </h2>
              <p className="text-[40px] font-[600]">{requestedFunds}ETH</p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
