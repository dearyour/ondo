import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import { Button, Form, Input } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import Pagebar from '../components/nowpagebar';


const TermsBox = styled.div`
  width:50%;
  height:500px;
  overflow:auto;  
  border:1px solid black;
  padding: 0 0.5em;

`

const CheckBtn = styled(Button)`
  border: none;
  background-color: white;
`

const SignupInput = styled(Input)`
  border-radius: 10px;
  padding: 3px;
`

const signup = () => {
  return (
    <div>
      <Pagebar title="회원가입"></Pagebar>
      <TermsBox>
        <h3>제1조(목적)</h3>
        <p>이 약관은 운영하는 홈페이지에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다. </p>
      </TermsBox>
      <CheckBtn shape="circle" icon={<CheckCircleOutlined />} /> <span>예, 전부 동의합니다.</span>
    </div>
  )
}

export default signup;