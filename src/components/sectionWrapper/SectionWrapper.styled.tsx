import styled from "styled-components";

export const Title = styled.p`
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;

  @media ${({ theme }) => theme.medias.mobile} {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;
