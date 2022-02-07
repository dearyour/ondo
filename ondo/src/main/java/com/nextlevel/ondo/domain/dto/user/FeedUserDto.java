package com.nextlevel.ondo.domain.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FeedUserDto {

    private String username;
    private String image;

    @Builder
    public FeedUserDto(String username, String image) {
        this.username = username;
        this.image = image;
    }

}
