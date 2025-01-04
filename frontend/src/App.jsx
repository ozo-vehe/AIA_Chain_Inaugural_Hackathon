import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import {
  fetchAllBudgets,
} from "./features/budget/budgetSlice.js";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      console.log("fetching budgets");
      dispatch(fetchAllBudgets());
    }
  }, [address, dispatch]);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <div className="flex-1 w-[] h-[92vh] py-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
