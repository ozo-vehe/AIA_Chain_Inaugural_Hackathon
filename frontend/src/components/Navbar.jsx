import { Link } from "react-router-dom";
import { rootstockTestnet } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useAccountEffect } from "wagmi";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { address, chain } = useAccount();
  const navigate = useNavigate();

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
      <nav className="flex items-center justify-between px-4 py-3 md:px-5 lg:px-10 w-full top-0 left-0 bg-gray-50">
        <Link to="/">
          <span className="text-[#ff450d] block text-4xl font-[500]">Fineace</span>
          <span className="text-sm font-[300] text-gray-500">Investment Group</span>
        </Link>

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
              <button className="relative rounded-[12px] bg-[#ff450d] px-3 py-2 text-center text-[16px] font-[400] text-white">
                <span className="text-white font-[500] lg:text-[16px] md:text-[16px] text-sm">Connect Wallet</span>
                <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0">
                  <ConnectButton />
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
