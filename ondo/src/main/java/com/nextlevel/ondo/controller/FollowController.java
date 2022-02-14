package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.feed.ModifyFeedDto;
import com.nextlevel.ondo.domain.dto.user.FollowUserDto;
import com.nextlevel.ondo.service.FeedService;
import com.nextlevel.ondo.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{username}")
    public @ResponseBody String follow (@PathVariable String username, @RequestHeader("Authorization") String token) {
        followService.follow(username,token);
        return "ok";
    }

    @DeleteMapping("/{username}")
    public @ResponseBody String unfollow (@PathVariable String username, @RequestHeader("Authorization") String token) {
        followService.unfollow(username,token);
        return "ok";
    }

    @GetMapping("/following/{username}")
    public ResponseEntity<List<FollowUserDto>> listFollowing(@PathVariable String username, @RequestHeader("Authorization") String token) {
        List<FollowUserDto> followUserDtos = followService.listFollowing(username);
        return new ResponseEntity<List<FollowUserDto>>(followUserDtos, HttpStatus.OK);
    }

    @GetMapping("/follower/{username}")
    public ResponseEntity<List<FollowUserDto>> listFollower(@PathVariable String username, @RequestHeader("Authorization") String token) {
        List<FollowUserDto> followUserDtos = followService.listFollower(username);
        return new ResponseEntity<List<FollowUserDto>>(followUserDtos, HttpStatus.OK);
    }




}