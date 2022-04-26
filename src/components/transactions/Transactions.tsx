import { useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import { Transaction } from "./transaction/Transaction";
import * as S from "./Transactions.styled";

export const Transactions = () => {
  const transactions = useAppSelector((state) => state.transactions);

  return (
    <SectionWrapper title="Transactions">
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} {...transaction} />
      ))}
    </SectionWrapper>
  );
};
