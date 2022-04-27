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
  gap: 8px;
  flex-direction: column;
`;
export const LabelText = styled.p``;
export const Input = styled.input`
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.black};
`;
export const SubmitButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.white};
  background: transparent;
  color: ${({ theme }) => theme.color.white};
  margin-top: auto;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 6px;
  width: 100%;
  &:hover {
    opacity: 0.9;
  }
  @media ${({ theme }) => theme.medias.mobile} {
    margin-top: 14px;
  }
`;
export const InputErrorWrapper = styled.div``;
export const InputErrorText = styled.p`
  color: red;
`;
