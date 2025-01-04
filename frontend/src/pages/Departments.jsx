import Person from "../assets/Ellipse2.png";
import AnimationWrapper from "../common/page-Animaton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import noBudgetCreatedImage from "../assets/Blue.png";
import BudgetComponent from "../components/BudgetComponent";
import {
  getAllDepartments
} from "../features/department/departmentSlice";
import { useAccount } from "wagmi";

const Departments = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();

  const budgets = useSelector((state) => getAllDepartments(state));

  useEffect(() => {
    // dispatch(fetchDepartmentOrganizations(address));
  }, [dispatch, address]);

  return (
    <>
      <AnimationWrapper>
        <section>
          <header className="dashboard_header">
            <div className="flex flex-wrap items-center justify-between gap-4 px-12 py-16">
              <div className="flex items-start gap-4">
                <img
                  src={Person}
                  alt="User Avatar"
                  className="h-[64] w-[64px] rounded-full bg-[rgba(217,217,217,1)]"
                />
                <div className="">
                  <h1 className="w-fit text-[24px] font-[600] md:text-[32px] lg:text-[32px]">
                    Hello,
                  </h1>
                  <p className="w-full text-[16px] font-[400]">
                    Below is a list of organization you belong to
                  </p>
                </div>
              </div>
            </div>
          </header>

          {budgets && budgets.length > 0 ? (
            // {/* Organizations you belong to */}
            <div className="budget_container mb-10 mt-5 flex flex-wrap items-center gap-x-8 px-4 md:px-8 lg:px-16">
              {budgets.map((budget, _i) => (
                <BudgetComponent key={_i} budget={budget} button={"request"} />
              ))}
            </div>
          ) : (
            // {/* You do no belong to any organization */}
            <div className="budget_container mb-10 mt-5 px-4 md:px-8 lg:px-16">
              <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
                <div className="image">
                  <img
                    className="mx-auto mb-2"
                    src={noBudgetCreatedImage}
                    alt="No budget created"
                  />
                  <p>Your account is not part of an organization</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Departments;
