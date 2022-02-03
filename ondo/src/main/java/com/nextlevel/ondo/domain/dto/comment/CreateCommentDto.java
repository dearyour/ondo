package com.nextlevel.ondo.domain.dto.comment;

import com.nextlevel.ondo.domain.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateCommentDto {
    private Long feedId;
    private String content;

    public Comment toEntity(User user, Feed feed) {
        return Comment.builder()
                .user(user)
                .feed(feed)
                .content(content)
                .build();
    }
}