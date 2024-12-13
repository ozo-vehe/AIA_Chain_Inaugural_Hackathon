import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from './budget/budgetSlice'
import budgetManagerReducer from './budgetManager/budgetManagerSlice'

export const store = configureStore({
  reducer: {
    budgets: budgetReducer,
    budgetManager: budgetManagerReducer,
  },
})
