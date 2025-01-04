import PropTypes from "prop-types";
import budget_icon from "../assets/budget_icon.png";
// import { getDepartments } from "../utils/budget";
// import {
//   fetchBudgetDepartments,
//   setShowDepartments,
// } from "../features/budget/budgetSlice";
// import { useDispatch } from "react-redux";
import { currencyFormat } from "../utils/budget";
import RequestForFundsModal from "./modals/RequestForFundsModal";

const BudgetComponent = ({ budget, button, details }) => {
  // const dispatch = useDispatch();

  // const handleShowDepartments = () => {
  //   dispatch(
  //     fetchBudgetDepartments({
  //       budgetAddress: budget.address,
  //       departmentCount: budget.departmentCount,
  //     }),
  //     dispatch(setShowDepartments()),
  //   );
  // };

  return (
    <div className="budget w-full rounded-[16px] bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg md:w-[400px] lg:w-[400px]">
      <div className="budget_header flex items-center justify-between">
        <div className="budget_title">
          <h3 className="capitalize">{budget.orgName}</h3>
          <p className="text-[40px] font-[600]">
            N{currencyFormat.format(budget.totalBudget)}
          </p>
        </div>
        <img src={budget_icon} alt="Budget Icon" />
      </div>

      <div className="budget_body py-3">
        <div className="money_spent flex items-center justify-between border-b border-gray-200 py-1">
          <p>Total Spent</p>
          <p>N{currencyFormat.format(budget.budgetMonitor)}</p>
        </div>
        <div className="no_of_departments flex items-center justify-between py-2">
          <p>No of Departments</p>
          <p>{budget.departmentCount}</p>
        </div>
      </div>

      <div className="budget_footer flex items-center justify-between py-1 font-[300]">
        <p className="text-[14px]">Created {budget.createdAt}</p>

        {button == "request" && (
          <RequestForFundsModal budget={budget} />
        )}
        {button !== "request" && (
          <button
            className="flex items-center justify-center gap-2 rounded-[8px] border border-[#FF450D] p-2 text-[14px] font-[500] text-[#FF450D]"
            onClick={() => details({show: true})}
          >
            View details
            <img
              className="w-5"
              src="https://img.icons8.com/material-rounded/FF450D/24/right.png"
              alt="right"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default BudgetComponent;

BudgetComponent.propTypes = {
  budget: PropTypes.object,
  button: PropTypes.string,
  details: PropTypes.func,
};
