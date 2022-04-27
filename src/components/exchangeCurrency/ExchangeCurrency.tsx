import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AvailableCurrencies,
  usersSlice,
} from "../../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import * as S from "../formElements/FormElements.styled";
import * as SC from "./ExchangeCurrency.styled";
import { v4 as uuid } from "uuid";
import { transactionsSlice } from "../../redux/features/transactions/transactionsSlice";
import { ArrowRightOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { amountConverter } from "../../helpers/amountConverter";

type ExchangeCurrencyFormDataType = {
  userId: string;
  currencyFrom: AvailableCurrencies;
  currencyTo: AvailableCurrencies;
  amount: string;
};

export const ExchangeCurrency = () => {
  const users = useAppSelector((state) => state.users);
  const { currencies } = useAppSelector((state) => state.currencies);
  const [exchangeRate, setExchangeRate] = useState(1);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<ExchangeCurrencyFormDataType>();
  const onSubmit = (data: ExchangeCurrencyFormDataType) => {
    const chosenUser = users.find((user) => parseInt(data.userId) === user.id);
    const isBalanceSufficient =
      chosenUser!.balance.find(
        (currency) => currency.symbol === data.currencyFrom
      )!.amount >= parseInt(data.amount);

    if (isBalanceSufficient) {
      dispatch(
        usersSlice.actions.exchangeCurrency({
          userId: parseInt(data.userId),
          currencyFrom: data.currencyFrom,
          currencyTo: data.currencyTo,
          amountFrom: amountConverter(parseFloat(data.amount)),
          amountTo: amountConverter(parseFloat(data.amount) * exchangeRate),
        })
      );

      dispatch(
        transactionsSlice.actions.addTransaction({
          id: uuid(),
          userId: parseInt(data.userId),
          currencyFrom: data.currencyFrom,
          currencyTo: data.currencyTo,
          amountFrom: amountConverter(parseFloat(data.amount)),
          amountTo: amountConverter(parseFloat(data.amount) * exchangeRate),
          createdAt: Date.now() / 1000,
          type: "Exchange",
        })
      );
      toast.success(
        `User ${data.userId} has successfully exchanged ${data.amount} ${
          data.currencyFrom
        } to ${amountConverter(parseFloat(data.amount) * exchangeRate)} ${
          data.currencyTo
        }.`
      );
      reset();
    }
    if (!isBalanceSufficient) {
      setError("amount", { type: "custom", message: "Insufficient balance." });
      toast.warning(`Insufficient balance.`);
    }
  };
  const watchFields = watch();

  useEffect(() => {
    if (currencies) {
      setValue("currencyFrom", currencies[0]?.symbol);
      setValue("currencyTo", currencies[0]?.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  useEffect(() => {
    const currencyFrom: any = currencies.find(
      (currency) => currency.symbol === watchFields.currencyFrom
    );
    const exchangeRate: number = currencyFrom?.value[watchFields.currencyTo];
    setExchangeRate(exchangeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFields]);

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
          <S.LabelText>Exchange</S.LabelText>
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
          <S.LabelText>To</S.LabelText>
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
            {...register("amount", {
              required: "Amount is required.",
                validate: {
                  isPositive: (value) =>
                    amountConverter(parseFloat(value)) > 0 ||
                    `The amount must be greater than 0.`,
                },
            })}
            name="amount"
            placeholder="Enter amount"
          />
          <S.InputErrorWrapper>
            {errors.amount && (
              <S.InputErrorText>{errors.amount.message}</S.InputErrorText>
            )}
          </S.InputErrorWrapper>
        </S.Label>
        <SC.ExchangeInfoWrapper>
          <SC.ExchangeWrapper>
            <SC.ExchangeAmount>
              {amountConverter(parseFloat(watchFields.amount)) || 0}
            </SC.ExchangeAmount>
            <SC.ExchangeCurrency>
              {watchFields.currencyFrom}
            </SC.ExchangeCurrency>
          </SC.ExchangeWrapper>
          <ArrowRightOutlined />
          <SC.ReceiveWrapper>
            <SC.ReceiveAmount>
              {amountConverter(parseFloat(watchFields.amount) * exchangeRate) ||
                0}
            </SC.ReceiveAmount>
            <SC.ReceiveCurrency>{watchFields.currencyTo}</SC.ReceiveCurrency>
          </SC.ReceiveWrapper>
        </SC.ExchangeInfoWrapper>
        <S.SubmitButton type="submit">Exchange</S.SubmitButton>
      </S.Form>
    </SectionWrapper>
  );
};
