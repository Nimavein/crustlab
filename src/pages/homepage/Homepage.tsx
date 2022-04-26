import { DepositFunds } from "../../components/depositFunds/DepositFunds";
import { ExchangeCurrency } from "../../components/exchangeCurrency/ExchangeCurrency";
import { TransferFunds } from "../../components/tranferFunds/TransferFunds";
import { Transactions } from "../../components/transactions/Transactions";
import { Users } from "../../components/users/Users";
import { WithdrawFunds } from "../../components/withdrawFunds/WithdrawFunds";
import * as S from "./Homepage.styled";

export const Homepage = () => {
  return (
    <S.HomepageWrapper>
      <Users />
      <S.OperationsWrapper>
        <TransferFunds />
        <ExchangeCurrency />
        <DepositFunds />
        <WithdrawFunds />
      </S.OperationsWrapper>
      <Transactions />
    </S.HomepageWrapper>
  );
};
