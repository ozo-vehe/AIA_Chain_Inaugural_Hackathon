import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBudgets } from "../../utils/budget";

export const fetchMonsters = createAsyncThunk("monsters/all", async () => {
  // const monsters = await getMonsters();
  // return monsters;
});

export const fetchBudgets = createAsyncThunk(
  "budgets",
  async () => {
    const budgets = await getAllBudgets();
    console.log(budgets);
    return budgets;
  }
);

const budgetManagerSlice = createSlice({
  name: "budgetManager",
  initialState: {
    budgets: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (action) => {
        console.log(action.error);
      });
  },
});

// export const getUploadedMonsters = (state) => state.budget.budgets;
// export const getUserMonsters = (state) => state.budget.userMonsters;
// export const getBalance = (state) => state.budget.balance;

export default budgetManagerSlice.reducer;
