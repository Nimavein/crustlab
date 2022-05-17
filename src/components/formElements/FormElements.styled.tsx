import styled from "styled-components";

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Select = styled.select`
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.black};
`;
export const Option = styled.option``;
export const Label = styled.label`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;
export const LabelText = styled.p``;
export const Input = styled.input`
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.black};
`;
export const InputErrorWrapper = styled.div`
  min-height: 14px;
  margin-bottom: 4px;
`;
export const InputErrorText = styled.p`
  color: red;
  font-size: 12px;
`;
