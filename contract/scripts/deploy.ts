import { ethers } from "hardhat";

async function main() {
    const BudgetManager = await ethers.getContractFactory("BudgetManager");
    const budgetManager = await BudgetManager.deploy();

    console.log("Budget manager deployed at: ", budgetManager.target);}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})