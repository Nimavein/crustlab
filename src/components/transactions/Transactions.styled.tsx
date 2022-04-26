import styled from "styled-components";

export const TransactionsWrapper = styled.section`
  padding: 20px;
  background: ${({ theme }) => theme.color.black};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  @media ${({ theme }) => theme.medias.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionTitle = styled.h1`
  color: white;
`;
