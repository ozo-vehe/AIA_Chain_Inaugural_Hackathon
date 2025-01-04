import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from './budget/budgetSlice'
import budgetManagerReducer from './budgetManager/budgetManagerSlice'
import departmentReducer from './department/departmentSlice'
import fundRequestsReducer from './fundRequests/fundRequestsSlice'

export const store = configureStore({
  reducer: {
    budgets: budgetReducer,
    budgetManager: budgetManagerReducer,
    department: departmentReducer,
    fundRequests: fundRequestsReducer,
  },
})
