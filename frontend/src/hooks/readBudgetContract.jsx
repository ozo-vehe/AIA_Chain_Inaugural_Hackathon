import { useReadContract } from 'wagmi';
import { budgetAbi } from '../contracts/Budget/Budget.json';

export const useReadBudgetContract = ({ functionName, contractAddress }) => {
  const { data, isLoading, isError, error } = useReadContract({
    address: contractAddress,
    abi: budgetAbi,
    functionName: functionName,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
