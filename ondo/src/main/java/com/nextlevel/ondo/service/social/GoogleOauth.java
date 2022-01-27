package com.nextlevel.ondo.service.social;

import org.springframework.stereotype.Component;

@Component
public class GoogleOauth implements SocialOauth{
    @Override
    // 세션에 구글 계정이 로그인되어있는가 및 구글 로그인을 할 수 있는 페이지로 이동
    public String getOauthRedirectURL() {
        return "http://localhost:3000";
    }

    @Override
    public String requestAccessToken(String code) {
        System.out.println(code);
        return null;
    }
}
