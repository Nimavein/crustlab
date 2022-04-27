/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { amountConverter } from "../../../helpers/amountConverter";

export type CurrencyType = {
  symbol: string;
  amount: number;
};

export type AvailableCurrencies = "PLN" | "EUR" | "USD";

export type TransferType = {
  userFromId: number;
  userToId: number;
  currency: AvailableCurrencies;
  amount: number;
};

export type ExchangeType = {
  userId: number;
  currencyFrom: AvailableCurrencies;
  currencyTo: AvailableCurrencies;
  amountFrom: number;
  amountTo: number;
};

export type FundsOperationType = {
  userId: number;
  currency: AvailableCurrencies;
  amount: number;
};

export type UserStateType = {
  id: number;
  balance: CurrencyType[];
};

const initialState: UserStateType[] = [
  {
    id: 1,
    balance: [
      { symbol: "PLN", amount: 100 },
      { symbol: "EUR", amount: 100 },
      { symbol: "USD", amount: 100 },
    ],
  },
  {
    id: 2,
    balance: [
      { symbol: "PLN", amount: 100 },
      { symbol: "EUR", amount: 100 },
      { symbol: "USD", amount: 100 },
    ],
  },
  {
    id: 3,
    balance: [
      { symbol: "PLN", amount: 100 },
      { symbol: "EUR", amount: 100 },
      { symbol: "USD", amount: 100 },
    ],
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    transferToOtherUser(state, action: PayloadAction<TransferType>) {
      const sendingUser = state.find(
        (user) => user.id === action.payload.userFromId
      );
      const receivingUser = state.find(
        (user) => user.id === action.payload.userToId
      );
      sendingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currency
      )!.amount -= amountConverter(action.payload.amount);
      receivingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currency
      )!.amount += amountConverter(action.payload.amount);
    },
    exchangeCurrency(state, action: PayloadAction<ExchangeType>) {
      const exchangingUser = state.find(
        (user) => user.id === action.payload.userId
      );
      exchangingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currencyFrom
      )!.amount -= amountConverter(action.payload.amountFrom);
      exchangingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currencyTo
      )!.amount += amountConverter(action.payload.amountTo);
    },
    withdrawFunds(state, action: PayloadAction<FundsOperationType>) {
      const withdrawingUser = state.find(
        (user) => user.id === action.payload.userId
      );
      withdrawingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currency
      )!.amount -= amountConverter(action.payload.amount);
    },
    depositFunds(state, action: PayloadAction<FundsOperationType>) {
      const depositingUser = state.find(
        (user) => user.id === action.payload.userId
      );
      depositingUser!.balance.find(
        (currency) => currency.symbol === action.payload.currency
      )!.amount += amountConverter(action.payload.amount);
    },
  },
});

const { reducer } = usersSlice;

export default reducer;
