import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDepartments, getAllDepartments } from "../features/department/departmentSlice";
import { fetchAllFundRequests, getAllFundRequests } from "../features/fundRequests/fundRequestsSlice";
import { getAllSavedBudgets } from "../features/budget/budgetSlice";


const FundRequests = () => {
  const dispatch = useDispatch();

  const budgets = useSelector((state) => getAllSavedBudgets(state));
  const departments = useSelector((state) => getAllDepartments(state));
  const fundRequests = useSelector((state) => getAllFundRequests(state));

  console.log(fundRequests);

  useEffect(() => {
    if (departments.length > 0) {
      console.log("Departments");
      dispatch(fetchAllFundRequests(departments));
    } else {
      console.log("No departments");
      dispatch(fetchAllDepartments(budgets))
      dispatch(fetchAllFundRequests(departments));
    }
  }, []);

  return (
    <div>
      {fundRequests.length > 0 &&
        fundRequests.map((request, _i) => (
          <div key={_i}>
            <h3>{request.department}</h3>
            <p>{request.amount}</p>
            <p>{request.description}</p>
          </div>
        ))}
      <h1>Fund Request</h1>
    </div>
  );
}

export default FundRequests;
