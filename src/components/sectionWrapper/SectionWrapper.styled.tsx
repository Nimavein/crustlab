import styled from "styled-components";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: center;
  gap: 14px;
  padding: 24px;
  border-radius: 30px;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  width: 100%;

  @media ${({ theme }) => theme.medias.mobile} {
    width: 100%;
    border-radius: 18px;
  }
`;

export const Title = styled.p`
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;

  @media ${({ theme }) => theme.medias.mobile} {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;
