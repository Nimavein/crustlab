import styled from "styled-components";

export const HomepageWrapper = styled.section`
  max-width: 1782;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${({ theme }) => theme.medias.mobile} {
    padding: 20px;
  }
`;

export const OperationsWrapper = styled.section`
  display: flex;
  gap: 20px;

  @media ${({ theme }) => theme.medias.medium} {
    flex-direction: column;
    width: 100%;
  }
`;
