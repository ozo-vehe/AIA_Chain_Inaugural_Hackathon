import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiHome, HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { SiWalletconnect } from "react-icons/si";
import { VscRemoteExplorer } from "react-icons/vsc";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { address } = useAccount();
  const { disconnect } = useDisconnect()

  const menuItems = [
    { name: "Home", icon: <HiHome />, link: "/" },
    { name: "Dashboard", icon: <MdDashboard />, link: "/dashboard" },
    // { name: "Analytics", icon: <MdAnalytics />, link: "/analytics" },
    // { name: "Settings", icon: <MdSettings />, link: "/settings" },
    { name: "Explore", icon: <VscRemoteExplorer />, link: "/explore" },
  ];

  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-700">
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-50 p-4 transition-all duration-300`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
          >
            {isOpen ? <HiOutlineX /> : <HiMenuAlt3 />}
          </button>
        </div>

        <div className="mt-2">
          <div className="menuLink">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? `my-2 flex items-center rounded-md bg-[#ff450d] p-2 text-gray-50 transition-all ${isOpen ? "" : "px-[5px]"}`
                    : `my-2 flex items-center rounded-md p-2 text-gray-700 transition-all hover:bg-[#ff450d] hover:text-white ${!address && item.name === "Dashboard" ? "hidden" : "block"} ${isOpen ? "" : "px-[5px]"}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="ml-4 text-sm font-medium">{item.name}</span>
                )}
              </NavLink>
            ))}
            {!address && (
              <div className="relative my-2 flex items-center overflow-hidden rounded-md p-2 text-gray-700 transition-colors hover:bg-[#ff450d] hover:text-white">
                <span className="text-xl">
                  <SiWalletconnect />
                </span>
                {isOpen && (
                  <div className="ml-4 w-full overflow-hidden text-sm font-medium capitalize">
                    <button className="capitalize">connect wallet</button>
                  </div>
                )}
                <div className="opacity-0 absolute left-0 top-0 h-full w-full">
                  <ConnectButton />
                </div>
              </div>
            )}
          </div>

          {address && (
            <div className="logout">
              <button className={`my-2 flex w-full items-center rounded-md p-2 text-gray-700 transition-colors hover:bg-[#ff450d] hover:text-white ${isOpen ? "" : "px-[5px]"}`} onClick={() => disconnect()}>
                <span className="text-xl">
                  <BiLogOut />
                </span>
                {isOpen && (
                  <span className="ml-4 text-sm font-medium">Logout</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
