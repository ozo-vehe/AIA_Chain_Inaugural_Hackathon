// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Budget.sol";

contract BudgetManager {
    struct BudgetDetails {
        address budgetAddress;
        string title;
        uint256 createdAt;
    }

    mapping(uint256 => BudgetDetails) public budgets;
    uint256 public budgetCount;

    event BudgetCreated(
        uint256 indexed budgetId,
        address indexed budgetAddress,
        string title,
        uint256 timestamp
    );
    event BudgetRemoved(
        uint256 indexed budgetId,
        address indexed budgetAddress,
        string title,
        uint256 timestamp
    );

    modifier validBudget(uint256 _budgetId) {
        require(budgets[_budgetId].budgetAddress != address(0), "Budget does not exist");
        _;
    }

    // Function to create a new budget
    function addBudget(
        string memory _title,
        string memory _orgName,
        uint256 _totalBudget,
        address[] memory _departments
    ) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_orgName).length > 0, "Organization name cannot be empty");
        require(_totalBudget > 0, "Budget must be greater than zero");

        // Deploy a new instance of the Budget contract
        Budget newBudget = new Budget(
            msg.sender,  // Admin/Owner of the new budget
            _title,
            _orgName,
            _totalBudget,
            _departments
        );

        budgetCount++;
        budgets[budgetCount] = BudgetDetails({
            budgetAddress: address(newBudget),
            title: _title,
            createdAt: block.timestamp
        });
        

        emit BudgetCreated(budgetCount, address(newBudget), _title, block.timestamp);
    }

    // Function to remove a budget
    function removeBudget(uint256 _budgetId) external validBudget(_budgetId) {
        BudgetDetails memory budget = budgets[_budgetId];

        // Clean up mapping
        delete budgets[_budgetId];

        emit BudgetRemoved(_budgetId, budget.budgetAddress, budget.title, block.timestamp);
    }


    // Get the list of budgets
    function listBudgets() external view returns (BudgetDetails[] memory) {
        BudgetDetails[] memory allBudgets = new BudgetDetails[](budgetCount);
        for (uint256 i = 1; i <= budgetCount; i++) {
            allBudgets[i - 1] = budgets[i];
        }
        return allBudgets;
    }

    function getBudget(uint256 _id) external view returns(BudgetDetails memory) {
        return budgets[_id];
    }

    // Receive Ether directly into the contract
    receive() external payable {}

    // Fallback function to handle unexpected Ether with a revert to ensure it's intended
    fallback() external payable {
        revert("Unsupported operation");
    }
}
