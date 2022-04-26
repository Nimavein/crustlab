import { useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import { User } from "./user/User";
import * as S from "./Users.styled";

export const Users = () => {
  const users = useAppSelector((state) => state.users);

  return (
    <SectionWrapper title="Users">
      <S.UsersWrapper>
        {users.map(({ balance, id }) => (
          <User key={id} balance={balance} id={id} />
        ))}
      </S.UsersWrapper>
    </SectionWrapper>
  );
};
