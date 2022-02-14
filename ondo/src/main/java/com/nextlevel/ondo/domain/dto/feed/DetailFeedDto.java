package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.Tag;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class DetailFeedDto {

    private User user;
    private Feed feed;
    private String title;
    private List<DetailCommentDto> comments;
    private List<Tag> tags;
    private Boolean likeflag;

    @Builder
    public DetailFeedDto(User user, Feed feed, List<DetailCommentDto> comments, List<Tag> tags, Boolean likeflag, String title) {
        this.user = user;
        this.feed = feed;
        this.comments = comments;
        this.tags = tags;
        this.likeflag = likeflag;
        this.title = title;
    }

}
