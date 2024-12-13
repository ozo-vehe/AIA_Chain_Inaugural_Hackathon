import { readContract, writeContract, getAccount } from "wagmi/actions";
import { parseEther, formatEther } from "ethers";
import { config } from "../config/wagmi";
import {
  contractAddress,
  budgetManagerAbi,
} from "../contracts/BudgetManager/BudgetManager.json";
import { readBudgetContract } from "./readContract";
import { writeBudgetContract } from "./writeContract";

// console.log(budgetManagerAbi)

const readableDate = (createdAt) => {
  const timestampInSeconds = Number(createdAt);

  // Create a Date object
  const readableDate = new Date(timestampInSeconds * 1000);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(readableDate);

  return formattedDate;
};

export const currencyFormat = new Intl.NumberFormat("en-US");

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

export const getUserBudgets = async (address) => {
  const budgets = await getAllBudgets();
  console.log(budgets);
  let userBudgets = [];

  const promises = budgets.map(async (budget) => {
    const budgetAddress = budget.budgetAddress;
    const owner = await readBudgetContract("owner", budgetAddress);

    if (owner === address) {
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
      const createdAt = readableDate(budget.createdAt);

      const budgetDetails = {
        status: 'success',
        address: budgetAddress,
        owner,
        title,
        orgName,
        totalBudget: formatEther(totalBudget),
        budgetMonitor: formatEther(budgetMonitor),
        departmentCount: Number(departmentCount),
        createdAt,
      };

      return budgetDetails;
    }
  });

  userBudgets = await Promise.all(promises.filter(Boolean));
  console.log(userBudgets);
  return userBudgets;
};

export const getDepartments = async (budgetAddress, departmentCount) => {
  const totalBudget = await readBudgetContract(
    "totalBudget",
    budgetAddress,
  );
  const budgetMonitor = await readBudgetContract(
    "totalBudgetMonitor",
    budgetAddress,
  );
  const departments = [];
  
  for (let i = 0; i < departmentCount; i++) {
    const department = await readBudgetContract("departments", budgetAddress, [
      i,
    ]);
    const departmentDetails = {
      budgetAddress,
      totalBudget: formatEther(totalBudget),
      budgetMonitor: formatEther(budgetMonitor),
      id: Number(department[0]),
      departmentAddress: department[1],
      allocation: formatEther(department[2]),
      spent: formatEther(department[3]),
      isAllocated: department[4],
    }

    departments.push(departmentDetails);
  }
  return departments;
};

export const allocateFund = async (department, amount) => {
  console.log(department);
  const {budgetAddress, id, departmentAddress} = department;
  const allocatedFund = parseEther(amount)
  console.log(allocatedFund);

  const txHash = await writeBudgetContract("allocateBudget", budgetAddress, [
    departmentAddress,
    allocatedFund,
    id,
  ]);

  console.log(txHash);

  return txHash;
}
