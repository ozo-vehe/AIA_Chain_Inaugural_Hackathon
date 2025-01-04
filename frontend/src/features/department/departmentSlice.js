import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getDepartments } from "../../utils/budget";
import { getDepartments } from "../../utils/budget";

export const fetchAllDepartments = createAsyncThunk(
  "departments/all",
  async (budgets) => {
    let departments = []

    const department = budgets.map(async (budget) => {
      const department = await getDepartments(budget.address, budget.departmentCount);

      departments.push(...department);
    });

    await Promise.all(department);

    return departments;
  },
);

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
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
      .addCase(fetchAllDepartments.fulfilled, (state, action) => {
        console.log(action.payload);
        state.departments = action.payload;
      })
      .addCase(fetchAllDepartments.rejected, (action) => {
        console.log(action.error);
      })
  },
});

export const getAllDepartments = (state) => state.department.departments;

export default departmentSlice.reducer;
