package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.FeedLike;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.domain.dto.challenge.SimpleChallengeDto;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.feed.FeedSaveDto;
import com.nextlevel.ondo.domain.dto.feed.MainFeedDto;
import com.nextlevel.ondo.domain.dto.feed.ModifyFeedDto;
import com.nextlevel.ondo.service.FeedService;
import com.nextlevel.ondo.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;
    private final S3Uploader s3Uploader;

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
    public ResponseEntity<Feed> feedModify(@RequestBody ModifyFeedDto modifyFeedDto, @RequestHeader("Authorization") String token) {
        Feed feed = feedService.modifyFeed(modifyFeedDto, token);
        // 토큰에서 온 아이디랑 피드 아이디가 다를 때 (작성자가 아니므로 못고침)
        if (feed == null) {
            return ResponseEntity.status(403).body(null);
        }
        return ResponseEntity.status(201).body(feed);
    }

    @GetMapping("/like/{feed_id}")
    public ResponseEntity<String> likeFeed(@PathVariable("feed_id") long feedId, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<String>(feedService.likeFeed(feedId, token),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{feed_id}")
    public ResponseEntity<String> deleteFeed(@PathVariable("feed_id") long feedId, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<String>(feedService.deleteFeed(feedId, token),HttpStatus.OK);
    }

    @GetMapping("/create")
    public ResponseEntity<List<SimpleChallengeDto>> beforecreateFeed(@RequestHeader("Authorization") String token) {
        return new ResponseEntity<List<SimpleChallengeDto>>(feedService.beforecreateFeed(token),HttpStatus.OK);
    }


    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<Feed> createFeed(
            @RequestPart(value = "file", required = false) MultipartFile multipartFile
            , @RequestPart(value = "data") FeedSaveDto feedSaveDto
            , @RequestHeader("Authorization") String token
    ) throws Exception {
        String image = s3Uploader.upload(multipartFile, "static", "feed");
        return new ResponseEntity<Feed>(feedService.createFeed(image, feedSaveDto, token), HttpStatus.OK);
    }

}