/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableCurrencies } from "../users/usersSlice";

export type TransactionType = {
  id: string;
  type: "Exchange" | "Transfer" | "Withdraw" | "Deposit";
  createdAt: number;
  userId?: number;
  userFromId?: number;
  userToId?: number;
  currency?: AvailableCurrencies;
  currencyFrom?: AvailableCurrencies;
  currencyTo?: AvailableCurrencies;
  amount?: number;
  amountFrom?: number;
  amountTo?: number;
};

const initialState: TransactionType[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<TransactionType>) {
      state.push(action.payload);
    },
  },
});

const { reducer } = transactionsSlice;

export default reducer;
