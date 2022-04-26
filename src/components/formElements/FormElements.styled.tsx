import styled from "styled-components";

export const Form = styled.form``;
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
  border: none;
  background: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 6px;
  @media ${({ theme }) => theme.medias.mobile} {
    width: 100%;
  }
`;
export const InputErrorWrapper = styled.div``;
export const InputErrorText = styled.p`
  color: red;
`;
