package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.repository.ChallengeRepository;
import com.nextlevel.ondo.repository.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinChallengeDto {
    // 원래는 Token, challengeId 두 개를 받아야 함..
    private Long challengeId;

    public ChallengeParticipate toEntity(User user, Challenge challenge) {
        return ChallengeParticipate.builder()
                .archived(0)
                .user(user)
                .challenge(challenge)
                .build();
    }

}
