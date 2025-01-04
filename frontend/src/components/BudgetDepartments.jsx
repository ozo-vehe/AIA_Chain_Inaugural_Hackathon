import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";
// import {
//   setShowDepartments,
//   clearDepartments,
// } from "../features/budget/budgetSlice";
import AllocateFundsModal from "./modals/AllocateFundsModal";
import { currencyFormat } from "../utils/budget";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDepartments, getAllDepartments } from "../features/department/departmentSlice";
import { useEffect, useState } from "react";
import { fetchAllBudgets, fetchTotalAmountAllocated, getAllSavedBudgets, getTotalAmountAllocated } from "../features/budget/budgetSlice";
import { useAccount } from "wagmi";

const BudgetDepartments = ({ budgetAddress, details }) => {
  const [budgetDepartments, setUserDepartments] = useState([]);
  const departments = useSelector((state) => getAllDepartments(state));
  const budgets = useSelector((state) => getAllSavedBudgets(state));
  const totalAmountAllocated = useSelector((state) => getTotalAmountAllocated(state));
  
  const dispatch = useDispatch();
  const {address} = useAccount()

  useEffect(() => {
    const budgetDepartments = departments.filter(
      (department) => department.budgetAddress === budgetAddress
    );
    dispatch(fetchAllDepartments(budgets))
    dispatch(fetchAllBudgets())
    dispatch(fetchTotalAmountAllocated(address))
    setUserDepartments(budgetDepartments);
    console.log(totalAmountAllocated)
  }, [])
  return (
    <div className="departments_container mb-2 w-full">
      <div className="departments_header mb-4 flex items-center gap-1">
        <button className="rounded-md" onClick={() => details({ show: false })}>
          <img
            width="24"
            height="24"
            className="mt-[1px]"
            src="https://img.icons8.com/material-rounded/24/back--v1.png"
            alt="back--v1"
          />
        </button>
        <h3 className="lg:text-[20px] md:text-[20px] text-[18px] font-[600] leading-tight">Budget Departments</h3>
      </div>

      <div className="overflow-x-auto border rounded-[15px] p-4">
        <table className="min-w-full overflow-hidden rounded-[12px]">
          <thead className="border">
            <tr className="h-16 bg-gray-200" style={{ borderRadius: "12px" }}>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Wallet Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Budget (N)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Spent (N)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Budget Status
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50 border">
            {budgetDepartments?.map((department, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {department.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {department.departmentAddress.slice(0, 4)}...{department.departmentAddress.slice(-4)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {currencyFormat.format(department.allocation)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {currencyFormat.format(department.spent)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px]">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      department.isAllocated
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {department.isAllocated ? "Allocated" : "Not Allocated"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {!department.isAllocated && (
                    <AllocateFundsModal
                      department={department}
                      departmentCount={departments.length}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetDepartments;

BudgetDepartments.propTypes = {
  budgetAddress: PropTypes.string,
  details: PropTypes.func,
};
