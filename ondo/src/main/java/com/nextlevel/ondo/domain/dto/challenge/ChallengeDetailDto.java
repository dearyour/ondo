package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.Feed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ChallengeDetailDto {
    // 해당 DTO는 챌린지, 여부 등을 담는 객체.
    private boolean isFinished; // 끝난 챌린지인지 여부
    private boolean amIParticipate; // 내가 참여 중인지 여부
    private boolean isStarted;
    private Challenge challenge;
    private List<Feed> feeds; // 해당 챌린지 관련 피드 리스트
    private String username;
    private String image;
    private String style;

}
