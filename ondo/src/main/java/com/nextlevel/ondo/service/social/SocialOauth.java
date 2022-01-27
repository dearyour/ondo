package com.nextlevel.ondo.service.social;

public interface SocialOauth {
    String getOauthRedirectURL();


    /**
     * API Server로부터 받은 code를 활용하여 사용자 인증 정보 요청
     * @param code API Server 에서 받아온 code
     * @return API 서버로 부터 응답받은 Json 형태의 결과를 string으로 반영
     */
    String requestAccessToken(String code);
}
