package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.FeedLike;
import com.nextlevel.ondo.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LikeFeedDto {
    private Long feedLikeId;

    public FeedLike toEntity(User user, Feed feed) {
        return FeedLike.builder()
                .user(user)
                .feed(feed)
                .build();
    }
}