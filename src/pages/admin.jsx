import { useState, useEffect } from "react";
import AnimationWrapper from "../common/page-Animaton";
import Dashboard_navbar from "../components/dashboard_navbar";
import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";
import nobudget from "../assets/Blue.png";

// import { useState, useEffect } from 'react';
// import { getSubmittedBudgets, approveBudget, rejectBudget } from '../blockchain';  --- -----------------------Uncomment  all this
// Import smart contract methods

const AdminDashboard = () => {
  const [budgets, setBudgets] = useState([]);

  // Fetch submitted budgets from the smart contract
  useEffect(() => {
    const fetchBudgets = async () => {
      const fetchedBudgets = await getSubmittedBudgets(); // Fetch from the blockchain
      setBudgets(fetchedBudgets);
    };
    fetchBudgets();
  }, []);

  // Admin approves a budget
  const handleApprove = async (index) => {
    await approveBudget(index); // Call smart contract to approve
    setBudgets((prev) =>
      prev.map((budget, i) =>
        i === index ? { ...budget, status: "approved" } : budget,
      ),
    );
  };

  // Admin rejects a budget
  const handleReject = async (index) => {
    await rejectBudget(index);
    //  Call smart contract to reject
    setBudgets((prev) =>
      prev.map((budget, i) =>
        i === index ? { ...budget, status: "rejected" } : budget,
      ),
    );
  };

  return (
    <AnimationWrapper>
      <section>
        <Dashboard_navbar />

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
              Here&lsquo;s an overview of your budgets
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 p-5">
          <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
            <div>
              <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                Total Budget
              </h2>
              <p className="text-[40px] font-[600]">${}</p>
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
              <p className="text-[40px] font-[600]">${}</p>
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
              <p className="text-[40px] font-[600]">${}</p>
            </div>
            <div>
              <img src={Money} alt="Money Box" />
            </div>
          </div>
        </div>

        <div className="budget-list mt-5 flex flex-col items-center justify-center border-black text-center">
          {budgets.length === 0 ? (
            <div className="flex flex-col items-center justify-center mb-10">
              <img
                src={nobudget}
                alt="No Budget"
                className="mb-3 h-[198.6px] w-[206.02px]"
              />
              <p className="font-serif text-2xl">No budgets submitted yet</p>
            </div>
          ) : (
            budgets.map((budget, index) => (
              <div key={index} className="budget-item">
                <h3 className="mb-5 border-b border-black">
                  {budget.organizationName}
                </h3>
                <p className="mb-5 border-b border-black">
                  Department: {budget.department}
                </p>
                <p className="mb-5 border-b border-black">
                  Total Budget: {budget.totalBudget}
                </p>
                <p className="mb-5 border-b border-black">
                  Status: {budget.status}
                </p>

                {budget.status === "pending" && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleApprove(index)}
                      className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(index)}
                      className="mr-2 h-[45px] w-[151px] rounded-[12px] border border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AdminDashboard;
