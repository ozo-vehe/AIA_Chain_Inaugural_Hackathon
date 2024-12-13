import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserBudgets, getDepartments } from "../../utils/budget";

export const fetchMonsters = createAsyncThunk("monsters/all", async () => {
  // const monsters = await getMonsters();
  // return monsters;
});

export const fetchBudgetDetails = createAsyncThunk(
  "budgets",
  async (address) => {
    const budgets = await getUserBudgets(address);
    const userBudgets = budgets.filter((budget) => budget !== undefined);
    console.log(userBudgets);
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

      console.log(userBudgets);
      return {
        userBudgets,
        totalBudgetAmount,
        totalBudgetAllocated,
        budgetStatus,
      };
    }
  },
);

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
    allBudgets: [],
    departments: [],
    showDepartments: false,
    totalBudgetAmount: 0,
    totalBudgetAllocated: 0,
    totalAmountSpent: 0,
    budgetStatus: "",
  },
  reducers: {
    setShowDepartments: (state) => {
      state.showDepartments = !state.showDepartments;
    },
    clearDepartments: (state) => {
      state.departments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.budgetStatus !== "success") {
          state.budgetStatus = action.payload.budgetStatus;
          return;
        }
        state.allBudgets = action.payload.userBudgets;
        state.totalBudgetAmount = action.payload.totalBudgetAmount;
        state.totalBudgetAllocated = action.payload.totalBudgetAllocated;
        state.budgetStatus = action.payload.budgetStatus;
      })
      .addCase(fetchBudgetDetails.rejected, (action) => {
        console.log(action.error);
      })
      .addCase(fetchBudgetDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchBudgetDepartments.rejected, (action) => {
        console.log(action.error);
      });
  },
});

export const getAllBudgets = (state) => state.budgets.allBudgets;
export const getAllDepartments = (state) => state.budgets.departments;
export const getShowDepartment = (state) => state.budgets.showDepartments;
export const getAllTotalBudgetAmount = (state) =>
  state.budgets.totalBudgetAmount;
export const getTotalBudgetAllocated = (state) =>
  state.budgets.totalBudgetAllocated;
export const getBudgetStatus = (state) => state.budgets.budgetStatus;

export const { setShowDepartments, clearDepartments, fetchTotalBudgetAmount } =
  budgetSlice.actions;

export default budgetSlice.reducer;
