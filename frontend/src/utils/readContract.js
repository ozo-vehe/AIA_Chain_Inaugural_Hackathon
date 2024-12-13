import { config } from "../config/wagmi";
import { readContract } from "wagmi/actions";
import { budgetAbi} from "../contracts/Budget/Budget.json";

export const readBudgetContract = async (functionName, budgetAddress, args = []) => {
  let res;
  if (args.length < 1) {
    res = await readContract(config, {
      address: budgetAddress,
      abi: budgetAbi,
      functionName,
    });
  } else {
    res = await readContract(config, {
      address: budgetAddress,
      abi: budgetAbi,
      functionName,
      args,
    });
  }

  return res;
};