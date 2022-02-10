import { Avatar, Image, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { RootState } from "store/module";
const LoggedInForm = () => {
  const image = useSelector((state: RootState) => state.user.image);
  return (
    <Space direction="horizontal">
      <Avatar
        style={image && { backgroundColor: "#edbaba" }}
        icon={<UserOutlined />}
      />
      &nbsp;<b>doyouhavea</b>
    </Space>
  );
};

export default LoggedInForm;
