package com.nextlevel.ondo.domain.dto.user;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class FollowUserDto {

    private String username;
    private String image;

    @Builder
    public FollowUserDto(String username, String image) {
        this.username = username;
        this.image = image;
    }

}
