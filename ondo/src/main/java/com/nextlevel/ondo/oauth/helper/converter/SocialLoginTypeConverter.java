package com.nextlevel.ondo.oauth.helper.converter;

import com.nextlevel.ondo.oauth.helper.constants.SocialLoginType;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

@Configuration
// Controller에서 socialLoginType 파라미터(@PathVariable을 통해)를 받는데
// enum 타입의 대문자 값을 소문자로 mapping 가능하도록
public class SocialLoginTypeConverter implements Converter<String, SocialLoginType> {
    @Override
    public SocialLoginType convert(String s) {
        return SocialLoginType.valueOf(s.toUpperCase());
    }
}