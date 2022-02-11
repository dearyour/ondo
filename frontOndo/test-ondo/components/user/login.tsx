import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { test } from "../../store/api/User.api";
import Image from "next/image";
import kakao_login_large_wide from "public/images/kakao_login_large_wide.png";
import AppLayout from "components/layout/AppLayout";
import Pagebar from "components/NowTitleBar";

const LoginInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: #edbaba;
  &:focus {
    outline: none;
  }
`;

const LoginForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 100px auto;
`;

const LoginLabel = styled.label`
  padding-top: 5px;
  white-space: nowrap;
`;

const LoginButton = styled(Button)`
  width: 100%;
  border: 0px;
  color: #f3f3f3;
  background-color: #ebc1c1;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0px;
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`;


const Kakao = styled.a``;

const Login = () => {
  return (
    <LoginDiv>
      <Kakao href={test}>
        <Image src={kakao_login_large_wide}></Image>
      </Kakao>
    </LoginDiv>
  );
};

const LoginDiv = styled.div`
  width:30%;
`
export default Login;
