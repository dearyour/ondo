package com.nextlevel.ondo.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

//사용자 권한 관리
@Getter
@RequiredArgsConstructor
public enum Role {
    // 스프링 시큐리티에선 항상 ROLE_이 앞에 붙어야 함.
    GUEST("ROLE_GUEST","손님"),
    USER("ROLE_USER", "일반 사용자"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}
