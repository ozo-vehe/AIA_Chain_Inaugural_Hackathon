import { getAccount } from "@wagmi/core";
import { config } from "../config/wagmi";
import { parseEther } from "ethers";
import { writeBudgetContract } from "./writeContract";

export const requestFund = async (formData, budgetAddress) => {
  const { address } = getAccount(config);
  console.log(address);
  console.log(formData);
  console.log(budgetAddress);

  const txHash = await writeBudgetContract("requestFunds", budgetAddress, [
    parseEther(formData.amount),
    formData.reason,
  ]);
  console.log(txHash);
  
}