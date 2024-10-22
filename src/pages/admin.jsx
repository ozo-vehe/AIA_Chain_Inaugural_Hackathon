import { useState } from "react";
import AnimationWrapper from "../common/page-Animaton";
import Dashboard_navbar from "../components/dashboard_navbar";
import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";

const AdminDashboard = () => {
  //The details should be fetched from the blockchain
  // Sample list of budget requests (mock data)
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      department: "Marketing",
      organization: "FutMinna",
      requestedAmount: 5000,
      status: "Pending",
    },
    {
      id: 2,
      organization: "Kadpoly",
      department: "R&D",
      requestedAmount: 12000,
      status: "Pending",
    },
    {
      id: 3,
      organization: "Nekede",
      department: "HR",
      requestedAmount: 3000,
      status: "Pending",
    },
  ]);

  // State to manage modals and selected budget
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [isAllocateModalOpen, setAllocateModalOpen] = useState(false);
  const [isReleaseModalOpen, setReleaseModalOpen] = useState(false);

  // Track the total spent (released funds) and total allocated
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalAllocated, setTotalAllocated] = useState(0);

  // Open Allocate Modal
  const openAllocateModal = (budget) => {
    setSelectedBudget(budget);
    setAllocateModalOpen(true);
  };

  // Open Release Modal
  const openReleaseModal = (budget) => {
    setSelectedBudget(budget);
    setReleaseModalOpen(true);
  };

  // Close Modals
  const closeModals = () => {
    setSelectedBudget(null);
    setAllocatedAmount("");
    setAllocateModalOpen(false);
    setReleaseModalOpen(false);
  };

  // Handle Allocate Funds
  const handleAllocateFunds = () => {
    if (allocatedAmount === "") return;

    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === selectedBudget.id
          ? { ...budget, allocatedAmount, status: "Allocated" }
          : budget,
      ),
    );

    // Update the total allocated amount
    setTotalAllocated((prevTotal) => prevTotal + Number(allocatedAmount));
    closeModals();
  };

  // Handle Release Funds
  const handleReleaseFunds = () => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === selectedBudget.id
          ? { ...budget, status: "Approved" }
          : budget,
      ),
    );

    // Add the allocated amount to the total spent
    setTotalSpent(
      (prevTotal) => prevTotal + Number(selectedBudget.allocatedAmount),
    );
    closeModals();
  };

  return (
    <AnimationWrapper>
      <Dashboard_navbar />
      <div className="p-6">
        <div className="my-10 ml-10 flex h-[71px] w-[336px] gap-[24px]">
          <img
            src={Person}
            alt="User Avatar"
            className="h-[64] w-[64px] bg-[rgba(217,217,217,1)]"
          />
          <div>
            <h1 className="h-[42px] w-[248px] text-[32px] font-[600] leading-[41.6px]">
              Welcome Back
            </h1>
            <p className="h-[21px] w-[248px] text-[16px] font-[400] leading-[20.8px]">
              Here&lsquo;s an overview of requested budgets
            </p>
          </div>
        </div>

        {/* Overview of total budgets, allocated, and spent */}
        <div className="flex flex-wrap items-center justify-center gap-5 p-5">
          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                Total Budget
              </h2>
              <p className="text-[40px] font-[600]">
                $
                {/* Add total budget logic here when you fetch from the client side */}
              </p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>

          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                Total Allocated
              </h2>
              <p className="text-[40px] font-[600]">${totalAllocated}</p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>

          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                Total Spent
              </h2>
              <p className="text-[40px] font-[600]">${totalSpent}</p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>
        </div>
        <h1 className="mb-5 text-center text-3xl font-bold">Admin Dashboard</h1>
        {/* Requested Budgets List */}
        <div className="grid grid-cols-1 gap-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="rounded-lg border p-4 shadow-md">
              <p>
                <strong>Organization:</strong> {budget.organization}
              </p>
              <p>
                <strong>Department:</strong> {budget.department}
              </p>
              <p>
                <strong>Requested Amount:</strong> ${budget.requestedAmount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`text-sm ${budget.status === "Pending" ? "text-red-500" : "text-green-500"}`}
                >
                  {budget.status}
                </span>
              </p>

              {/* Allocate Funds Button */}
              {budget.status === "Pending" && (
                <button
                  onClick={() => openAllocateModal(budget)}
                  className="mt-4 rounded-lg border border-[rgba(255,69,13,1)] bg-transparent px-4 py-2 text-[rgba(255,69,13,1)] hover:bg-[rgba(255,69,13,1)] hover:text-white"
                >
                  Allocate Funds
                </button>
              )}

              {/* Release Funds Button (Only after allocation) */}
              {budget.status === "Allocated" && (
                <button
                  onClick={() => openReleaseModal(budget)}
                  className="mt-4 rounded-lg border border-[rgba(255,69,13,1)] bg-transparent px-4 py-2 text-[rgba(255,69,13,1)] hover:bg-[rgba(255,69,13,1)] hover:text-white"
                >
                  Release Funds
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Allocate Funds Modal */}
        {isAllocateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-center text-xl font-semibold">
                Allocate Funds
              </h3>

              <p className="mb-2 flex justify-between">
                <strong>Organization:</strong>
                <span className="text-[rgba(255,69,13,1)]">{selectedBudget.organization}</span>
              </p>
              <p className="mb-2 flex justify-between">
                <strong>Department:</strong>
                <span className="text-[rgba(255,69,13,1)]">{selectedBudget.department}</span>
              </p>

              <p className="mb-4 font-semibold flex justify-between">
                Requested Amount: 
                <span className="text-[rgba(255,69,13,1)]">${selectedBudget.requestedAmount}</span>
              </p>

              <input
                type="number"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                placeholder="Enter amount to allocate"
                className="mb-4 w-full rounded-md border p-2"
              />

              <div className="flex justify-end">
                <button
                  className="mr-2 h-[45px] w-[151px] rounded-[12px] border border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                  onClick={closeModals}
                >
                  Cancel
                </button>
                <button
                  className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
                  onClick={handleAllocateFunds}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Release Funds Modal */}
        {isReleaseModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-4 text-center text-xl font-semibold">
                Release Funds
              </h3>
          
              <h3 className="mb-4 flex justify-between font-semibold">
                <strong>Organization:</strong>
                <span>{selectedBudget.organization}</span> 
              </h3>
              <h3 className="mb-4 flex justify-between font-semibold">
                <strong>Department:</strong>
                <span>{selectedBudget.department}</span> 
              </h3>
              
              <h3 className="mb-4 flex justify-between font-semibold">
                <strong>Allocated Amount:</strong>
                <span>${selectedBudget.allocatedAmount}</span> 
              </h3>

              <div className="flex justify-end">
                <button
                  className="mr-2 h-[45px] w-[151px] rounded-[12px] border border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                  onClick={closeModals}
                >
                  Cancel
                </button>
                <button
                  className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
                  onClick={handleReleaseFunds}
                >
                  Release
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default AdminDashboard;
