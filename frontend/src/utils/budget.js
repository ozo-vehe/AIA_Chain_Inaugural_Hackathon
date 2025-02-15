import { readContract, writeContract, getAccount } from "wagmi/actions";
import { parseEther, formatEther } from "ethers";
import { config } from "../config/wagmi";
import {
  contractAddress,
  budgetManagerAbi,
} from "../contracts/BudgetManager/BudgetManager.json";
import { readBudgetContract } from "./readContract";
import { writeBudgetContract } from "./writeContract";


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

  return txHash;
};

export const getAllBudgets = async () => {
  const smartContractBudget = await readContract(config, {
    address: contractAddress,
    abi: budgetManagerAbi,
    functionName: "listBudgets",
  });

  let budgets = [];

  const promises = smartContractBudget.map(async (budget) => {
    const budgetAddress = budget.budgetAddress;
    const owner = await readBudgetContract("owner", budgetAddress);

    const title = await readBudgetContract("title", budgetAddress);
    const departmentCount = await readBudgetContract(
      "departmentCount",
      budgetAddress,
    );
    const totalBudget = await readBudgetContract("totalBudget", budgetAddress);
    const orgName = await readBudgetContract("orgName", budgetAddress);
    const budgetMonitor = await readBudgetContract(
      "totalBudgetMonitor",
      budgetAddress,
    );
    const createdAt = readableDate(budget.createdAt);

    const budgetDetails = {
      status: "success",
      address: budgetAddress,
      owner,
      title,
      orgName,
      totalBudget: formatEther(totalBudget),
      budgetMonitor: formatEther(budgetMonitor),
      departmentCount: Number(departmentCount),
      createdAt,
    };

    budgets.push(budgetDetails);
  });

  await Promise.all(promises);

  return budgets;
};

export const getUserBudgets = async (address) => {
  const budgets = await getAllBudgets();
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
        status: "success",
        address: budgetAddress,
        owner,
        title,
        orgName,
        totalBudget: formatEther(totalBudget),
        budgetMonitor: formatEther(budgetMonitor),
        departmentCount: Number(departmentCount),
        createdAt,
      };

      userBudgets.push(budgetDetails);
    }
  });

  await Promise.all(promises);

  return userBudgets;
};

export const getDepartments = async (budgetAddress, departmentCount) => {
  const totalBudget = await readBudgetContract("totalBudget", budgetAddress);
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
    };

    departments.push(departmentDetails);
  }
  return departments;
};

export const allocateFund = async (department, amount) => {
  const { budgetAddress, id, departmentAddress } = department;
  const allocatedFund = parseEther(amount);

  const txHash = await writeBudgetContract("allocateBudget", budgetAddress, [
    departmentAddress,
    allocatedFund,
    id,
  ]);

  return txHash;
};

export const getDepartmentOrganizations = async (departmentAddress) => {
  const budgets = await getAllBudgets();
  
  let departmentOrganizations = [];
  const promises = budgets.map(async (budget) => {
    const budgetAddress = budget.budgetAddress;
    const isDepartment = await readBudgetContract(
      "isDepartment",
      budgetAddress,
      [departmentAddress],
    );
    if (isDepartment) {
      const owner = await readBudgetContract("owner", budgetAddress);
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
        status: "success",
        address: budgetAddress,
        owner,
        title,
        orgName,
        totalBudget: formatEther(totalBudget),
        budgetMonitor: formatEther(budgetMonitor),
        departmentCount: Number(departmentCount),
        createdAt,
        allocatedBudget: formatEther("100000000000000000000"),
      };

      departmentOrganizations.push(budgetDetails);
    }
  });

  await Promise.all(promises);

  return departmentOrganizations;
};

export const getFundRequests = async (budgetAddress, departmentAddress) => {
  const request = await readBudgetContract("fundRequests", budgetAddress, [
    departmentAddress,
  ]);

  const formattedRequest = {
    department: departmentAddress,
    budget: budgetAddress,
    amount: formatEther(request[0]),
    reason: request[1],
    approved: request[2],
    isExist: request[3],
  };
  
  return formattedRequest;
};

export const approveFundRequest = async (request) => {
  console.log(request);
  try {
    const txHash = await writeBudgetContract("approveFundRequest", request.budget, [request.department, request.departmentId]);
    console.log(txHash)
    return txHash;
    
  } catch (error) {
    console.log(error);
  }
}
