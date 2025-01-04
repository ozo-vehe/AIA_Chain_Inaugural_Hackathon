import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFundRequests } from "../../utils/budget";


export const fetchAllFundRequests = createAsyncThunk(
  "fundRequests/all",
  async (departments) => {
    let requests = [];
    for (let i = 0; i < departments.length; i++) {
      const req = await getFundRequests(departments[i].budgetAddress, departments[i].departmentAddress);
      if(req.isExist) {
        requests.push(req);
      };
    };
    
    return requests;
  },
);

const fundRequestsSlice = createSlice({
  name: "fundRequests",
  initialState: {
    allFundRequests: [],
    loading: false,
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
      .addCase(fetchAllFundRequests.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allFundRequests = action.payload;
      })
      .addCase(fetchAllFundRequests.rejected, (action) => {
        console.log(action.error);
      })
  },
});

export const getAllFundRequests = (state) => state.fundRequests.allFundRequests;

// export const { setShowDepartments, clearDepartments, fetchTotalBudgetAmount } = fundRequestsSlice.actions;

export default fundRequestsSlice.reducer;
