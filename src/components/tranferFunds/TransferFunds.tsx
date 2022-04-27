import { useForm } from "react-hook-form";
import {
  AvailableCurrencies,
  usersSlice,
} from "../../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import * as S from "../formElements/FormElements.styled";
import { v4 as uuid } from "uuid";
import { transactionsSlice } from "../../redux/features/transactions/transactionsSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

type TransferFundsFormDataType = {
  userFromId: string;
  userToId: string;
  currency: AvailableCurrencies;
  amount: string;
};

export const TransferFunds = () => {
  const users = useAppSelector((state) => state.users);
  const { currencies } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    setValue,
  } = useForm<TransferFundsFormDataType>();
  const onSubmit = (data: TransferFundsFormDataType) => {
    const chosenUser = users.find(
      (user) => parseInt(data.userFromId) === user.id
    );
    const isBalanceSufficient =
      chosenUser!.balance.find((currency) => currency.symbol === data.currency)!
        .amount >= parseInt(data.amount);
    if (isBalanceSufficient) {
      dispatch(
        usersSlice.actions.transferToOtherUser({
          userFromId: parseInt(data.userFromId),
          userToId: parseInt(data.userToId),
          currency: data.currency,
          amount: parseInt(data.amount),
        })
      );
      dispatch(
        transactionsSlice.actions.addTransaction({
          id: uuid(),
          userFromId: parseInt(data.userFromId),
          userToId: parseInt(data.userToId),
          currency: data.currency,
          amount: parseInt(data.amount),
          createdAt: Date.now() / 1000,
          type: "Transfer",
        })
      );
      toast.success(
        `User ${data.userFromId} has successfully transferred ${data.amount} ${data.currency} to User ${data.userToId}.`
      );
      reset();
    } 
     if (!isBalanceSufficient) {
      setError("amount", { type: "custom", message: "Insufficient balance." });
      toast.warning(`Insufficient balance.`);
    }
  };

  useEffect(() => {
    if (currencies) {
      setValue("currency", currencies[0]?.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  return (
    <SectionWrapper title="Transfer funds">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Label>
          <S.LabelText>User from</S.LabelText>
          <S.Select
            {...register("userFromId", {
              required: "User selection is required.",
            })}
            name="userFromId"
          >
            {users.map((user) => (
              <S.Option key={user.id} value={user.id}>
                {user.id}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.userFromId && (
              <S.InputErrorText>{errors.userFromId.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>User to</S.LabelText>
          <S.Select
            {...register("userToId", {
              required: "User selection is required.",
            })}
            name="userToId"
          >
            {users.map((user) => (
              <S.Option key={user.id} value={user.id}>
                {user.id}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.userToId && (
              <S.InputErrorText>{errors.userToId.message}</S.InputErrorText>
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
        <S.SubmitButton type="submit">Transfer</S.SubmitButton>
      </S.Form>
    </SectionWrapper>
  );
};
