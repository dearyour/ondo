package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyFeedDto {
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