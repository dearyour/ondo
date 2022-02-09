package com.nextlevel.ondo.domain.dto.user;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.comment.ModifyCommentDto;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class FeedUserDto {

    // 유저에 관한 부분
    private User user;
    private Boolean modifyflag;
    private Boolean followflag;

    //팔로우 부분
    List<FollowUserDto> followingUserDtos = new ArrayList<>();
    List<FollowUserDto> followerUserDtos = new ArrayList<>();

    //피드 부분
    List<Feed> myFeed = new ArrayList<>();

    //도전 부분
        //진행중
    List<Challenge> runChallenge = new ArrayList<>();
    List<Challenge> compeleteChallenge = new ArrayList<>();
    List<Challenge> makedChallenge = new ArrayList<>();


    @Builder
    public FeedUserDto(User user, Boolean modifyflag, Boolean followflag,
                       List<FollowUserDto> followingUserDtos, List<FollowUserDto> followerUserDtos,
                       List<Feed> myFeed,
                       List<Challenge> runChallenge, List<Challenge> compeleteChallenge, List<Challenge> makedChallenge) {

        this.user = user;
        this.modifyflag = modifyflag;
        this.followflag = followflag;
        this.followingUserDtos = followingUserDtos;
        this.followerUserDtos = followerUserDtos;
        this.myFeed = myFeed;
        this.runChallenge = runChallenge;
        this.compeleteChallenge = compeleteChallenge;
        this.makedChallenge = makedChallenge;

    }

}
