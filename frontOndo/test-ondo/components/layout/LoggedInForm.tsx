import { Avatar, Image, Space } from "antd";
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
      <b>Mypage</b>
    </Space>
  );
};

export default LoggedInForm;
