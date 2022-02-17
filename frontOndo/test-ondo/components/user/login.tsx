import React from "react";
import { test } from "../../store/api/User.api";
import Image from "next/image";
import kakao_login_medium_narrow from 'public/images/kakao_login_medium_narrow.png';


const Login = () => {
  return (
    <a href={test}>
      <Image src={kakao_login_medium_narrow}></Image>
    </a>
  );
};

export default Login;
