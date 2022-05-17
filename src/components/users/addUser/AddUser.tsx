import { useForm } from "react-hook-form";
import { usersSlice } from "../../../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SectionWrapper } from "../../sectionWrapper/SectionWrapper";
import * as S from "../../formElements/FormElements.styled";
import { toast } from "react-toastify";
import { amountConverter } from "../../../helpers/amountConverter";
import React from "react";
import { Button } from "antd";

type WithdrawFundsFormDataType = {
  PLN: string;
  USD: string;
  EUR: string;
};

type AddUserPropsType = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddUser = ({ setIsModalVisible }: AddUserPropsType) => {
  const users = useAppSelector((state) => state.users);
  const { currencies } = useAppSelector((state) => state.currencies);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WithdrawFundsFormDataType>();
  const onSubmit = (data: WithdrawFundsFormDataType) => {
    dispatch(
      usersSlice.actions.addUser([
        { symbol: "PLN", amount: amountConverter(parseFloat(data.PLN)) },
        { symbol: "EUR", amount: amountConverter(parseFloat(data.EUR)) },
        { symbol: "USD", amount: amountConverter(parseFloat(data.USD)) },
      ])
    );
    toast.success(`User ${users.length + 1} has been successfully added.`);
    reset();
    setIsModalVisible(false);
  };

  return (
    <SectionWrapper title="Add user">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {currencies.map((currency) => (
          <S.Label key={currency.symbol}>
            <S.LabelText>{currency.symbol}</S.LabelText>
            <S.Input
              type="number"
              step={0.01}
              min={0}
              {...register(currency.symbol, {
                required: "Amount is required.",
                validate: {
                  isPositive: (value) =>
                    amountConverter(parseFloat(value)) >= 0 ||
                    `The amount must be 0 or greater than 0.`,
                },
              })}
              name={currency.symbol}
              placeholder="Enter amount"
            />
            <S.InputErrorWrapper>
              {errors[currency.symbol] && (
                <S.InputErrorText>
                  {errors[currency.symbol]?.message}
                </S.InputErrorText>
              )}
            </S.InputErrorWrapper>
          </S.Label>
        ))}
        <Button block type="primary" htmlType="submit">
          Add
        </Button>
      </S.Form>
    </SectionWrapper>
  );
};
