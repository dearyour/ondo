import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import { Button, Form, Input } from 'antd';
import { test } from '../store/api/User.api';


const LoginInput = styled(Input)`
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin: 5px;
  border-color: #EDBABA;
  &:focus {
    outline: none;
  }
`

const LoginForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 100px auto;
`

const LoginLabel = styled.label`
  padding-top: 5px;
  white-space: nowrap;

`

const LoginButton = styled(Button)`
  width: 100%;
  border: 0px;
  color: #F3F3F3;
  background-color: #ebc1c1;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0px;
  &:hover {
    cursor: pointer;
    background-color: #e7adad;
  }
`

const LoginDiv = styled.div`
  display:grid;
  width: 100%;
  text-align: center;
  grid-template-columns: 1fr 4fr;
  margin: 10px 0px;

`

const Login = () => {
  return (
    <LoginForm>
        <LoginDiv>
          <LoginLabel htmlFor="user-id">이메일</LoginLabel>
          <LoginInput name="user-id" required />
        </LoginDiv>
        <LoginDiv>
          <LoginLabel htmlFor="user-password">비밀번호</LoginLabel>
          <LoginInput name="user-password"  type="password" required />
        </LoginDiv>
        <LoginButton>로그인</LoginButton>
        <div>
          <Link href=""><a>비밀번호 찾기 </a></Link>
          |
          <Link href=""><a> 회원가입</a></Link>
          <a href={test}>카카오 테스트</a>
        </div>
    </LoginForm>
  )
}

export default Login;