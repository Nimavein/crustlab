import { amountConverter } from "../../../helpers/amountConverter";
import {
  CurrencyType,
  UserStateType,
} from "../../../redux/features/users/usersSlice";
import * as S from "./User.styled";

type UserProps = {} & UserStateType;

export const User = ({ balance, id }: UserProps) => {
  return (
    <S.Card title={`User ${id}`}>
      <S.BalanceDetails>
        {balance.map(({ symbol, amount }: CurrencyType) => {
          return (
            <S.BalanceDetail key={symbol}>
              <S.Currency>{symbol}</S.Currency>
              <S.Amount>{amountConverter(amount)}</S.Amount>
            </S.BalanceDetail>
          );
        })}
      </S.BalanceDetails>
    </S.Card>
  );
};
