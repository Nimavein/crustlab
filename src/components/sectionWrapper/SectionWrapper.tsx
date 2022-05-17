import { Card } from "antd";
import { HTMLAttributes } from "react";
import { theme } from "../../style";
import * as S from "./SectionWrapper.styled";

type SectionWrapperProps = {
  title: string;
};

export const SectionWrapper = ({
  title,
  children,
}: SectionWrapperProps & HTMLAttributes<HTMLDivElement>) => (
  <Card style={{ backgroundColor: theme.color.whiteLight }}>
    <S.Title>{title}</S.Title>
    {children}
  </Card>
);
