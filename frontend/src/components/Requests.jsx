import { useSelector } from "react-redux";
import {
  getAllSavedBudgets,
} from "../features/budget/budgetSlice";
import { currencyFormat } from "../utils/budget";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getAllFundRequests } from "../features/fundRequests/fundRequestsSlice";

const Requests = () => {
  const [requestsBudgets, setRequestsBudgets] = useState([]);
  const [budgetRequests, setBudgetRequests] = useState([]);

  const budgets = useSelector((state) => getAllSavedBudgets(state));
  const requests = useSelector((state) => getAllFundRequests(state));

  const {address} = useAccount();

  useEffect(() => {
    const getRequestDetails = async() => {
      let budgetsArray = [];
      let requestsArray = [];
      requests.forEach((request) => {
        budgets.forEach((budget) => {
          if(budget.owner === address && budget.address === request.budget) {
            budgetsArray.push(budget);
            requestsArray.push(request);
          }
        })
      })

      console.log(budgetsArray);
      setRequestsBudgets(budgetsArray);
      setBudgetRequests(requestsArray);
    }

    getRequestDetails();
  }, [])

  return (
    <div className="departments_container mb-10 mt-5 w-full">
      <div className={`overflow-x-auto ${budgetRequests.length > 0 ? "border": "text-center"} rounded-[15px] p-4`}>
        {budgetRequests.length > 0 ? (
        <table className="min-w-full overflow-hidden rounded-[12px]">
          <thead className="border">
            <tr className="h-16 bg-gray-200" style={{ borderRadius: "12px" }}>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                S/No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Department Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Budget Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Amount Requested For (Naira)
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Reason for Request
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[14px] font-[600] text-gray-700"
              >
                Approved Status
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50 border">
            {budgetRequests?.map((request, _i) => (
              <tr key={_i} className="hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {_i + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {request.department.slice(0, 4)}...{request.department.slice(-4)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {requestsBudgets[_i]?.orgName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {currencyFormat.format(request.amount)}
                </td>
                <td className="whitespace-nowrap truncate px-6 py-4 text-[14px] text-gray-900">
                  {request.reason}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px]">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      request.isAllocated
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.isAllocated ? "Approved" : "Not Approved"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {!request.isAllocated && (
                    <button className="text-sm bg-green-500 text-gray-50 px-3 flex items-center justify-center rounded-full py-[2px]">Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ): ("No requests found")}
      </div>
    </div>
  );
};

export default Requests;
