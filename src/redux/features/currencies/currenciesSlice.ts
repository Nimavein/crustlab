/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { AvailableCurrencies } from "../users/usersSlice";

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    const response = await axios.get("mockData/currenciesData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  }
);

type CurrencyValueType = {
  PLN: number;
  USD: number;
  EUR: number;
};

type CurrencyType = {
  symbol: AvailableCurrencies;
  value: CurrencyValueType[];
};

type CurrenciesState = {
  currencies: CurrencyType[];
  status: string;
  error: null | undefined | string;
};

const initialState: CurrenciesState = {
  currencies: [],
  status: "idle",
  error: null,
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(
          `There was an error while fetching currencies exchange rates. ${action.error.message}`
        );
      });
  },
});

const { reducer } = currenciesSlice;

export default reducer;
