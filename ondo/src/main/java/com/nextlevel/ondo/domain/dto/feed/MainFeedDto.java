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

    private List<DetailFeedDto> detailFeedDtos;
    private List<RankUserDto> rankusers;

    @Builder
    public MainFeedDto(List<DetailFeedDto> detailFeedDtos,List<RankUserDto> rankusers) {
        this.detailFeedDtos = detailFeedDtos;
        this.rankusers = rankusers;
    }

}
