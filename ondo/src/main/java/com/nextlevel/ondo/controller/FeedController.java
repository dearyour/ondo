package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.feed.MainFeedDto;
import com.nextlevel.ondo.domain.dto.feed.ModifyFeedDto;
import com.nextlevel.ondo.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<MainFeedDto> listFeed(@RequestHeader("Authorization") String token) {
        MainFeedDto mainFeedDto = feedService.returnmain(token);
        return new ResponseEntity<MainFeedDto>(mainFeedDto, HttpStatus.OK);
    }

    @GetMapping("/info/{feed_id}")
    public ResponseEntity<DetailFeedDto> detailFeed(@PathVariable("feed_id") long feedId, @RequestHeader("Authorization") String token) {
        DetailFeedDto detailfeed = feedService.detailFeed(feedId, token);
        return new ResponseEntity<DetailFeedDto>(detailfeed, HttpStatus.OK);
    }

    @PutMapping("/modify")
    public ResponseEntity<Feed> feedModify(@RequestBody ModifyFeedDto modifyFeedDtoDto, @RequestHeader("Authorization") String token) {
        Feed feed = feedService.modifyFeed(modifyFeedDtoDto, token);
        // 토큰에서 온 아이디랑 피드 아이디가 다를 때 (작성자가 아니므로 못고침)
        if (feed == null) {
            return ResponseEntity.status(403).body(null);
        }
        return ResponseEntity.status(201).body(feed);
    }

    /*
    @PostMapping("/create")
    public ResponseEntity<Feed> createChallenge(@RequestBody FeedSaveDto feedSaveDto, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<Feed>(feedService.createFeed(feedSaveDto, token), HttpStatus.OK);
    }
    */
}