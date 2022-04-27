import { useForm } from "react-hook-form";
import {
  AvailableCurrencies,
  usersSlice,
} from "../../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import * as S from "../formElements/FormElements.styled";
import { transactionsSlice } from "../../redux/features/transactions/transactionsSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { amountConverter } from "../../helpers/amountConverter";

type DepositFundsFormDataType = {
  userId: string;
  currency: AvailableCurrencies;
  amount: string;
};

export const DepositFunds = () => {
  const users = useAppSelector((state) => state.users);
  const { currencies } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<DepositFundsFormDataType>();
  const onSubmit = (data: DepositFundsFormDataType) => {
    dispatch(
      usersSlice.actions.depositFunds({
        userId: parseInt(data.userId),
        currency: data.currency,
        amount: amountConverter(parseFloat(data.amount)),
      })
    );
    dispatch(
      transactionsSlice.actions.addTransaction({
        id: uuid(),
        userId: parseInt(data.userId),
        currency: data.currency,
        amount: amountConverter(parseFloat(data.amount)),
        createdAt: Date.now() / 1000,
        type: "Deposit",
      })
    );
    toast.success(
      `User ${data.userId} has successfully deposited ${amountConverter(
        parseFloat(data.amount)
      )} ${data.currency}.`
    );
    reset();
  };

  useEffect(() => {
    if (currencies) {
      setValue("currency", currencies[0]?.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);
  return (
    <SectionWrapper title="Deposit funds">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Label>
          <S.LabelText>User</S.LabelText>
          <S.Select
            {...register("userId", {
              required: "User selection is required.",
            })}
            name="userId"
          >
            {users.map((user) => (
              <S.Option key={user.id} value={user.id}>
                {user.id}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.userId && (
              <S.InputErrorText>{errors.userId.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>Currency</S.LabelText>
          <S.Select
            {...register("currency", {
              required: "Selection of currency is required.",
            })}
            name="currency"
          >
            {currencies.map((currency) => (
              <S.Option key={currency.symbol} value={currency.symbol}>
                {currency.symbol}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.currency && (
              <S.InputErrorText>{errors.currency.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>Amount</S.LabelText>
          <S.Input
            type="number"
            step={0.01}
            min={0}
            {...register("amount", {
              required: "Amount is required.",
            })}
            name="amount"
          />
          <S.InputErrorWrapper>
            {errors.amount && (
              <S.InputErrorText>{errors.amount.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.SubmitButton type="submit">Deposit</S.SubmitButton>
      </S.Form>
    </SectionWrapper>
  );
};
