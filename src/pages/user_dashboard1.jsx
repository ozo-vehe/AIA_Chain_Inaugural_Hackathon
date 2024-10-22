import Dashboard_navbar from "../components/dashboard_navbar";
import Person from "../assets/Ellipse2.png";
import { useState } from "react";
import Money from "../assets/Container(7).png";
import nobudget from "../assets/Blue.png";
import AnimationWrapper from "../common/page-Animaton";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // For create budget modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // For confirm budget modal

  // States to store form inputs
  const [organizationName, setOrganizationName] = useState("");
  const [department, setDepartment] = useState("");
  const [totalBudgets, setTotalBudgets] = useState("");
  const [submittedBudgets, setSubmittedBudgets] = useState([]);

  const handleNext = () => {
    if (!organizationName || !department || !totalBudgets) {
      alert("Please fill in all the required fields.");
      return;
    }

    setIsConfirmOpen(true);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const newBudget = {
      totalBudget: parseFloat(totalBudgets),
      totalAllocated: parseFloat(totalBudgets),
      totalSpent: 0,
      organizationName,
      department,
      date: new Date(),
      status: "pending", // Add default status to 'pending'
    };

    setSubmittedBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    setIsConfirmOpen(false);
    setOrganizationName("");
    setDepartment("");
    setTotalBudgets("");
  };

  const totalBudget = submittedBudgets.reduce(
    (acc, budget) => acc + budget.totalBudget,
    0,
  );
  const totalAllocated = submittedBudgets.reduce(
    (acc, budget) => acc + budget.totalAllocated,
    0,
  );
  const totalSpent = submittedBudgets.reduce(
    (acc, budget) => acc + budget.totalSpent,
    0,
  );

  return (
    <>
      <AnimationWrapper>
        <section>
          <Dashboard_navbar />
          <div className="flex justify-between p-[5rem]">
            <div className="flex h-[71px] w-[336px] gap-[24px]">
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

            <div className="flex gap-5">
              <button className="h-[45px] w-[179px] gap-[8px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white">
                Fund Organization
              </button>
              <button
                className="h-[45px] w-[151px] gap-[8px] rounded-[12px] border-[1px] border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                onClick={() => setIsOpen(true)}
              >
                Request Budget
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 p-5">
            <div className="flex h-[144px] w-[436px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] p-8 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Budget
                </h2>
                <p className="text-[40px] font-[600]">${totalBudget}</p>
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

          <div className="mb-10">
            <p className="mb-[3rem] flex items-center justify-center text-[36px] font-[900] text-gray-700">
              Budgets
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {submittedBudgets.length === 0 ? (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nobudget}
                      alt="No Budget"
                      className="mb-3 h-[198.6px] w-[206.02px]"
                    />
                    <p className="mb-2">You haven’t created a budget yet.</p>
                    <button
                      className="h-[45px] w-[151px] rounded-[12px] border-[1px] bg-[rgba(255,69,13,1)] text-[rgba(255,255,255,255)]"
                      onClick={() => setIsOpen(true)}
                    >
                      Request Budget
                    </button>
                  </div>
                </>
              ) : (
                submittedBudgets.map((budget, index) => (
                  <div
                    key={index}
                    className="mb-2 flex h-[350px] w-[436px] flex-col rounded-[24px] bg-gray-50 px-[24px] py-[32px] border-2 border-black"
                  >
                    <div>
                      <h3 className="text-3xl font-bold capitalize items-center text-center mb-5">
                        {budget.organizationName}
                      </h3>
                      <div>
                        <p className="text-3xl text-black font-semibold mb-5">
                          ${budget.totalAllocated}
                        </p>
                      </div>
                    </div>

                    <div className="border p-5">
                      <p className="capitalize border-b-2 mb-3 border-black">Department(s): {budget.department}</p>
                      <p className="capitalize border-b-2 mb-3 border-black">Requested Budget: ${budget.totalAllocated}</p>
                      <p className="border-black border-b-2 mb-3">Created Date: {new Date(budget.date).toLocaleDateString()}</p>
                       {/* Display budget status */}
                      <p className="capitalize border-b-2 mb-3 border-black">Status: {budget.status}</p>{" "}
                     
                     
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Create Budget Modal */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-[436px] rounded-[24px] bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-[600] text-[rgba(29,41,57,1)]">
                  Request Budget
                </h2>
                <p className="text-[14px] font-[400]">
                  Note: Once you have created your budget, you can’t update it.
                </p>
                <div className="mb-4 mt-2">
                  <label className="mb-2 block text-[16px] font-[400] text-gray-800">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Enter organization name"
                    className="w-full rounded-[12px] bg-gray-100 p-3"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-2 block text-[16px] font-[400] text-gray-800">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Computer science, Medicine"
                    className="w-full rounded-[12px] bg-gray-100 p-3"
                  />
                  <p className="text-[14px] font-[400] text-[rgba(255,69,13,1)]">
                    Add comma to enter multiple departments
                  </p>
                </div>

                <div className="mb-4">
                  <label className="mb-2 text-[16px] font-[400] text-gray-800">
                    Total Budgets
                  </label>
                  <input
                    type="number"
                    value={totalBudgets}
                    onChange={(e) => setTotalBudgets(e.target.value)}
                    placeholder="Enter Budget Amount"
                    className="w-full rounded-[12px] bg-gray-100 p-3"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="mr-2 h-[45px] w-[151px] rounded-[12px] border border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="h-[45px] w-[151px] rounded-[12px] bg-[rgba(255,69,13,1)] text-white"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Budget Modal */}
          {isConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative h-[424px] w-[436px] rounded-[24px] bg-white p-[32px] shadow-lg">
                <h2 className="h-[34px] w-[348px] text-[24px] font-[600] text-[rgba(29,41,57,1)]">
                  Confirm Budget
                </h2>

                {/* Display entered details */}
                <div className="mb-4 mt-2 border-b">
                  <p className="text-[rgba(71,84,103,10] text-[18px] font-[400]">
                    {organizationName}
                  </p>
                </div>

                <div className="mb-4 flex justify-between">
                  <p className="text-[40px] font-[600]">${totalBudgets}</p>
                  <img src={Money} alt="Money Box" className="" />
                </div>

                <div className="mb-6 flex justify-between border-b text-[16px] font-[600]">
                  <p>Requested Budget</p>
                  <p>${totalBudgets}</p>
                </div>

                <div className="mb-6 flex justify-between border-b">
                  <p className="text-[16px] font-[600]">Department:</p>
                  <p>{department}</p>
                </div>

                {/* Confirm and Back buttons */}
                <div className="flex justify-between gap-5">
                  <button
                    className="h-[45px] w-[180px] rounded-[12px] border-[1px] border-[rgba(255,69,13,1)] bg-transparent px-[24px] py-[12px]"
                    onClick={() => {
                      setIsConfirmOpen(false);
                      setIsOpen(true);
                    }}
                  >
                    Back
                  </button>

                  <button
                    className="h-[45px] w-[180px] rounded-[12px] bg-[rgba(255,69,13,1)] px-[24px] py-[12px] text-white"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
