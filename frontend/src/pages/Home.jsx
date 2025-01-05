import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import homepage from "../assets/homepage.png";
import { PiCubeTransparentFill } from "react-icons/pi";
import cards from "../assets/cards.png";
import request from "../assets/requests.png";

const Home = () => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center lg:px-10 md:px-5 px-4">
      <header className="my-8 w-full text-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
          Transform Investment and Budget Management with Blockchain
        </h1>
        <p className="mx-auto mt-2 max-w-[700px] font-[300]">
          A secure, decentralized platform for efficient fund allocation,
          tracking, and investment management, empowering organizations to
          manage resources effortlessly.
        </p>

        <div className="header_btn my-8 flex flex-wrap items-center justify-center gap-4">
          {!address && (
            <div className="relative rounded-[12px] bg-[#ff450d] px-3 py-2 text-center text-[16px] font-[400] text-white">
              <button
                aria-label="connect wallet"
                className="text-sm font-[500] text-white md:text-[16px] lg:text-[16px]"
              >
                Connect Wallet
              </button>
              <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0">
                <ConnectButton />
              </span>
            </div>
          )}
          <button
            aria-label="learn more about fineace"
            className="relative rounded-[12px] border border-[#ff450d] bg-[#fff] px-3 py-2 text-center text-[16px] font-[400] text-[#ff450d]"
          >
            Learn more about Fineace
          </button>
        </div>

        <div className="homepage_image border border-gray-200 rounded-[16px] shadow-sm overflow-hidden max-w-full max-h-[600px] mx-auto my-10">
          <img className="w-full h-full object-cover" src={homepage} alt="Dashboard website image" />
        </div>
      </header>
      
      {/* How Fineace Works */}
      <section className="how_fineace_works text-center my-8 w-full">
        <p className="text-sm font-[400]">How <span className="text-[#ff450d]">FINEACE</span> Works</p>
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-[500] mt-2">Seamless, Transparent, and Efficient Budget Management</h2>
        <p className="font-[300] mt-2 max-w-[700px] mx-auto">Fineace uses blockchain for a decentralized, immutable ledger that track fund allocation and spending, ensuring visibility and accountability</p>

        <div className="flex flex-wrap items-center justify-center gap-8 my-8 max-w-[1080px] mx-auto">
          <div className="flex flex-col items-center justify-center border-gray-200 rounded-[16px] p-5 h-[400px] w-[45%] overflow-hidden bg-gray-100">
            <img className="w-[90%] h-[90%] object-cover" src={cards} alt="Card display image" />
          </div>
          <div className="flex flex-col items-center justify-center border-gray-200 rounded-[16px] p-5 h-[400px] w-[45%] overflow-hidden bg-gray-100">
            <img className="w-[90%] h-[90%] object-cover" src={request} alt="Request display image" />
          </div>
        </div>
      </section>

      {/* Why Blockchain Matters */}
      <section className="why_blockchain_matters text-center my-8">
        <p className="text-sm font-[400]">Why <span className="text-[#ff450d]">Blockchain</span> Matters</p>
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-[500] mt-2">The Benefits of Using Blockchain</h2>

        <div className="benefits max-w-[1080px] mx-auto flex flex-wrap items-center justify-center gap-8 my-8">
          <div className="benefit w-[300px] h-[200px] p-5 rounded-[16px] border border-gray-200">
            <PiCubeTransparentFill className="text-xl w-10 h-10 rounded-full bg-[#ff450d] text-white p-2 mb-2" />

            <div className="benefit_details text-left">
              <h3 className="text-[18px] font-[500]">Real-Time Transparency</h3>
              <p className="font-[300]">Stakeholders and the public can track budget allocations and spending instantly.</p>
            </div>
          </div>

          <div className="benefit w-[300px] h-[200px] p-5 rounded-[16px] border border-gray-200">
            <PiCubeTransparentFill className="text-xl w-10 h-10 rounded-full bg-[#ff450d] text-white p-2 mb-2" />

            <div className="benefit_details text-left">
              <h3 className="text-[18px] font-[500]">Immutable Records</h3>
              <p className="font-[300]">No one can alter your financial history—every action is permanently logged.</p>
            </div>
          </div>

          <div className="benefit w-[300px] h-[200px] p-5 rounded-[16px] border border-gray-200">
            <PiCubeTransparentFill className="text-xl w-10 h-10 rounded-full bg-[#ff450d] text-white p-2 mb-2" />

            <div className="benefit_details text-left">
              <h3 className="text-[18px] font-[500]">Trustworthy Governance</h3>
              <p className="font-[300]">Blockchain offers a system where fund management eliminates fraud, tampering, or human errors.</p>
            </div>
          </div>

          <div className="benefit w-[300px] h-[200px] p-5 rounded-[16px] border border-gray-200">
            <PiCubeTransparentFill className="text-xl w-10 h-10 rounded-full bg-[#ff450d] text-white p-2 mb-2" />

            <div className="benefit_details text-left">
              <h3 className="text-[18px] font-[500]">Decentralized Security</h3>
              <p className="font-[300]">Blockchain provides military-grade encryption and decentralized security, eliminating single points of failure.</p>
            </div>
          </div>

          <div className="benefit w-[300px] h-[200px] p-5 rounded-[16px] border border-gray-200">
            <PiCubeTransparentFill className="text-xl w-10 h-10 rounded-full bg-[#ff450d] text-white p-2 mb-2" />

            <div className="benefit_details text-left">
              <h3 className="text-[18px] font-[500]">Cost-Efficient Management</h3>
              <p className="font-[300]">Smart contracts automate processes, reducing the need for intermediaries or lengthy manual audits.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
