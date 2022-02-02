package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/feed")
    public ResponseEntity<List<Feed>> listFeed() {
        List<Feed> feeds = feedService.listFeed();
        return new ResponseEntity<List<Feed>>(feeds, HttpStatus.OK);
    }


}