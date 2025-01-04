import { useState } from "react";
import budget_icon from "../../assets/budget_icon.png";
import { createBudget } from "../../utils/budget";
import Loader from "../Loader";

const CreateBudgetModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmatoryForm, setConfirmatoryForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState("");
  const [formData, setFormData] = useState({
    budget_title: "",
    org_name: "",
    departments: [],
    total_budget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    if (
      formData.departments.length < 1 ||
      formData.budget_title === "" ||
      formData.org_name === "" ||
      formData.total_budget === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const txHash = await createBudget(formData);
      alert(`https://rootstock-testnet.blockscout.com/tx/${txHash}`)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const trimDepartments = (departments) => {
    if(departments === '') return;
    const departmentsArr = departments.split(",");
    const trimmedDepartments = departmentsArr.map((department) =>
      department.trim()
    );
    formData.departments = trimmedDepartments;
  }
  return (
    <div>
      <button
        className="h-[45px] w-[151px] gap-[8px] rounded-[12px] border-[1px] border-[rgba(255,69,13,1)] bg-transparent text-[rgba(255,69,13,1)]"
        onClick={() => setShowModal(true)}
      >
        Create Budget
      </button>

      {showModal && (
        <div className="modal fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300/80">
          {/* Create Budget Form */}

          {confirmatoryForm ? (
            /* Confirmatory Form */
            <form
              className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]"
              onSubmit={handleCreateBudget}
            >
              <div className="form_header flex items-start justify-between">
                <h3 className="mb-1 text-[28px] font-[600]">Confirm Budget</h3>
                <img
                  className="mt-2 w-4 cursor-pointer"
                  onClick={() => setShowModal(false)}
                  src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                  alt="delete-sign"
                />
              </div>

              <div className="form_content my-8 w-full rounded-[16px] border border-gray-200 bg-white p-5">
                <div className="budget_header flex items-center justify-between">
                  <div className="budget_title">
                    <h3 className="text-[24px] font-[600] capitalize">
                      {formData.org_name}
                    </h3>
                    <p className="text-[14px]">{formData.budget_title}</p>
                    <p className="text-[40px] font-[600]">
                      N{formData.total_budget}
                    </p>
                  </div>
                  <img src={budget_icon} alt="Budget Icon" />
                </div>

                <div className="budget_body py-3">
                  <div className="no_of_departments flex items-center justify-between py-2">
                    <p>No of Departments</p>
                    <p>{formData.departments.length}</p>
                  </div>
                </div>
              </div>

              <div className="form_btn flex w-full items-center justify-center gap-5">
                <p
                  className="mt-4 w-full cursor-pointer rounded-[12px] border border-[#ff450d] h-[50px] flex items-center justify-center text-[#ff450d]"
                  onClick={() => setConfirmatoryForm(false)}
                >
                  Back
                </p>
                <button
                  className="mt-4 w-full rounded-[12px] bg-[#ff450d] h-[50px] text-center text-white flex items-center justify-center gap-3"
                  type="submit"
                >
                  {loading ? <Loader /> : "Submit"}
                </button>
              </div>
            </form>
          ) : (
            /* Create Budget Form */
            <form className="w-full rounded-[32px] border bg-white p-8 md:w-[450px] lg:w-[450px]">
              <div className="form_header flex items-start justify-between">
                <div className="header_text">
                  <h3 className="mb-1 text-[28px] font-[600]">Create Budget</h3>
                  <p className="w-[300px] text-sm text-gray-600">
                    Note once you have created your budget, you can not update
                    it
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
                <div className="org_name w-full">
                  <label htmlFor="org_name" className="font-[500]">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="org_name"
                    id="org_name"
                    value={formData.org_name}
                    className="oultine-none mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800"
                    placeholder="FiTech"
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>

                <div className="budget_title w-full">
                  <label htmlFor="budget_title" className="font-[500]">
                    Budget Title
                  </label>
                  <input
                    type="text"
                    name="budget_title"
                    id="budget_title"
                    value={formData.budget_title}
                    className="oultine-none mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800"
                    placeholder="National budget"
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>

                <div className="total_budget w-full">
                  <label htmlFor="total_budget" className="font-[500]">
                    Total Budget (N)
                  </label>
                  <input
                    type="text"
                    name="total_budget"
                    id="total_budget"
                    value={formData.total_budget}
                    className="oultine-none mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800"
                    placeholder="500,000"
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>

                <div className="department w-full">
                  <label htmlFor="departments" className="font-[500]">
                    Departments wallet address
                  </label>
                  <input
                    type="text"
                    name="departments"
                    id="departments"
                    value={departments}
                    className="oultine-none mt-1 w-full rounded-[12px] border-none bg-gray-100 px-3 py-3 text-gray-800"
                    placeholder="Web, ML"
                    onChange={(e) => setDepartments(e.target.value)}
                    required
                  />
                  <p className="notification mt-1 text-[12px] text-[#ff450d]">
                    Add a comma to add multiple departments
                  </p>
                </div>
              </div>

              <div className="form_btn w-full">
                <p
                  className="mt-4 w-full cursor-pointer rounded-[12px] bg-[#ff450d] py-3 text-center text-white"
                  onClick={() => {
                    setConfirmatoryForm(true);
                    trimDepartments(departments)
                    console.log(formData.departments)
                  }}
                >
                  Next
                </p>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateBudgetModal;
