import Person from "../assets/Ellipse2.png";
import Money from "../assets/Container(7).png";
import BudgetComponent from "../components/BudgetComponent";
import CreateBudgetModal from "../components/modals/CreateBudgetModal";
import {
  fetchTotalAmountAllocated,
  fetchTotalBudgetAmount,
  getAllSavedBudgets,
  getTotalBudgetAmount,
  getTotalAmountAllocated,
  getTotalAmountSpent,
  fetchTotalAmountSpent,
} from "../features/budget/budgetSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchAllDepartments,
  getAllDepartments,
} from "../features/department/departmentSlice";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  fetchAllFundRequests,
  getAllFundRequests,
} from "../features/fundRequests/fundRequestsSlice";
import { currencyFormat } from "../utils/budget";
import Requests from "../components/Requests";
import BudgetDepartments from "../components/BudgetDepartments";

const Dashboard = () => {
  // const [spentFunds, setSpentFunds] = useState(0);
  const [filter, setFilter] = useState("created_budgets");
  const [loading, setLoading] = useState(false);
  const [organizationsForUser, setOrganizationsForUser] = useState([]);
  const [createdBudgets, setCreatedBudgets] = useState([]);
  const [showDepartments, setShowDepartments] = useState(false);

  const { address } = useAccount();
  const dispatch = useDispatch();

  const budgets = useSelector((state) => getAllSavedBudgets(state));
  const departments = useSelector((state) => getAllDepartments(state));
  const fundRequests = useSelector((state) => getAllFundRequests(state));
  const totalBudget = useSelector((state) => getTotalBudgetAmount(state));
  const spentFunds = useSelector((state) => getTotalAmountSpent(state));
  const totalAmountAllocated = useSelector((state) =>
    getTotalAmountAllocated(state),
  );

  const calculateTotalAmountSpent = () => {
    let budgetDepartments = [];
    createdBudgets.forEach((budget) => {
      const department = departments.filter(
        (department) => department.budgetAddress === budget.address,
      );
      budgetDepartments.push(...department);
    })

    dispatch(fetchTotalAmountSpent(budgetDepartments));
  }

  const handleFilterChanges = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    calculateTotalAmountSpent()

    if (departments?.length > 0) {
      dispatch(fetchAllFundRequests(departments));
      const department = departments.find(
        (department) => department.departmentAddress === address,
      );

      if (department) {
        const budget = budgets.filter(
          (budget) => budget.address === department.budgetAddress,
        );

        setOrganizationsForUser(budget);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchContractDetails = async () => {
      dispatch(fetchAllDepartments(budgets));
      dispatch(fetchTotalBudgetAmount(address));
      dispatch(fetchTotalAmountAllocated(address));

      const createdBudgets = budgets.filter(
        (budget) => budget.owner === address,
      );
      setCreatedBudgets(createdBudgets);
      setLoading(false);
      calculateTotalAmountSpent();
    };

    fetchContractDetails();
  }, [address]);

  return (
    <>
      <section className="dashboard">
        {/* Budget Header */}
        <header className="dashboard_header">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-1 md:px-5 lg:px-10">
            <div className="flex items-start gap-4">
              <img
                src={Person}
                alt="User Avatar"
                className="h-[64] w-[64px] rounded-full bg-[rgba(217,217,217,1)]"
              />
              <div className="">
                <h1 className="w-fit text-[24px] font-[600] leading-[41.6px] md:text-[32px] lg:text-[32px]">
                  Welcome {address.slice(0, 6)}...{address.slice(-6)}
                </h1>
                <p className="w-full text-[16px] font-[400]">
                  Here&lsquo;s an overview of your budgets
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <CreateBudgetModal />
            </div>
          </div>
        </header>

        {/* Budget Overview */}
        <div className="budget_overview mt-5 flex flex-wrap items-center justify-start gap-5 p-5 px-4 md:px-5 lg:px-10">
          <div className="flex w-[350px] justify-between rounded-[24px] bg-[rgba(12,17,29,1)] px-8 py-6 text-white">
            <div className="">
              <h2 className="font-[400] text-[rgba(152,162,179,1)]">
                Total Budget
              </h2>
              <p className="text-[36px] font-[600]">
                <span className="text-[16px]">N</span>
                {currencyFormat.format(totalBudget)}
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
                {currencyFormat.format(totalAmountAllocated)}
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
                {currencyFormat.format(spentFunds)}
              </p>
            </div>
            <div className="h-16 w-16">
              <img className="w-full" src={Money} alt="Money Box" />
            </div>
          </div>
        </div>

        {/* Filter for what to show the user */}
        <div className="select_filter px-4 md:px-5 lg:px-10">
          <div className="filter_container w-fit rounded-md bg-gray-100 pr-2">
            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => handleFilterChanges(e)}
              className="rounded-md bg-gray-100 px-2 py-1 outline-none"
            >
              <option value="created_budgets">Created budgets</option>
              <option value="organizations">Organizations you belong to</option>
              <option value="fund_requests">Fund Requests</option>
            </select>
          </div>
        </div>

        <div className="budget_container mb-10 mt-5 px-4 md:px-5 lg:px-10">
          {loading ? (
            <Loader spinnerColor={"border-[#ff450d] mt-8 mx-auto"} />
          ) : (
            <div>
              {filter === "created_budgets" && (
                <div className="flex flex-wrap items-center justify-start gap-5">
                  {createdBudgets.length > 0 ? (
                    <>
                      {createdBudgets.map((budget, _i) => (
                        <div key={_i} className="w-full">
                          {showDepartments ? (
                            <BudgetDepartments
                              key={_i}
                              budgetAddress={budget.address}
                              details={(prop) => setShowDepartments(prop.show)}
                            />
                          ) : (
                            <BudgetComponent key={_i} budget={budget} details={(prop) => setShowDepartments(prop.show)} />
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="mx-auto mt-8">
                      {/* <img src={Empty} alt="Empty" /> */}
                      <p className="text-center text-[16px] font-[400]">
                        You have not created any budgets yet
                      </p>
                    </div>
                  )}
                </div>
              )}
              {filter === "organizations" && (
                <div className="flex flex-wrap items-center justify-start gap-5">
                  {organizationsForUser.length > 0 ? (
                    organizationsForUser.map((org, _i) => (
                      <BudgetComponent
                        key={_i}
                        budget={org}
                        button={"request"}
                      />
                      // <OrganizationCard key={org.id} organization={org} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-5">
                      {/* <img src={Empty} alt="Empty" /> */}
                      <p className="mx-auto mt-8">
                        You have not joined any organizations yet
                      </p>
                    </div>
                  )}
                </div>
              )}
              {filter === "fund_requests" && (
                <div className="flex flex-wrap items-center justify-center gap-5">
                  {fundRequests.length > 0 ? (
                    <Requests />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-5">
                      {/* <img src={Empty} alt="Empty" /> */}
                      <p className="mx-auto mt-8">
                        You have not made any fund requests yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
