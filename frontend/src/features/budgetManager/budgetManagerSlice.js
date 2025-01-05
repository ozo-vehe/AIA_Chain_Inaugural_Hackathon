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
    showMobileSidebar: false,
  },
  reducers: {
    setShowMobileSidebar: (state, action) => {
      state.showMobileSidebar = action.payload;
    }
  },
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

export const getShowMobileSidebar = (state) => state.budgetManager.showMobileSidebar;
export const { setShowMobileSidebar } = budgetManagerSlice.actions;

export default budgetManagerSlice.reducer;
