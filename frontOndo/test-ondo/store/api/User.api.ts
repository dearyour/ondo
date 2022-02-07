import axios from "axios";


const Loginurl = process.env.BACK_EC2 + '/auth/kakao/callback'
const ProfileEditurl = process.env.BACK_EC2 + '/user/modify/'
const GetUserurl = process.env.BACK_EC2 + '/user/info'


export const test = process.env.KAKAO_LOGIN
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
export const ProfileEdit = (nickname: string, token: string) => {
  return axios({
    method: 'POST',
    url: ProfileEditurl,
    headers: { Authorization: "Bearer " + token },
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

export const GetUserState = (token:string) => {
  return axios({
    method: 'GET',
    url:GetUserurl,
    headers: { Authorization: "Bearer " + token },
  })
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    return err
  })
}