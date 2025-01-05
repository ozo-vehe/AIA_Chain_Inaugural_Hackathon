import { useEffect, useState } from "react";
import Loader from "../Loader";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useAccount } from "wagmi";
import { approveFundRequest, currencyFormat } from "../../utils/budget";
import { getAllDepartments } from "../../features/department/departmentSlice";
import { fetchAllBudgets } from "../../features/budget/budgetSlice";
import { fetchAllFundRequests } from "../../features/fundRequests/fundRequestsSlice";

const ApproveModalRequest = ({ request }) => {
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const departments = useSelector((state) => getAllDepartments(state));

  const dispatch = useDispatch();

  const handleApproveFundRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await approveFundRequest({...request, departmentId: department.id});
      dispatch(fetchAllBudgets());
      dispatch(fetchAllFundRequests(departments));
      alert("Request Approved");
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    const savedDepartment = departments.find((department) => department.departmentAddress === request.department);
    setDepartment(savedDepartment);

  }, [address]);

  return (
    <div>
      <button
        className="gap-[8px] rounded-full bg-green-600 px-3 py-[2px] flex items-center justify-center text-sm font-[500] text-white disabled:opacity-50"
        onClick={() => setShowModal(true)}
        disabled={request.approved}
      >
        Approve
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80 lg:px-10 md:px-5 px-4">
          {/*  Create Budget Form  */}
          <div
            className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
          >
            <div className="modal_header flex items-start justify-between">
              <div className="header_text">
                <h3 className="mb-1 text-[28px] font-[600]">Approve Fund Request</h3>
                <p>
                  Allocated fund:{" "}
                  {currencyFormat.format(department?.allocation)}
                </p>
              </div>
              <img
                className="mt-2 w-4 cursor-pointer"
                onClick={() => setShowModal(false)}
                src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                alt="delete-sign"
              />
            </div>

            <div className="modal_content mt-4 font-[300] w-full">
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><span className="font-[500]">Budget Address:</span> {request.budget.slice(0, 4)}...{request.budget.slice(-4)}</li>
                <li><span className="font-[500]">Amount Requested For:</span> N{currencyFormat.format(request.amount)}</li>
                <li className="whitespace-break-spaces"><span className="font-[500]">Reason for the Request: </span>{request.reason}</li>
              </ul>
            </div>

            <div className="modal_btn w-full mt-10">
              <button
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#ff450d] py-3 text-center text-white font-[500]"
                type="submit"
                onClick={(e) => handleApproveFundRequest(e)}
              >
                {loading ? <Loader /> : "Approve Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveModalRequest;

ApproveModalRequest.propTypes = {
  request: PropTypes.object.isRequired,
};
