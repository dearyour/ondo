package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class ChallengePageDto {
    private List<Challenge> allChallenges;
    private List<Challenge> top10Challenges;
}
    