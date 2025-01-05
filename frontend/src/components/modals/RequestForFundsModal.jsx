import { useEffect, useState } from "react";
import Loader from "../Loader";
import PropTypes from "prop-types";
import { requestFund } from "../../utils/requestFund";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { currencyFormat } from "../../utils/budget";
import { getAllFundRequests } from "../../features/fundRequests/fundRequestsSlice";
import { getAllDepartments } from "../../features/department/departmentSlice";

const RequestForFundsModal = ({ budget }) => {
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
  });

  const { address } = useAccount();
  const fundRequests = useSelector((state) => getAllFundRequests(state));
  const isFundRequested = fundRequests.find(
    (request) => request.department === address,
  );
  const departments = useSelector((state) => getAllDepartments(state));

  // const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFundRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.reason === "" || formData.amount === "") {
      alert("Cannot leave input field empty!");
      return;
    }
    try {
      // console.log(budgetAddress)
      await requestFund(formData, budget.address);
      setLoading(false);
      setShowModal(false);
      setFormData({
        amount: "",
        reason: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowModal(false);
      setFormData({
        amount: "",
        reason: "",
      });
    }
    console.log(formData);
  };

  useEffect(() => {
    const savedDepartment = departments.find(
      (department) => department.departmentAddress === address,
    );
    if (savedDepartment) {
      setDepartment(savedDepartment);
    }
  }, [address]);

  return (
    <div>
      <button
        className="gap-[8px] rounded-[8px] bg-[#ff450d] px-2 py-2 text-sm font-[500] text-white disabled:opacity-50"
        onClick={() => setShowModal(true)}
        disabled={isFundRequested}
      >
        Request for funds
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80">
          {/*  Create Budget Form  */}
          <form
            className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
            onSubmit={(e) => handleFundRequest(e)}
          >
            <div className="form_header flex items-start justify-between">
              <div className="header_text">
                <h3 className="mb-1 text-[28px] font-[600]">Fund Request</h3>
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

            <div className="form_content mt-4 flex flex-col items-center justify-center gap-6">
              <div className="amount flex w-full flex-col">
                <label htmlFor="amount" className="font-[500]">
                  Amount (in tBTC)
                </label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  className="mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800 outline-none"
                  placeholder="500, 000"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              <div className="reason flex w-full flex-col">
                <label htmlFor="reason" className="font-[500]">
                  Reason
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  className="mt-1 h-[155px] w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800 outline-none"
                  value={formData.reason}
                  onChange={(e) => handleInputChange(e)}
                ></textarea>
              </div>
            </div>

            <div className="form_btn w-full">
              <button
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#ff450d] py-3 text-center text-white font-[500]"
                type="submit"
              >
                {loading ? <Loader /> : "Request"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestForFundsModal;

RequestForFundsModal.propTypes = {
  budget: PropTypes.object.isRequired,
};
