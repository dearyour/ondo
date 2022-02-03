package com.nextlevel.ondo.domain.dto.comment;

import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyCommentDto {
    private Long commentId;
    private String content;

    public Comment toEntity(User user, Feed feed) {
        return Comment.builder()
                .user(user)
                .feed(feed)
                .content(content)
                .build();
    }
}