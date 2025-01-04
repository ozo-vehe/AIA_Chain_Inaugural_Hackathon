import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Page import
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Departments from "./pages/Departments.jsx";
import FundRequests from "./pages/FundRequests.jsx";
import About from "./pages/About.jsx";
import KnowMore from "./pages/KnowMore.jsx";
import KnowMoreDetails from "./pages/KnowMoreDetails.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import LoansAndGrants from "./pages/LoansAndGrants.jsx";
// import NotFound from "./pages/NotFound.jsx";

import { store } from "./features/store.js";
import { Provider } from "react-redux";

// RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "./config/wagmi.js";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/fund-requests",
        element: <FundRequests />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/know-more",
        element: <KnowMore />
      },
      {
        path: "/know-more/:id",
        element: <KnowMoreDetails />
      },
      {
        path: "/loans-and-grants",
        element: <LoansAndGrants />
      },
      {
        path: "/contact-us",
        element: <ContactUs />
      }      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
