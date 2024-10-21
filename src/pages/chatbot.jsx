import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-Animaton";

const Chat_box = () => {
  return (
    <>
      <AnimationWrapper>
        <section className="flex h-screen flex-col items-center justify-center">
          <h1 className="mb-5 text-center text-[24px] font-bold">
            AI-Powered Fund Management for the Future
          </h1>

          {/* Chatbox Container */}
          <div className="w-[40rem] rounded-lg bg-white p-[2rem] shadow-lg">
            {/* Response Area */}
            <div className="mb-[1.5rem] h-[200px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-[1rem]">
              {/* Placeholder response */}
              <p className="text-gray-600">Response will appear here...</p>
            </div>

            {/* Input and Button */}
            <div className="flex flex-col items-center">
              <textarea
                placeholder="Type your message..."
                className="mb-[1.5rem] h-[3rem] w-full resize-none overflow-hidden rounded-lg bg-gray-100 p-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
                onInput={(e) => {
                  e.target.style.height = "auto"; // Reset height
                  e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                }}
              />

              <button className="h-[45px] w-[8rem] rounded-[12px] bg-[rgba(255,69,13,1)] p-[12px] text-center text-[16px] font-[700] leading-[20.8px] text-white">
                Ask AI
              </button>
            </div>
          </div>
          <Link to="/">
            <button className="mt-[2rem] rounded-lg bg-gray-300 p-[10px] font-bold">
              BACK TO HOME
            </button>
          </Link>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Chat_box;
