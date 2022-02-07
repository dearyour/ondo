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

const LoginDiv = styled.div`
  display: grid;
  width: 100%;
  text-align: center;
  grid-template-columns: 1fr 4fr;
  margin: 10px 0px;
`;
const Kakao = styled.a``;

const Login = () => {
  return (
    <AppLayout>
      <Pagebar title="로그인"></Pagebar>
      <LoginForm>
        <div>
          <Kakao href={test}>
            <Image src={kakao_login_large_wide}></Image>
          </Kakao>
        </div>
      </LoginForm>
    </AppLayout>
  );
};

export default Login;
