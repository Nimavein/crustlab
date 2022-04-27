import styled from "styled-components";

export const UsersWrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  @media ${({ theme }) => theme.medias.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const AddUserButton = styled.button`
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
