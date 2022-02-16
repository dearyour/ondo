import React from "react";
import { Avatar, Space } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Router from "next/router";

const ChallengeOwner = ({ img, name, style }: any) => {
  // const image = useSelector((state: RootState) => state.user.image);
  // const { users } = useUser();
  return (
    <Space direction="horizontal" onClick={() => { Router.push(`/user/${name}`) }} >
      <Avatar
        style={img && { backgroundColor: "#edbaba", border: "1px solid pink" }}
        src={img}
        icon={<UserOutlined />}
      />
      <UserPageLink><Style className={style}>{style}</Style>{name}</UserPageLink>
    </Space>
  );
};
const Style = styled.span`
  margin-right: 10px;
`
const UserPageLink = styled.div`
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

export default ChallengeOwner;