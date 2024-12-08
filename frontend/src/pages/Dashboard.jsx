import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";
import AnimationWrapper from "../common/page-Animaton";
import { useEffect, useState } from "react";
import BudgetComponent from "../components/BudgetComponent";
import CreateBudget from "../components/modals/CreateBudget";
import { getUserBudgets } from "../utils/budget";

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  // const [requestedFunds, setRequestedFunds] = useState(0);
  const [spentFunds, setSpentFunds] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  const requestFunds = async () => {};

  useEffect(() => {
    const getBudgetDetails = async () => {
      // getAllBudgets();
      const budgets = await getUserBudgets();
      setBudgets(budgets);
    };
    getBudgetDetails();
  }, []);

  return (
    <>
      <AnimationWrapper>
        <section>
          <header className="dashboard_header">
            <div className="flex flex-wrap items-center justify-between px-12 py-16">
              <div className="flex items-start gap-4">
                <img
                  src={Person}
                  alt="User Avatar"
                  className="h-[64] w-[64px] rounded-full bg-[rgba(217,217,217,1)]"
                />
                <div>
                  <h1 className="w-[248px] text-[32px] font-[600] leading-[41.6px]">
                    Welcome Back
                  </h1>
                  <p className="w-fit text-[16px] font-[400]">
                    Here&lsquo;s an overview of your budgets
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <button className="h-[45px] w-[179px] gap-[8px] rounded-[12px] bg-[#ff450d] text-white">
                  Fund Organization
                </button>
                <CreateBudget />
              </div>
            </div>
          </header>

          {/* Budget Overview */}
          <div className="budget_overview flex flex-wrap items-center justify-center gap-5 p-5">
            <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
              <div className="">
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Budget
                </h2>
                <p className="text-[36px] font-[600]">{totalBudget}tRBTC</p>
              </div>
              <div className="h-20 w-20">
                <img className="full" src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Allocated
                </h2>
                <p className="text-[36px] font-[600]">{allocatedBudget}tRBTC</p>
              </div>
              <div className="h-20 w-20">
                <img className="w-full" src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
              <div>
                <h2 className="text-[18px] font-[400] text-[rgba(152,162,179,1)]">
                  Total Spent
                </h2>
                <p className="text-[36px] font-[600]">{spentFunds}tRBTC</p>
              </div>
              <div className="h-20 w-20">
                <img className="w-full" src={Money} alt="Money Box" />
              </div>
            </div>
          </div>

          {/* Budgets Container */}
          <div className="budget_container mx-auto max-w-[1440px] p-12">
            <h3 className="mb-12 w-full text-[20px] font-[600]">Budgets</h3>

            <div className="budgets flex flex-wrap items-center justify-center gap-8">
              {budgets.length > 0 ? (
                <>
                  {budgets.map((budget, _i) => (
                    <BudgetComponent key={_i} budget={budget} />
                  ))}
                </>
              ) : (
                <>Loading...</>
              )}
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
