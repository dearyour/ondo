package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class SimpleChallengeDto {

    private Long challengeId;
    private String title;
    @Builder
    public SimpleChallengeDto(Long challengeId, String title) {
        this.challengeId = challengeId;
        this.title = title;
    }
}