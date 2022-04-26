import { HTMLAttributes } from "react";
import * as S from "./SectionWrapper.styled";

type SectionWrapperProps = {
  title: string;
};

export const SectionWrapper = ({
  title,
  children,
}: SectionWrapperProps & HTMLAttributes<HTMLDivElement>) => (
    <S.SectionWrapper>
      <S.Title>{title}</S.Title>
      {children}
    </S.SectionWrapper>
);
