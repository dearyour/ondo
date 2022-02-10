import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { test } from "../store/api/User.api";
import axios from "axios";
import { GetFeedState } from "store/api/Feed.api";

const Login = () => {
  const __GetUserStates = useCallback((token: string | null) => {
    return axios({
      method: "GET",
      url: "http://localhost:8080/user/info",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }, []);
  const [feeds, setFeeds] = useState([]); //프롭으로내려주자
  const __GetFeedState = (token: string | null) => {
    return axios({
      method: "GET",
      url: "http://localhost:8080/feed",
      // url: "https://jsonplaceholder.typicode.com/comments",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        // console.log(res.data.detailFeedDtos);
        console.log(res.data);
        return setFeeds(res.data.detailFeedDtos);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    // console.log(feeds); useState는 이렇게하면 초기값나오는듯, set된값은 아래 tsx에서 확인하자
    __GetFeedState(token);
    // __GetUserStates(token);
    // GetFeedState(token);
  }, [__GetUserStates]);
  //아래 얘는 작동인됨 위에는됨 도대체왜?????
  // const __GetFeedssssState = (token: string | null) => {
  //   return axios({
  //     method: "GET",
  //     url: "https://jsonplaceholder.typicode.com/comments",
  //     headers: { Authorization: "Bearer " + token },
  //   })
  //     .then((res) => {
  //       console.log(res.data.detailFeedDtos.feed);
  //       console.log(res);
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   __GetFeedssssState(token);
  // }, []);
  return (
    <LoginForm>
      <LoginLabel htmlFor="Test-Warning">
        {" "}
        테스트용 URL입니다. 삭제하지 말아주세요!!
      </LoginLabel>
      <LoginLabel htmlFor="Test-Sarning">
        {" "}
        올바른 URL을 다시 입력해 주세요
      </LoginLabel>
      <LoginDiv>
        <LoginLabel htmlFor="user-id">이메일</LoginLabel>
        <LoginInput name="user-id" required />
      </LoginDiv>
      <LoginDiv>
        <LoginLabel htmlFor="user-password">비밀번호</LoginLabel>
        <LoginInput name="user-password" type="password" required />
      </LoginDiv>
      <LoginButton
        onClick={() => {
          const token = localStorage.getItem("Token");
          axios({
            method: "get",
            url: "http://localhost:8080/user/info",
            headers: { Authorization: "Bearer " + token },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        로그인
      </LoginButton>
      <div>
        <Link href="">
          <a>비밀번호 찾기 </a>
        </Link>
        |
        <Link href="">
          <a> 회원가입</a>
        </Link>
        <a href={test}>카카오 테스트</a>
      </div>
    </LoginForm>
  );
};

export default Login;
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
