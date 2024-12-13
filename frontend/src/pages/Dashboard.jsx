import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";
import AnimationWrapper from "../common/page-Animaton";
// import { useEffect, useState } from "react";
import BudgetComponent from "../components/BudgetComponent";
import CreateBudget from "../components/modals/CreateBudget";
import Departments from "../components/Departments";
import {
  getAllBudgets,
  getAllDepartments,
  getAllTotalBudgetAmount,
  getTotalBudgetAllocated,
  getShowDepartment,
  getBudgetStatus,
} from "../features/budget/budgetSlice";
import { currencyFormat } from "../utils/budget";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Dashboard = () => {
  // const [spentFunds, setSpentFunds] = useState(0);

  const budgets = useSelector((state) => getAllBudgets(state));
  const departments = useSelector((state) => getAllDepartments(state));
  const showDepartments = useSelector((state) => getShowDepartment(state));
  const totalBudget = currencyFormat.format(
    useSelector((state) => getAllTotalBudgetAmount(state)),
  );
  const allocatedBudget = currencyFormat.format(
    useSelector((state) => getTotalBudgetAllocated(state)),
  );
  const budgetStatus = useSelector((state) => getBudgetStatus(state));

  return (
    <>
      <AnimationWrapper>
        <section>
          <header className="dashboard_header">
            <div className="flex flex-wrap items-center justify-between gap-4 px-12 py-16">
              <div className="flex items-start gap-4">
                <img
                  src={Person}
                  alt="User Avatar"
                  className="h-[64] w-[64px] rounded-full bg-[rgba(217,217,217,1)]"
                />
                <div className="">
                  <h1 className="w-fit text-[24px] font-[600] leading-[41.6px] md:text-[32px] lg:text-[32px]">
                    Welcome Back
                  </h1>
                  <p className="w-full text-[16px] font-[400]">
                    Here&lsquo;s an overview of your budgets
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5">
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
                <h2 className="font-[400] text-[rgba(152,162,179,1)]">
                  Total Budget
                </h2>
                <p className="text-[36px] font-[600]">
                  <span className="text-[16px]">N</span>
                  {totalBudget}{" "}
                </p>
              </div>
              <div className="h-16 w-16">
                <img className="full" src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
              <div>
                <h2 className="font-[400] text-[rgba(152,162,179,1)]">
                  Total Allocated
                </h2>
                <p className="text-[36px] font-[600]">
                  <span className="text-[16px]">N</span>
                  {allocatedBudget} <span className="text-[14px]"></span>
                </p>
              </div>
              <div className="h-16 w-16">
                <img className="w-full" src={Money} alt="Money Box" />
              </div>
            </div>

            <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
              <div>
                <h2 className="font-[400] text-[rgba(152,162,179,1)]">
                  Total Spent
                </h2>
                <p className="text-[36px] font-[600]">
                  <span className="text-[16px]">N</span>
                  {"0"}
                </p>
              </div>
              <div className="h-16 w-16">
                <img className="w-full" src={Money} alt="Money Box" />
              </div>
            </div>
          </div>

          {/* Budgets Container */}
          <div className="budget_container mb-10 mt-5 px-4 md:px-8 lg:px-16">
            {showDepartments ? (
              <div className="mx-auto flex min-h-40 w-full items-center justify-center">
                {/* Budget Details */}
                {departments && departments.length > 0 ? (
                  <Departments departments={departments} />
                ) : (
                  <Loader spinnerColor={"border-gray-500"} />
                )}
              </div>
            ) : (
              <div className="mb-10 mt-5">
                <h3 className="mb-12 w-full text-[24px] font-[600] md:text-[28px] lg:text-[28px]">
                  Budgets
                </h3>
                <div className="budgets flex flex-wrap items-center gap-8">
                  {budgets &&
                  budgets.length > 0 &&
                  budgetStatus === "success" ? (
                    <>
                      {budgets.map((budget, _i) => (
                        <BudgetComponent key={_i} budget={budget} />
                      ))}
                    </>
                  ) : (
                    <>
                      {budgetStatus !== "success" ? (
                        <p className="text-[18px] capitalize">{budgetStatus}</p>
                      ) : (
                        <Loader spinnerColor={"border-gray-500"} />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Dashboard;
