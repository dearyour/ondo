import axios from "axios";

const Loginurl = process.env.BACK_EC2 + "/auth/kakao/callback";
// const Loginurl = process.env.NEXT_PUBLIC_BACK_LOCAL + "/auth/kakao/callback";
const ProfileEditurl = process.env.BACK_EC2 + "/user/modify/";
// const ProfileEditurl = process.env.NEXT_PUBLIC_BACK_LOCAL + "/user/modify/";
const GetUserurl = process.env.BACK_EC2 + "/user/info";
// const GetUserurl = process.env.NEXT_PUBLIC_BACK_LOCAL + "/user/info";
const base = process.env.BACK_EC2;
// const base = process.env.NEXT_PUBLIC_BACK_LOCAL;

export const test = process.env.KAKAO_LOGIN;
//response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}'
// 카카오 로그인
export const KakaoLogin = (code: string | null) => {
  return axios({
    method: "GET",
    url: Loginurl,
    params: {
      code: code,
    },
  })
    .then((response) => {
      // console.log(response)
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// 개인정보 수정
export const ProfileEdit = (nickname: string, token: string) => {
  return axios({
    method: "POST",
    url: ProfileEditurl,
    headers: { Authorization: "Bearer " + token },
    data: {
      nickname: nickname,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const GetUserState = (token: string | null) => {
  return axios({
    method: "GET",
    url: GetUserurl,
    // url: local,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserObjapi = (username: any, token: string | null) => {
  return axios({
    method: "GET",
    url: base + "/user/feed/" + username,
    headers: { Authorization: "Bearer " + token },
  })
    .then((result) => {
      // console.log(result.data);
      return result.data;
    })
    .catch((err) => {
      // console.log("#############" + username);
      return err;
    });
};
