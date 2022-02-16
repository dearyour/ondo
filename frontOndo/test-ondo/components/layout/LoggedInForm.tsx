import { Avatar, Image, Space } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { RootState } from "store/module";
import useUser from "store/hooks/userHooks";


const LoggedInForm = () => {
  const image = useSelector((state: RootState) => state.user.image);
  const { users } = useUser();
  return (
    <Space direction="horizontal">
      <Avatar
        style={image && { backgroundColor: "#edbaba", border: "1px solid pink" }}
        src={users.image}
        icon={<UserOutlined />}
      />
      <MyPageLink>마이페이지</MyPageLink>
    </Space>
  );
};

const MyPageLink = styled.div`
  cursor: pointer;
  padding-left: 3px;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;

  &:hover {
    color: palevioletred;
  }
`

export default LoggedInForm;
