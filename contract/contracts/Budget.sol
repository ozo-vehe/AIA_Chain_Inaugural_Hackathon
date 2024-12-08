// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Budget is ReentrancyGuard, Ownable {
    // State variables
    address public admin;
    uint256 public departmentCount;
    uint256 public totalBudget;
    uint256 public totalBudgetMonitor;
    string public title;
    string public orgName;

    struct Department {
        uint256 id;
        address departmentAddress;
        uint256 allocation;
        uint256 spent;
        bool isAllocated;
    }

    struct FundRequest {
        uint256 amount;
        string reason;
        bool approved;
        bool exists; // To check if a request exists
    }

    mapping(uint256 => Department) public departments;
    mapping(address => FundRequest) public fundRequests;

    event BudgetAllocated(address indexed department, uint256 indexed departmentId, uint256 indexed amount);
    event BudgetUpdated(uint256 indexed previousBudget, uint256 indexed newBudget);
    event FundRequested(address indexed department, uint256 amount, string reason);
    event FundApproved(address indexed department, uint256 amount);
    event FundRejected(address indexed department, string reason);

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    modifier validDepartment() {
        require(isDepartment(msg.sender), "Not a valid department");
        _;
    }

    constructor(
        address _owner,
        string memory _title,
        string memory _orgName,
        uint256 _budget,
        address[] memory _departments
    ) Ownable(_owner) {
        admin = _owner;
        title = _title;
        orgName = _orgName;
        totalBudget = _budget;
        totalBudgetMonitor = _budget;
        for (uint256 i; i < _departments.length; i++) {
            departments[departmentCount] = Department({
                id: departmentCount,
                departmentAddress: _departments[i],
                allocation: 0,
                spent: 0,
                isAllocated: false
            });
            departmentCount++;
        }
    }

    // Function to allocate budget to departments
    function allocateBudget(
        address _department,
        uint256 _amount,
        uint256 _departmentId
    ) external onlyOwner validAddress(_department) {
        require(_amount <= totalBudgetMonitor, "Allocation exceeds total budget");
        require(!departments[_departmentId].isAllocated, "Department already has an allocation");

        departments[_departmentId].allocation = _amount;
        departments[_departmentId].isAllocated = true;
        totalBudgetMonitor -= _amount;

        emit BudgetAllocated(_department, _departmentId, _amount);
    }

    // Function to update total budget if needed
    function updateBudget(uint256 _additionalBudget) external onlyOwner {
        require(_additionalBudget > 0, "Additional budget must be greater than zero");
        uint256 previousBudget = totalBudget;
        totalBudget += _additionalBudget;

        totalBudgetMonitor = totalBudget;

        emit BudgetUpdated(previousBudget, totalBudget);
    }

    // Function for departments to request funds
    function requestFunds(uint256 _amount, string calldata _reason) external validDepartment {
        require(_amount > 0, "Request amount must be greater than zero");
        require(!fundRequests[msg.sender].exists, "Request already exists, wait for approval or rejection");

        fundRequests[msg.sender] = FundRequest({
            amount: _amount,
            reason: _reason,
            approved: false,
            exists: true
        });

        emit FundRequested(msg.sender, _amount, _reason);
    }

    // Function to approve fund requests
    function approveFundRequest(address _department, uint256 _departmentId) external onlyOwner validAddress(_department) {
        FundRequest storage request = fundRequests[_department];
        Department storage department = departments[_departmentId];

        require(request.exists, "No fund request found");
        require(!request.approved, "Request already approved");
        require(department.allocation >= request.amount, "Requested amount exceeds department allocation");

        request.approved = true;
        department.spent += request.amount;
        department.allocation -= request.amount;

        // Transfer funds to the department
        // Uncomment the line below if you're working with real Ether
        // (bool success, ) = payable(_department).call{value: request.amount}("");
        // require(success, "Transfer failed");

        emit FundApproved(_department, request.amount);
    }

    // Function to reject fund requests
    function rejectFundRequest(address _department) external onlyOwner validAddress(_department) {
        FundRequest storage request = fundRequests[_department];
        require(request.exists, "No fund request found");
        require(!request.approved, "Cannot reject an approved request");

        delete fundRequests[_department];

        emit FundRejected(_department, "Request rejected by admin");
    }

    // Function to check if an address is a department
    function isDepartment(address _department) public view returns (bool) {
        for (uint256 i = 0; i < departmentCount; i++) {
            if (departments[i].departmentAddress == _department) {
                return true;
            }
        }
        return false;
    }

    // Function to get department details
    function getDepartment(uint256 _id) external view returns (Department memory) {
        return departments[_id];
    }

    // Receive Ether directly into the contract
    receive() external payable {}

    // Fallback function to handle unexpected Ether with a revert to ensure it's intended
    fallback() external payable {
        revert("Unsupported operation");
    }
}
