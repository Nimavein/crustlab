import { configureStore } from "@reduxjs/toolkit";
import currenciesSlice from "./features/currencies/currenciesSlice";
import transactionsSlice from "./features/transactions/transactionsSlice";
import usersSlice from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
    users: usersSlice,
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
