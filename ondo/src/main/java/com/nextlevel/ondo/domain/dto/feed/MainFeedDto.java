package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.user.RankUserDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MainFeedDto {

    private User user;
    private Feed feed;
    private List<DetailCommentDto> comments;
    private Boolean likeflag;
    private List<RankUserDto> rankusers;

    @Builder
    public MainFeedDto(User user, Feed feed, List<DetailCommentDto> comments, Boolean likeflag, List<RankUserDto> rankusers) {
        this.user = user;
        this.feed = feed;
        this.comments = comments;
        this.likeflag = likeflag;
        this.rankusers = rankusers;
    }

}
