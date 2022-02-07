package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.search.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final ChallengeService challengeService;
    private final FeedService feedService;
    private final UserService userService;

    public SearchDto findByKeyword(String keyword) {
        List<Challenge> challenges = challengeService.findChallengeByKeyword(keyword);
        List<Feed> feeds = feedService.findFeedByKeyword(keyword);
        List<User> users = userService.findUserByKeyword(keyword);
        return SearchDto.builder()
                .challenges(challenges)
                .feeds(feeds)
                .users(users)
                .build();
    }
}
