import styled from "styled-components";

export const PageWrapper = styled.section`
  max-width: 1782;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.medias.mobile} {
    padding: 20px;
  }
`;

export const SectionWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  gap: 14px;
  padding: 60px;
  border-radius: 30px;
  background: ${({ theme }) => theme.color.white};

  @media (max-width: 1440px) {
    width: 70%;
  }

  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }

  @media ${({ theme }) => theme.medias.mobile} {
    width: 100%;
    padding: 30px;
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
