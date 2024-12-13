import { config } from "../config/wagmi";
import { writeContract } from "wagmi/actions";
import { budgetAbi } from "../contracts/Budget/Budget.json";
import { getAccount } from "wagmi/actions";

export const writeBudgetContract = async (
  functionName,
  budgetAddress,
  args = [],
) => {
  const { address } = getAccount(config);
  let res;
  if (args.length < 1) {
    res = await writeContract(config, {
      address: budgetAddress,
      abi: budgetAbi,
      functionName,
      account: address,
    });
  } else {
    res = await writeContract(config, {
      address: budgetAddress,
      abi: budgetAbi,
      functionName,
      args,
      account: address,
    });
  }

  return res;
};
