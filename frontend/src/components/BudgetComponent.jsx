import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import budget_icon from "../assets/budget_icon.png";
import { formatEther } from "ethers";

const BudgetComponent = ({ budget }) => {
  const { totalBudget, createdAt } = budget;

  const readableDate = () => {
    const timestampInSeconds = Number(createdAt);

    // Create a Date object
    const readableDate = new Date(timestampInSeconds * 1000);

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(readableDate);

    return formattedDate;
  };
  // console.log(ethers.formatEther(Number(budget.totalBudget)))
  console.log(Number(totalBudget));
  return (
    <div className="budget w-full rounded-[16px] bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg md:w-[400px] lg:w-[400px]">
      <div className="budget_header flex items-center justify-between">
        <div className="budget_title">
          <h3 className="capitalize">{budget.orgName}</h3>
          <p className="text-[40px] font-[600]">
            N{formatEther(budget.totalBudget)}
          </p>
        </div>
        <img src={budget_icon} alt="Budget Icon" />
      </div>

      <div className="budget_body py-3">
        <div className="money_spent flex items-center justify-between border-b border-gray-200 py-1">
          <p>Total Spent</p>
          <p>{budget.budgetMonitor}</p>
        </div>
        <div className="no_of_departments flex items-center justify-between py-2">
          <p>No of Departments</p>
          <p>{budget.departmentCount.toString()}</p>
        </div>
      </div>

      <div className="budget_footer flex items-center justify-between py-1">
        <p className="text-[14px] font-[500]">Created {readableDate()}</p>
        <Link
          className="flex items-center gap-3 rounded-[8px] border border-[#FF450D] p-3 text-[14px] font-[500] text-[#FF450D]"
          to="/"
        >
          View details
          <img
            className="w-5"
            src="https://img.icons8.com/material-rounded/FF450D/24/right.png"
            alt="right"
          />
        </Link>
      </div>
    </div>
  );
};

export default BudgetComponent;

BudgetComponent.propTypes = {
  budget: PropTypes.object,
};
