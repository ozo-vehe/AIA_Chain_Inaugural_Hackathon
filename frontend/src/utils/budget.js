import { readContract, writeContract, getAccount } from "wagmi/actions";
import { parseEther } from "ethers";
import { config } from "../config/wagmi";
import {
  contractAddress,
  budgetManagerAbi,
} from "../contracts/BudgetManager/BudgetManager.json";
import { budgetAbi } from "../contracts/Budget/Budget.json";

// console.log(budgetManagerAbi)

const readBudgetContract = async (functionName, budgetAddress) => {
  const res = await readContract(config, {
    address: budgetAddress,
    abi: budgetAbi,
    functionName,
  });

  return res;
};

export const createBudget = async (formData) => {
  const { address } = getAccount(config);
  console.log(address);
  console.log(formData);
  const txHash = await writeContract(config, {
    address: contractAddress,
    abi: budgetManagerAbi,
    functionName: "addBudget",
    args: [
      formData.budget_title,
      formData.org_name,
      parseEther(formData.total_budget),
      formData.departments,
    ],
    account: address,
  });

  console.log(txHash);
  return txHash;
};

export const getAllBudgets = async () => {
  console.log("Getting all budgets...");
  const budgets = await readContract(config, {
    address: contractAddress,
    abi: budgetManagerAbi,
    functionName: "listBudgets",
  });

  console.log(budgets);
  return budgets;
};

export const getUserBudgets = async () => {
  const { address } = getAccount(config);
  const budgets = await getAllBudgets();
  let userBudgets = [];

  const promises = budgets.map(async (budget) => {
    const budgetAddress = budget.budgetAddress;
    const owner = await readBudgetContract("owner", budgetAddress);

    if (owner == address) {
      const title = await readBudgetContract("title", budgetAddress);
      const departmentCount = await readBudgetContract(
        "departmentCount",
        budgetAddress,
      );
      const totalBudget = await readBudgetContract(
        "totalBudget",
        budgetAddress,
      );
      const orgName = await readBudgetContract("orgName", budgetAddress);
      const budgetMonitor = await readBudgetContract(
        "totalBudgetMonitor",
        budgetAddress,
      );

      const budgetDetails = {
        owner,
        title,
        orgName,
        totalBudget,
        budgetMonitor,
        departmentCount,
        createdAt: budget.createdAt,
      };

      return budgetDetails;
    }
  });

  userBudgets = await Promise.all(promises.filter(Boolean));
  console.log(userBudgets);
  return userBudgets
};
