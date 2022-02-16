package com.nextlevel.ondo.domain.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RankUserDto {

    private String username;
    private String image;
    private int ondo;
    private String chooseStyle;

    @Builder
    public RankUserDto(String username, String image, int ondo, String chooseStyle) {
        this.username = username;
        this.image = image;
        this.ondo = ondo;
        this.chooseStyle = chooseStyle;
    }

}
