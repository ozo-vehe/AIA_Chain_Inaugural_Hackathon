 Fineace Platform - AIA Chain Inaugural Hackathon Project


Overview
Fineace Platform is a powerful and intuitive budgeting platform developed during the AIA Chain Inaugural Hackathon. Our team designed this platform with the goal of helping organizations efficiently manage their budgets while leveraging smart contracts for secure backend processes and AI-powered features like an intelligent chatbot for enhanced user interaction.

The platform enables users to submit budget requests, track them through various stages (pending, approved, rejected), and receive real-time updates. On the backend, we implemented smart contracts for robust and transparent budget management, ensuring security and immutability.

Features
Budget Submission & Tracking: Users can create and track budgets in real time, from submission to approval or rejection.
AI-Powered Chatbox: Integrated with AI to assist users in navigating the platform, answering queries, and providing guidance.
Smart Contract Integration: Secure backend infrastructure leveraging blockchain technology to ensure budget data integrity and transparency.
Admin Dashboard: Admins can review, approve, or reject budget requests, which automatically reflect on users’ dashboards.
Responsive Design: Built with Vite for a fast, scalable, and modern frontend experience.
Tech Stack
Frontend: Vite (React)
Backend: Smart Contracts (Ethereum Blockchain)
AI Integration: Custom AI chatbot powered by natural language processing (NLP) tools
Additional Tools:
Tailwind CSS for styling
Solidity for writing smart contracts
Ethers.js for interacting with Ethereum blockchain


Installation & Setup
To get started with Fineace Platform, follow these steps:

Prerequisites
Node.js (v14+)
Vite
Metamask Wallet (for blockchain interactions)
Clone the Repository
bash
Copy code
git clone https://github.com/ONEONUORA/AIA_Chain_Inaugural_Hackathon.git
cd fineace-platform
Install Dependencies
npm install
Start the Frontend
npm run dev

Usage
User Dashboard:

Create and submit budgets with details such as organization name, department, and total amount.
Track the status of submitted budgets (Pending, Approved, Rejected).

Admin Dashboard:

Admins can view submitted budgets and approve or reject them.
Status updates reflect in real time on the user dashboard.

AI Chatbox:

Use the integrated chatbot for guidance, troubleshooting, and getting quick answers.
Smart Contract Details
The smart contracts used in this project are responsible for handling the following functionalities:

Budget Submission & Approval: Ensures each budget request is stored immutably and tracks its approval status.
User Authentication: Secure verification of users and administrators.
Transaction Security: Blockchain transactions to maintain the integrity of budget-related actions.
AI Chatbox
Our AI-powered chatbox uses natural language processing (NLP) to assist users by:

Answering common questions about the budgeting process.
Guiding users on how to submit, track, or manage their budgets.
Providing a personalized and engaging experience.
Contributing
We welcome contributions! Please follow these steps to get started:

Fork the repository.
Create your feature branch: git checkout -b feature/YourFeatureName.
Commit your changes: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/YourFeatureName.
Submit a pull request.
