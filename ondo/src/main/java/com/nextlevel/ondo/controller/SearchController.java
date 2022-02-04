package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.service.ChallengeService;
import com.nextlevel.ondo.service.FeedService;
import com.nextlevel.ondo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {
    private final ChallengeService challengeService;
    private final FeedService feedService;
    private final UserService userService;

    @GetMapping("/challenge/{keyword}")
    public ResponseEntity<List<Challenge>> findChallengeByKeyword(@PathVariable("keyword") String keyword) {
        return new ResponseEntity<List<Challenge>>(challengeService.findChallengeByKeyword(keyword), HttpStatus.OK);
    }
    @GetMapping("/feed/{keyword}")
    public ResponseEntity<List<Feed>> findFeedByKeyword(@PathVariable("keyword") String keyword) {
        return new ResponseEntity<List<Feed>>(feedService.findFeedByKeyword(keyword), HttpStatus.OK);
    }
//    @GetMapping("/user/{keyword}")
//    public ResponseEntity<List<User>> findUserByKeyword(@PathVariable("keyword") String keyword) {
//        return new ResponseEntity<List<User>>(userService.findUserByKeyword(keyword), HttpStatus.OK);
//    }
}
