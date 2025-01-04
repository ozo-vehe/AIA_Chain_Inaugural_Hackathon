import { useState } from "react";
import { allocateFund, currencyFormat } from "../../utils/budget";
import Loader from "../Loader";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBudgets, getAllSavedBudgets } from "../../features/budget/budgetSlice";
import { fetchAllDepartments, getAllDepartments } from "../../features/department/departmentSlice";
import { fetchAllFundRequests } from "../../features/fundRequests/fundRequestsSlice";

const AllocateFundsModal = ({ department }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fundAllocation, setFundAllocation] = useState("");

  const dispatch = useDispatch();
  const budgets = useSelector((state) => getAllSavedBudgets(state));
  const departments = useSelector((state) => getAllDepartments(state));

  const handleAllocateFund = async (e) => {
    e.preventDefault();
    if (fundAllocation === "" || department === "") {
      alert("Cannot leave input field empty!");
      return;
    }

    try {
      setLoading(true);
      const txHash = await allocateFund(department, fundAllocation);
      dispatch(fetchAllDepartments(budgets));
      dispatch(fetchAllFundRequests(departments))
      dispatch(fetchAllBudgets());

      alert(`https://rootstock-testnet.blockscout.com/tx/${txHash}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  return (
    <div>
      <button
        className="rounded-full border bg-blue-600 px-2 py-1 text-[12px] text-gray-50 transition-all duration-300 hover:scale-105"
        onClick={() => setShowModal(true)}
      >
        Allocate funds
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80">
          {/*  Create Budget Form  */}
          <form
            className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
            onSubmit={(e) => handleAllocateFund(e)}
          >
            <div className="form_header flex items-start justify-between">
              <div className="header_text">
                <h3 className="mb-1 text-[28px] font-[600]">Allocate Funds</h3>
                <p className="text-[16px] font-[400]">
                  Budget amount left: N{currencyFormat.format(department.budgetMonitor) || 0}
                </p>
              </div>
              <img
                className="mt-2 w-4 cursor-pointer"
                onClick={() => setShowModal(false)}
                src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                alt="delete-sign"
              />
            </div>

            <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
              <div className="amount flex w-full flex-col">
                <label htmlFor="amount" className="font-[500]">
                  Amount (in tBTC)
                </label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={fundAllocation}
                  className="mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800 outline-none"
                  placeholder="500, 000"
                  onChange={(e) => setFundAllocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form_btn w-full">
              <button
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#ff450d] py-3 text-center text-white"
                type="submit"
              >
                {loading ? <Loader /> : "Allocate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllocateFundsModal;

AllocateFundsModal.propTypes = {
  department: PropTypes.object.isRequired,
  departmentCount: PropTypes.number.isRequired,
};
