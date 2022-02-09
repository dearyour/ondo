package com.nextlevel.ondo.domain.dto.user;

import com.nextlevel.ondo.domain.Feed;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyUserDto {
    private Long feedId;
    private String image;
    private String content;

    public Feed toEntity(long challengeId, long userId) {
        return Feed.builder()
                .challengeId(challengeId)
                .image(image)
                .content(content)
                .userId(userId)
                .build();
    }
}