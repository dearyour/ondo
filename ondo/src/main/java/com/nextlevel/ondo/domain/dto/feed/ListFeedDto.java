package com.nextlevel.ondo.domain.dto.feed;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.user.FeedUserDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
//mainpage dto
@Getter
public class ListFeedDto {
    //피드에 대한정보
    private FeedUserDto user;
    private Feed feed;
    private List<DetailCommentDto> comments;
    private Boolean likeflag;
    //유저 랭킹에 대한 정보
    private List<FeedUserDto> rankusers;

    @Builder
    public ListFeedDto(FeedUserDto user,Feed feed, List<DetailCommentDto> comments, Boolean likeflag, List<FeedUserDto> rankusers) {
        this.user = user;
        this.feed = feed;
        this.comments = comments;
        this.likeflag = likeflag;
        this.rankusers = rankusers;
    }

}
