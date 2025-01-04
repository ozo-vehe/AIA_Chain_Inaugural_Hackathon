import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Handle changes to the input field and auto-resize based on content
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    updateChatHistory("user", userInput);

    try {
      const res = await axios.post(
        "https://llama.us.gaianet.network/v1/chat/completions",
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
        },
      );

      const aiResponse =
        res?.data?.choices?.[0]?.message?.content ||
        "Unexpected response format.";
      updateChatHistory("assistant", aiResponse);
    } catch (error) {
      updateChatHistory(
        "assistant",
        "An error occurred while fetching the response.",
      );
      console.error("Error fetching response:", error);
    }

    setUserInput("");
  };

  const updateChatHistory = (role, content) => {
    setChatHistory((prevHistory) => [...prevHistory, { role, content }]);
  };

  const renderMessageWithBold = (message) => {
    const formattedMessage = message.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>",
    );
    return <span dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-5 text-center text-[24px] font-bold">
        AI-Powered Fund Management for the Future
      </h1>

      {/* Chatbox Container */}
      <div className="w-[40rem] rounded-lg bg-white p-[2rem] shadow-lg">
        {/* Chat History */}
        <div className="mb-[1.5rem] h-[200px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-[1rem]">
          {chatHistory.length === 0 ? (
            <p className="italic text-gray-400">
              Your conversation will appear here...
            </p>
          ) : (
            chatHistory.map((msg, index) => (
              <p
                key={index}
                className={
                  msg.role === "user"
                    ? "font-semibold text-gray-800"
                    : "text-gray-600"
                }
              >
                {msg.role === "user" ? "" : "AI: "}
                {renderMessageWithBold(msg.content)}
              </p>
            ))
          )}
        </div>

        {/* Input and Submit Button */}
        <div className="flex flex-col items-center">
          <textarea
            value={userInput}
            placeholder="Type your message..."
            className="mb-[1.5rem] h-[3rem] w-full resize-none overflow-hidden rounded-lg bg-gray-100 p-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="1"
            onInput={handleInputChange}
          />
          <button
            onClick={handleSubmit}
            className="h-[45px] w-[8rem] rounded-[12px] bg-[rgba(255,69,13,1)] p-[12px] text-center text-[16px] font-[700] leading-[20.8px] text-white"
          >
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
  );
};

export default Chatbot;
