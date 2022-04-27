import { Modal } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";
import { AddUser } from "./addUser/AddUser";
import { User } from "./user/User";
import * as S from "./Users.styled";

export const Users = () => {
  const users = useAppSelector((state) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <SectionWrapper title="Users">
      <S.AddUserButton onClick={() => setIsModalVisible(true)}>
        Add user
      </S.AddUserButton>
      <S.UsersWrapper>
        {users.map(({ balance, id }) => (
          <User key={id} balance={balance} id={id} />
        ))}
      </S.UsersWrapper>
      <Modal
        bodyStyle={{ paddingTop: "60px" }}
        onCancel={handleCancel}
        centered
        footer={null}
        visible={isModalVisible}
      >
        <AddUser setIsModalVisible={setIsModalVisible} />
      </Modal>
    </SectionWrapper>
  );
};
