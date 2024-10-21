import Logo from "../assets/Logo(7).png";
import Home from "../assets/Vector(1).png";
import Person from "../assets/Ellipse1.png";
import { Link } from "react-router-dom";
const Dashboard_navbar = () => {
  return (
    <>
      <nav className="flex justify-between border-b p-[2rem]">
        <Link to='/'>
          <img
            src={Logo}
            alt="Brand Logo"
            className="top-[4px] h-[47px] w-[109px]"
          />
        </Link>

        <div className="flex gap-7">
          <div className="flex h-[53px] w-[136px] gap-2 rounded-[12px] bg-[rgba(245,239,235,1)] p-[16px]">
            <img src={Home} alt="Image" className="mt-1 h-[16px] w-[16px]" />
            <h1 className="text-[rgba(255,69,13,1) text-[16px] font-[500]">
              Dashboard
            </h1>
          </div>

          <h1 className="h-[53px] w-[140px] rounded-[10px] p-[16px]">
            Departments
          </h1>

          <h1 className="h-[53px] w-[140px] rounded-[10px] p-[16px]">
            Fund Requests
          </h1>
        </div>

        <div className="flex h-[40px] w-[159px] gap-3 rounded-[4px] bg-gray-200 p-[8px]">
          <img src={Person} alt="user Avatar" />
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-[700] leading-[20.8px]">
            wallet address here
          </h1>
        </div>
      </nav>
    </>
  );
};

export default Dashboard_navbar;
