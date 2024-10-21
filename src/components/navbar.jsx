import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/Logo(7).png"


const Navbar = () => {
  return (
    <>
      <div className="mt-5 flex justify-center">
        <nav className="flex h-[69px] w-[873px] justify-center gap-[40px] rounded-[20px] bg-gray-100 p-[12px] shadow-lg">
          <Link to='/'>
                <img src={Logo} alt="Barnd Logo" className='w-[109px] h-[47px]'/>
          </Link>

          <div className="mt-2 flex gap-[15px]">
            <h4>How FINEACE works</h4>
            <h4>Why Blockchain matters</h4>
            <h4>Benefits</h4>
          </div>

          <Link to='/user_dashboard1'>
            <button className="w-[158px] h-[45px] rounded-[12px] p-[12px] bg-[rgba(255,69,13,1)] text-center font-[400] text-[16px] leading-[20.8px] text-white">Connect wallet</button>
          </Link>

          {/* Remove the connect admin once done with validation */}
          <Link to='/admin'>
            <button className="w-[158px] h-[45px] rounded-[12px] p-[12px] bg-[rgba(255,69,13,1)] text-center font-[400] text-[16px] leading-[20.8px] text-white">Connect Admin</button>
          </Link>
        </nav>
      </div>
      <Outlet/>
    </>
  );
};

export default Navbar;
