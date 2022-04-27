import styled from "styled-components";

export const ExchangeInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 14px auto 14px auto;
  width: 100%;

  @media ${({ theme }) => theme.medias.medium} {
    width: 50%;
  }
`;
export const ExchangeWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
export const ReceiveWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
export const ExchangeAmount = styled.p``;
export const ExchangeCurrency = styled.p``;
export const ReceiveAmount = styled.p``;
export const ReceiveCurrency = styled.p``;
