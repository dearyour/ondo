package com.nextlevel.ondo.domain.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RankUserDto {

    private String username;
    private String image;

    @Builder
    public RankUserDto(String username, String image) {
        this.username = username;
        this.image = image;
    }

}
