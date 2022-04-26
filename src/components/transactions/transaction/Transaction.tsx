import { TransactionType } from "../../../redux/features/transactions/transactionsSlice";
import * as S from "./Transaction.styled";

export const Transaction = ({
  id,
  type,
  amount,
  amountFrom,
  amountTo,
  createdAt,
  currency,
  currencyFrom,
  currencyTo,
  userId,
  userFromId,
  userToId,
}: TransactionType) => {
  return (
    <S.Card>
      <S.CardContentWrapper>
        {id && <S.TransactionDetail>ID: {id}</S.TransactionDetail>}
        {type && <S.TransactionDetail>Type: {type}</S.TransactionDetail>}
        {amount && <S.TransactionDetail>Amount: {amount}</S.TransactionDetail>}
        {amountFrom && (
          <S.TransactionDetail>Amount from: {amountFrom}</S.TransactionDetail>
        )}
        {amountTo && (
          <S.TransactionDetail>Amount to: {amountTo}</S.TransactionDetail>
        )}
        {createdAt && (
          <S.TransactionDetail>Created at: {createdAt}</S.TransactionDetail>
        )}
        {currency && (
          <S.TransactionDetail>Currency: {currency}</S.TransactionDetail>
        )}
        {currencyFrom && (
          <S.TransactionDetail>
            Currency from: {currencyFrom}
          </S.TransactionDetail>
        )}
        {currencyTo && (
          <S.TransactionDetail>Currency to: {currencyTo}</S.TransactionDetail>
        )}
        {userId && <S.TransactionDetail>User ID: {userId}</S.TransactionDetail>}
        {userFromId && (
          <S.TransactionDetail>User to ID: {userFromId}</S.TransactionDetail>
        )}
        {userToId && (
          <S.TransactionDetail>User to ID: {userToId}</S.TransactionDetail>
        )}
      </S.CardContentWrapper>
    </S.Card>
  );
};
