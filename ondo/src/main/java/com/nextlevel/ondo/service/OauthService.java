package com.nextlevel.ondo.service;

import com.nextlevel.ondo.oauth.helper.constants.SocialLoginType;
import com.nextlevel.ondo.service.social.GoogleOauth;
import com.nextlevel.ondo.service.social.KakaoOauth;
import com.nextlevel.ondo.service.social.NaverOauth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@RequiredArgsConstructor
// 소셜 서비스 타입별로 분기처리하여 getOauthRedirectURL 메소드를 호출
public class OauthService {
    private final GoogleOauth googleOauth;
    private final KakaoOauth kakaoOauth;
    private final NaverOauth naverOauth;
    private final HttpServletResponse response;

    public void request(SocialLoginType socialLoginType) {
        String redirectURL;
        switch (socialLoginType) {
            case GOOGLE: {
                redirectURL = googleOauth.getOauthRedirectURL();
            } break;
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
        try {
            // 로직 구현

            // 어떤 소셜 로그인인지 판단 후 리다이렉트
            response.sendRedirect(redirectURL);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String requestAccessToken(SocialLoginType socialLoginType, String code) {
        switch (socialLoginType) {
            case GOOGLE: {
                return googleOauth.requestAccessToken(code);
            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
    }
}