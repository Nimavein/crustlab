import { useEffect } from "react";
import { Transactions } from "./components/transactions/Transactions";
import { Users } from "./components/users/Users";
import { fetchCurrencies } from "./redux/features/currencies/currenciesSlice";
import {
  transactionsSlice,
  TransactionType,
} from "./redux/features/transactions/transactionsSlice";
import {
  ExchangeType,
  TransferType,
  usersSlice,
} from "./redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export const App = () => {
  const dispatch = useAppDispatch();
  const { currencies } = useAppSelector((state) => state.currencies);

  const transferFunds = (transferData: TransferType) => {
    dispatch(usersSlice.actions.transferToOtherUser(transferData));
  };

  const exchangeCurrency = (exchangeData: ExchangeType) => {
    dispatch(usersSlice.actions.exchangeCurrency(exchangeData));
  };

  const addTransaction = (transactionData: TransactionType) => {
    dispatch(transactionsSlice.actions.addTransaction(transactionData));
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  return (
    <div className="App">
      app
      <button
        onClick={() =>
          transferFunds({
            amount: 10,
            userFromId: 1,
            userToId: 3,
            currency: "EUR",
          })
        }
      >
        transfer
      </button>
      <button
        onClick={() =>
          exchangeCurrency({
            amountTo: 20,
            amountFrom: 10,
            userId: 3,
            currencyFrom: "EUR",
            currencyTo: "PLN",
          })
        }
      >
        exchange
      </button>
      <button
        onClick={() =>
          addTransaction({
            id: 0,
            type: "Exchange",
            createdAt: Date.now(),
            userId: 1,
            currency: "PLN",
          })
        }
      >
        add transaction
      </button>
      <Users />
      <Transactions />
    </div>
  );
};
