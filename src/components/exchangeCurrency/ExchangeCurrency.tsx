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
import dayjs from "dayjs";

type ExchangeCurrencyFormDataType = {
  userId: string;
  currencyFrom: AvailableCurrencies;
  currencyTo: AvailableCurrencies;
  amount: string;
};

export const ExchangeCurrency = () => {
  const users = useAppSelector((state) => state.users);
  const { currencies } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExchangeCurrencyFormDataType>();
  const onSubmit = (data: ExchangeCurrencyFormDataType) => {
    const currencyFrom: any = currencies.find(
      (currency) => currency.symbol === data.currencyFrom
    );

    const exchangeRate: any = currencyFrom.value[data.currencyTo];

    dispatch(
      usersSlice.actions.exchangeCurrency({
        userId: parseInt(data.userId),
        currencyFrom: data.currencyFrom,
        currencyTo: data.currencyTo,
        amountFrom: parseInt(data.amount),
        amountTo: parseInt(data.amount) * exchangeRate,
      })
    );

    dispatch(
      transactionsSlice.actions.addTransaction({
        id: uuid(),
        userId: parseInt(data.userId),
        currencyFrom: data.currencyFrom,
        currencyTo: data.currencyTo,
        amountFrom: parseInt(data.amount),
        amountTo: parseInt(data.amount) * exchangeRate,
                createdAt: Date.now() / 1000,

        type: "Exchange",
      })
    );
    reset();
  };
  return (
    <SectionWrapper title="Exchange currency">
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
          <S.LabelText>Currency from</S.LabelText>
          <S.Select
            {...register("currencyFrom", {
              required: "Selection of currency is required.",
            })}
            name="currencyFrom"
          >
            {currencies.map((currency) => (
              <S.Option key={currency.symbol} value={currency.symbol}>
                {currency.symbol}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.currencyFrom && (
              <S.InputErrorText>{errors.currencyFrom.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>Currency to</S.LabelText>
          <S.Select
            {...register("currencyTo", {
              required: "Selection of currency is required.",
            })}
            name="currencyTo"
          >
            {currencies.map((currency) => (
              <S.Option key={currency.symbol} value={currency.symbol}>
                {currency.symbol}
              </S.Option>
            ))}
          </S.Select>
          <S.InputErrorWrapper>
            {errors.currencyTo && (
              <S.InputErrorText>{errors.currencyTo.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <S.Label>
          <S.LabelText>Amount</S.LabelText>
          <S.Input
            type="number"
            step={0.01}
            min={0}
            {...register("amount")}
            name="amount"
          />
          <S.InputErrorWrapper>
            {errors.amount && (
              <S.InputErrorText>{errors.amount.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>

        <S.SubmitButton type="submit">Exchange</S.SubmitButton>
      </S.Form>
    </SectionWrapper>
  );
};
