import { Link } from "react-router-dom";
import { rootstockTestnet } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useAccountEffect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowMobileSidebar,
  getShowMobileSidebar,
} from "../features/budgetManager/budgetManagerSlice";

const Navbar = () => {
  const { address, chain } = useAccount();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showMobileSideBar = useSelector((state) => getShowMobileSidebar(state));

  useAccountEffect({
    onConnect() {
      navigate("/");
    },
    onDisconnect() {
      navigate("/");
    },
  });

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="left-0 top-0 flex w-full items-center justify-between bg-gray-50 px-4 py-3 md:px-5 lg:px-10">
        <Link to="/">
          <span className="block text-4xl font-[500] text-[#ff450d]">
            Fineace
          </span>
          <span className="text-sm font-[300] text-gray-500">
            Investment Group
          </span>
        </Link>

        <div>
          <div className="">
            {address ? (
              <>
                <RxHamburgerMenu
                  className="block text-3xl md:hidden lg:hidden"
                  onClick={() =>
                    dispatch(setShowMobileSidebar(!showMobileSideBar))
                  }
                />
                {chain?.name === rootstockTestnet.name ? (
                  <div className="hidden md:block lg:block">
                    <ConnectButton chainStatus="none" />
                  </div>
                ) : (
                  <div className="hidden md:block lg:block">
                    <ConnectButton />
                  </div>
                )}
              </>
            ) : (
              <>
                <RxHamburgerMenu
                  className="block text-3xl md:hidden lg:hidden"
                  onClick={() =>
                    dispatch(setShowMobileSidebar(!showMobileSideBar))
                  }
                />
                {/* // <CustomButton /> */}
                <div className="relative hidden rounded-[12px] bg-[#ff450d] px-3 py-2 text-center text-[16px] font-[400] text-white md:block lg:block">
                  <button className="text-sm font-[500] text-white md:text-[16px] lg:text-[16px]">
                    Connect Wallet
                  </button>
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0">
                    <ConnectButton />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
