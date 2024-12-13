import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { rootstockTestnet } from "viem/chains";
import Logo from "../assets/Logo(7).png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useAccountEffect } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    path: "/dashboard",
    name: "dashboard",
    icon: "https://img.icons8.com/external-kmg-design-glyph-kmg-design/ff450d/50/external-dashboard-user-interface-kmg-design-glyph-kmg-design.png",
  },
  {
    path: "/departments",
    name: "departments",
    icon: "https://img.icons8.com/material-rounded/ff450d/24/organization-chart-people.png",
  },
  {
    path: "/fund-requests",
    name: "fund requests",
    icon: "https://img.icons8.com/ios-filled/ff450d/50/receive-cash.png",
  },
];

const Navbar = () => {
  const { address, chain } = useAccount();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

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
      <nav className="hidden items-center justify-between border-b px-5 py-7 md:px-5 lg:flex lg:px-10">
        <Link to="/">
          <img
            src={Logo}
            alt="Brand Logo"
            className="top-[4px] h-[47px] w-[109px]"
          />
        </Link>

        {/* Desktop Navbar */}
        {address ? (
          <div className="flex gap-3">
            <ul className="flex items-center justify-center gap-1">
              {NAV_LINKS.map((link, _i) => (
                <li key={_i}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex w-[150px] items-center justify-center gap-2 rounded-[10px] bg-[#f5efeb] py-3 text-center text-[16px] font-[500] capitalize text-[#ff450d]"
                        : "flex w-[150px] items-center justify-center gap-2 rounded-[10px] py-3 text-center text-[16px] font-[500] capitalize text-gray-700"
                    }
                  >
                    {link.name}
                    {location.pathname == `${link.path}` && (
                      <img
                        className="h-4 w-4 object-contain"
                        src={link.icon}
                        alt={link.name}
                      />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="relative flex w-[150px] items-center justify-center gap-2 py-3 text-center text-[16px] font-[500] capitalize text-[#ff450d]">
              Explore
              <img
                className="h-4 w-4 cursor-pointer"
                src="https://img.icons8.com/ios-glyphs/ff450d/30/circled-chevron-down.png"
                alt="circled-chevron-down"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {/* Menu dropdown */}
              <ul
                className={`dropdown-menu absolute right-0 top-[52px] flex w-[200px] flex-wrap items-center gap-2 overflow-hidden rounded-[8px] bg-gray-100 text-sm text-gray-500 transition-all duration-300 ${showDropdown ? "h-[145px] p-3" : "h-[0px]"}`}
              >
                <li className="w-full cursor-pointer border-b border-gray-300 py-2 text-left hover:border-[#ff450d] hover:text-[#ff450d]">
                  How Fineace works
                </li>
                <li className="w-full cursor-pointer border-b border-gray-300 py-2 text-left hover:border-[#ff450d] hover:text-[#ff450d]">
                  Importance of blockchain
                </li>
                <li className="w-full cursor-pointer py-2 text-left hover:text-[#ff450d]">
                  Benefits
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="mt-2 flex gap-6 text-[16px] text-gray-600">
            <li className="cursor-pointer hover:text-orange-600">
              How FINEACE works
            </li>
            <li className="cursor-pointer hover:text-orange-600">
              Why Blockchain matters
            </li>
            <li className="cursor-pointer hover:text-orange-600">Benefits</li>
          </ul>
        )}

        <div>
          <div className="">
            {address ? (
              <>
                {chain?.name === rootstockTestnet.name ? (
                  <ConnectButton chainStatus="none" />
                ) : (
                  <ConnectButton />
                )}
              </>
            ) : (
              // <CustomButton />
              <button className="relative rounded-[12px] bg-[#ff450d] px-6 py-3 text-center text-[16px] font-[400] text-white">
                <span className="text-white">Connect Wallet</span>
                <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0">
                  <ConnectButton />
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="relative flex items-center justify-between border-b bg-white px-5 py-7 md:px-5 lg:hidden lg:px-10">
        <Link to="/">
          <img
            src={Logo}
            alt="Brand Logo"
            className="top-[4px] h-[47px] w-[109px]"
          />
        </Link>

        <div className="mobile_menu">
          <img
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-10"
            src="https://img.icons8.com/ios-filled/50/menu--v6.png"
            alt="menu--v6"
          />

          <div
            className={`dropdown absolute left-0 z-10 flex w-full flex-col items-center justify-center gap-3 bg-white p-10 shadow transition-all duration-300 ${mobileMenu ? "top-0" : "-top-[500px]"}`}
          >
            {address ? (
              <>
                <img
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="w-8 rounded-full border border-gray-500 p-1"
                  src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                  alt="delete-sign"
                />
                <div className="flex flex-col gap-3">
                  <ul className="flex flex-col items-center justify-center gap-3">
                    {NAV_LINKS.map((link, _i) => (
                      <li key={_i}>
                        <NavLink
                          to={link.path}
                          onClick={() => setMobileMenu(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "flex w-[150px] items-center justify-center gap-2 rounded-[10px] bg-[#f5efeb] py-3 text-center text-[16px] font-[500] capitalize text-[#ff450d]"
                              : "flex w-[150px] items-center justify-center gap-2 rounded-[10px] py-3 text-center text-[16px] font-[500] capitalize text-gray-700"
                          }
                        >
                          {link.name}
                          {location.pathname == `${link.path}` && (
                            <img
                              className="h-4 w-4 object-contain"
                              src={link.icon}
                              alt={link.name}
                            />
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  <div className="relative flex w-[150px] flex-col items-center justify-center gap-2 py-3 text-center text-[16px] font-[500] capitalize text-[#ff450d]">
                    <button className="text flex items-center gap-2" onClick={() => setShowDropdown(!showDropdown)}>
                      Explore
                      <img
                        className="h-4 w-4 cursor-pointer"
                        src="https://img.icons8.com/ios-glyphs/ff450d/30/circled-chevron-down.png"
                        alt="circled-chevron-down"
                        onClick={() => setShowDropdown(!showDropdown)}
                      />
                    </button>
                    {/* Menu dropdown */}
                    <ul
                      className={`dropdown-menu flex w-[200px] flex-wrap items-center gap-2 overflow-hidden rounded-[8px] bg-gray-100 text-sm text-gray-500 transition-all duration-300 ${showDropdown ? "h-[145px] p-3" : "h-[0px]"}`}
                    >
                      <li className="w-full cursor-pointer border-b border-gray-300 py-2 text-left hover:border-[#ff450d] hover:text-[#ff450d]">
                        How Fineace works
                      </li>
                      <li className="w-full cursor-pointer border-b border-gray-300 py-2 text-left hover:border-[#ff450d] hover:text-[#ff450d]">
                        Importance of blockchain
                      </li>
                      <li className="w-full cursor-pointer py-2 text-left hover:text-[#ff450d]">
                        Benefits
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <ul className="flex flex-col items-center justify-center gap-6 py-2 text-[16px] text-gray-600">
                <img
                  onClick={() => setMobileMenu(!mobileMenu)}
                  className="w-8 rounded-full border border-gray-500 p-1"
                  src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                  alt="delete-sign"
                />
                <li className="cursor-pointer hover:text-orange-600">
                  How FINEACE works
                </li>
                <li className="cursor-pointer hover:text-orange-600">
                  Why Blockchain matters
                </li>
                <li className="cursor-pointer hover:text-orange-600">
                  Benefits
                </li>
              </ul>
            )}

            <div className="mb-2">
              {address ? (
                <>
                  {chain?.name === rootstockTestnet.name ? (
                    <ConnectButton chainStatus="none" />
                  ) : (
                    <ConnectButton />
                  )}
                </>
              ) : (
                // <CustomButton />
                <button className="relative rounded-[12px] bg-[#ff450d] px-6 py-3 text-center text-[16px] font-[400] text-white">
                  <span className="text-white">Connect Wallet</span>
                  <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0">
                    <ConnectButton />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
