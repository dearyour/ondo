package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.search.SearchDto;
import com.nextlevel.ondo.service.ChallengeService;
import com.nextlevel.ondo.service.FeedService;
import com.nextlevel.ondo.service.SearchService;
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
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/{keyword}")
    public ResponseEntity<SearchDto> findByKeyword(@PathVariable("keyword") String keyword) {
        return new ResponseEntity<SearchDto>(searchService.findByKeyword(keyword), HttpStatus.OK);
    }
}
