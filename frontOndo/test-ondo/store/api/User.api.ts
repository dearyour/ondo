import axios from "axios";


const Loginurl = 'http://localhost:8080/auth/kakao/callback'
const ProfileEditurl = 'http://localhost:8080/user/modify/'
const GetUserurl = 'http://localhost:8080/user/'


export const test = 'https://kauth.kakao.com/oauth/authorize?client_id=44dad20dedd901c8ca6eb5d6fde58baa&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code'
//response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}'
// 카카오 로그인
export const KakaoLogin = (code: string | null) => {
  return axios({
    method: 'GET',
    url: Loginurl,
    params: {
      code: code,
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((err) => {
    return err
  })
}

// 개인정보 수정
export const ProfileEdit = (nickname: string) => {
  return axios({
    method: 'POST',
    url: ProfileEditurl,
    headers: {
      // 토큰
    },
    data: {
      nickname: nickname,
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((err) => {
    return err
  })
}

export const GetUserState = (token:string | null) => {
  return axios({
    method: 'GET',
    url:GetUserurl,
    params: {
      token: token
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    return err
  })
}