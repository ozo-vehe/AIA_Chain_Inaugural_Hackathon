import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { fetchBudgetDetails } from "./features/budget/budgetSlice.js";
import { fetchBudgets } from "./features/budgetManager/budgetManagerSlice.js";

const App = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    if(address) {
      dispatch(fetchBudgetDetails(address));
      console.log(address);
      dispatch(fetchBudgets());
    }
  }, [address, dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
