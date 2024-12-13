import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  setShowDepartments,
  clearDepartments,
} from "../features/budget/budgetSlice";
import AllocateFunds from "./modals/AllocateFunds";
import { currencyFormat } from "../utils/budget";

const Departments = ({ departments }) => {
  console.log(departments);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowDepartments());
    dispatch(clearDepartments());
  };

  return (
    <div className="departments_container mb-10 mt-5 w-full">
      <div className="departments_header mb-12 flex items-center gap-4">
        <button className="rounded-md border" onClick={() => handleClose()}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/back--v1.png"
            alt="back--v1"
          />
        </button>
        <h3 className="lg:text-[28px] md:text-[28px] text-[24px] font-[600]">Departments</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8f8f8]">
            <tr>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {departments?.map((department, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {department.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-[14px] text-gray-900">
                  {department.departmentAddress}
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
                    <AllocateFunds
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

export default Departments;

Departments.propTypes = {
  departments: PropTypes.array,
};
