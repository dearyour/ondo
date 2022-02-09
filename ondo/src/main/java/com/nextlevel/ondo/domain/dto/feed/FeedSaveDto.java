package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Feed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;

@Getter
@Builder
@AllArgsConstructor
public class FeedSaveDto {
    private String content;
    private Long challengeId;
    private ArrayList<String> tags;

    public Feed toEntity(Long userId, String image) {
        return Feed.builder()
                .content(content)
                .challengeId(challengeId)
                .image(image)
                .userId(userId).build();
    }
}
