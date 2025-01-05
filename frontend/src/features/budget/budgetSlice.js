import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserBudgets,
  getDepartments,
  getAllBudgets,
} from "../../utils/budget";

export const fetchBudgetDetails = createAsyncThunk(
  "budgets",
  async (address) => {
    const budgets = await getUserBudgets(address);
    const userBudgets = budgets.filter((budget) => budget !== undefined);

    if (userBudgets[0].status === "success") {
      const budgetStatus = userBudgets[0].status;
      if (budgetStatus !== "success") return { budgetStatus };

      const totalBudgetAmount = userBudgets.reduce(
        (total, budget) => total + parseInt(budget.totalBudget),
        0,
      );
      const totalBudgetAllocated = userBudgets.reduce(
        (total, budget) =>
          total + parseInt(budget.totalBudget - budget.budgetMonitor),
        0,
      );

      return {
        userBudgets,
        totalBudgetAmount,
        totalBudgetAllocated,
        budgetStatus,
      };
    }
  },
);

export const fetchAllBudgets = createAsyncThunk("budgets/all", async () => {
  const budgets = await getAllBudgets();
  return budgets;
});

export const fetchBudgetDepartments = createAsyncThunk(
  "budget/departments",
  async (params) => {
    const { budgetAddress, departmentCount } = params;

    const departments = await getDepartments(budgetAddress, departmentCount);

    return departments;
  },
);

const budgetSlice = createSlice({
  name: "budgets",
  initialState: {
    budgets: [],
    userBudgets: [],
    totalBudgetAmount: 0,
    totalAmountAllocated: 0,
    totalAmountSpent: 0,
    totalSpent: 0,
  },
  reducers: {
    setShowDepartments: (state) => {
      state.showDepartments = !state.showDepartments;
    },
    clearDepartments: (state) => {
      state.departments = [];
    },
    fetchUserBudgets: (state, action) => {
      state.budgets.filter((budget) => budget.owner === action.payload);
    },
    fetchTotalBudgetAmount: (state, action) => {
      const userBudgets = state.budgets.filter(
        (budget) => budget.owner === action.payload,
      );

      if (userBudgets.length > 0) {
        const totalBudgetAmount = userBudgets.reduce(
          (total, budget) => total + parseInt(budget.totalBudget),
          0,
        );

        state.totalBudgetAmount = totalBudgetAmount;
      } else {
        state.totalBudgetAmount = 0;
      }
    },
    fetchTotalAmountAllocated: (state, action) => {
      const userBudgets = state.budgets.filter(
        (budget) => budget.owner === action.payload,
      );

      if (userBudgets.length > 0) {
        state.totalAmountAllocated = userBudgets.reduce(
          (total, budget) =>
            total + parseInt(budget.totalBudget - budget.budgetMonitor),
          0,
        );
      } else {
        state.totalAmountAllocated = 0;
      }
    },
    fetchTotalAmountSpent: (state, action) => {
      const departments = action.payload;
      const spentFunds = departments.reduce((total, department) => {
        return total + parseInt(department.spent);
      }, 0);
      state.totalAmountSpent = spentFunds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBudgets.fulfilled, (state, action) => {
        state.budgets = action.payload;
      })
      .addCase(fetchAllBudgets.rejected, (action) => {
        console.log(action.error);
      });
  },
});

export const getAllSavedBudgets = (state) => state.budgets.budgets;
export const getAllUserBudgets = (state) => state.budgets.userBudgets;
export const getTotalBudgetAmount = (state) => state.budgets.totalBudgetAmount;
export const getTotalAmountAllocated = (state) =>
  state.budgets.totalAmountAllocated;
export const getTotalAmountSpent = (state) => state.budgets.totalAmountSpent;

export const {
  setShowDepartments,
  clearDepartments,
  fetchUserBudgets,
  fetchTotalBudgetAmount,
  fetchTotalAmountAllocated,
  fetchTotalAmountSpent,
} = budgetSlice.actions;

export default budgetSlice.reducer;
