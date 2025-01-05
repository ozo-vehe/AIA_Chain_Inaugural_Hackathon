import { useState, useEffect } from "react";
import { rootstockTestnet } from "viem/chains";
import { NavLink } from "react-router-dom";
import { HiHome, HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { SiWalletconnect } from "react-icons/si";
import { VscRemoteExplorer } from "react-icons/vsc";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import {
  getShowMobileSidebar,
  setShowMobileSidebar,
} from "../features/budgetManager/budgetManagerSlice";

const Sidebar = () => {
  const [showExploreMenu, setShowExploreMenu] = useState(false);

  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();

  const showMobileSideBar = useSelector((state) => getShowMobileSidebar(state));

  const menuItems = [
    { name: "Home", icon: <HiHome />, link: "/" },
    { name: "Dashboard", icon: <MdDashboard />, link: "/dashboard" },
    // { name: "Analytics", icon: <MdAnalytics />, link: "/analytics" },
    // { name: "Settings", icon: <MdSettings />, link: "/settings" },
    // { name: "Explore", icon: <VscRemoteExplorer />, link: "/explore" },
  ];

  const exploreItems = [
    { name: "About", link: "/about" },
    { name: "Loans/Grants", link: "/loans-and-grants" },
    { name: "Know More", link: "/know-more" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.innerWidth < 768) {
        dispatch(setShowMobileSidebar(false));
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        dispatch(setShowMobileSidebar(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <div
        className={`absolute z-10 h-screen bg-gray-50 text-gray-700 transition-all duration-300 md:relative md:left-0 lg:relative lg:left-0 ${showMobileSideBar ? "left-0" : "-left-64"}`}
      >
        <div
          className={`${
            showMobileSideBar ? "w-64" : "w-16"
          } h-full bg-gray-50 p-4 transition-all duration-300`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                // setIsOpen(!showMobileSideBar);
                dispatch(setShowMobileSidebar(!showMobileSideBar));
                setShowExploreMenu(false);
              }}
              className="text-2xl text-gray-700"
            >
              {showMobileSideBar ? <HiOutlineX /> : <HiMenuAlt3 />}
            </button>
          </div>

          <div className="mt-2">
            <div className="menuLink">
              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? `my-2 flex items-center rounded-md bg-[#ff450d] p-2 text-gray-50 transition-all ${showMobileSideBar ? "" : "px-[5px]"}`
                      : `my-2 flex items-center rounded-md p-2 text-gray-700 transition-all hover:bg-[#ff450d] hover:text-white ${!address && item.name === "Dashboard" ? "hidden" : "block"} ${showMobileSideBar ? "" : "px-[5px]"}`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  {showMobileSideBar && (
                    <span className="ml-4 text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              ))}

              {/* Explore Nav Items */}
              <div className="explore flex flex-col">
                <button
                  className={`my-2 flex items-center rounded-md p-2 px-[5px] text-gray-700 transition-all hover:bg-[#ff450d] hover:text-white`}
                  onClick={() => {
                    setShowExploreMenu(!showExploreMenu);
                    dispatch(setShowMobileSidebar(true));
                  }}
                >
                  <span className="text-xl">
                    <VscRemoteExplorer />
                  </span>
                  {showMobileSideBar && (
                    <span className="ml-4 text-sm font-medium">Explore</span>
                  )}
                </button>

                <div
                  className={`explore-items w-[80%] self-end ${showExploreMenu ? "h-[170px]" : "h-0"} overflow-hidden transition-all duration-300`}
                >
                  {exploreItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? `mb-2 flex items-center rounded-md bg-[#ff450d] p-2 text-gray-50 transition-all`
                          : `mb-2 flex items-center rounded-md p-2 text-gray-700 transition-all hover:bg-[#ff450d] hover:text-white ${showMobileSideBar ? "" : "px-[5px]"}`
                      }
                    >
                      {showMobileSideBar && (
                        <span className="ml-4 text-sm font-medium">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Connect Wallet Button */}
              {!address && (
                <div className="relative my-2 flex items-center overflow-hidden rounded-md p-2 text-gray-700 transition-colors hover:bg-[#ff450d] hover:text-white">
                  <span className="text-xl">
                    <SiWalletconnect />
                  </span>
                  {showMobileSideBar && (
                    <div className="ml-4 w-full overflow-hidden text-sm font-medium capitalize">
                      <button className="capitalize">connect wallet</button>
                    </div>
                  )}
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <ConnectButton />
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            {address && (
              <div className="logout">
                <button
                  className={`my-2 flex w-full items-center rounded-md p-2 text-gray-700 transition-colors hover:bg-[#ff450d] hover:text-white ${showMobileSideBar ? "" : "px-[5px]"}`}
                  onClick={() => disconnect()}
                >
                  <span className="text-xl">
                    <BiLogOut />
                  </span>
                  {showMobileSideBar && (
                    <span className="ml-4 text-sm font-medium">Logout</span>
                  )}
                </button>
              </div>
            )}

            {/* Wallet Details for Mobile Users */}
            {address && (
              chain?.name === rootstockTestnet.name ? (
                <div className="block md:hidden lg:hidden">
                  <ConnectButton chainStatus="none" />
                </div>
              ) : (
                <div className="block md:hidden lg:hidden">
                  <ConnectButton />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
