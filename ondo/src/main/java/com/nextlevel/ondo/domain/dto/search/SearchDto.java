package com.nextlevel.ondo.domain.dto.search;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class SearchDto {
    private List<Challenge> challenges;
    private List<Feed> feeds;
    private List<User> users;
}
