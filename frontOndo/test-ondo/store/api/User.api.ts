import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

const url = 'localhost:8080/auth/kakao/callback'
const rest_api = '44dad20dedd901c8ca6eb5d6fde58baa'
export const test = 'https://kauth.kakao.com/oauth/authorize?client_id=44dad20dedd901c8ca6eb5d6fde58baa&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code'
//response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}'
export const KakaoLogin = (code: string | null) => {
  return axios({
    method: 'get',
    url: url,
    params: {
      code: code
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((err) => {
    return err
  })
}