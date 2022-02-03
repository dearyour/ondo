package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.repository.ChallengeParticipateRepository;
import com.nextlevel.ondo.repository.ChallengeRepository;
import com.nextlevel.ondo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final ChallengeParticipateRepository challengeParticipateRepository;

    public Challenge createChallenge(ChallengeSaveDto challengeSaveDto) {
        System.out.println(challengeRepository);
        Challenge newChallenge = challengeSaveDto.toEntity();
        Challenge challenge = challengeRepository.save(newChallenge);
        // Exception Handler


        // Exception Handler end
        return challenge;
    }

    public ChallengeParticipate participateChallenge(JoinChallengeDto joinChallengeDto) {
        // DTO 하나 만들어서 .Entity() 사용 후 테이블에 저장.
        // Exception Handler
        User user = userRepository.findById(joinChallengeDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + joinChallengeDto.getUserId()));
        Challenge challenge = challengeRepository.findById(joinChallengeDto.getChallengeId())
                .orElseThrow(() -> new IllegalArgumentException("해당 챌린지가 없습니다. id=" + joinChallengeDto.getChallengeId()));
        ChallengeParticipate challengeParticipate =  joinChallengeDto.toEntity(user,challenge);
        if(challengeParticipateRepository.findByChallengeAndUser(challenge, user) != null){
            // 이미 참가 중이거나 챌린지가 종료 되었을 경우.
            return null;
        }

        return challengeParticipateRepository.save(challengeParticipate);
    }

    @Transactional(readOnly = true)
    public List<Challenge> findAllChallenge() {
        return challengeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Challenge challengeDetail(long challengeId) {
        return challengeRepository.findByChallengeId(challengeId);
    }

    @Transactional(readOnly = true)
    public List<Challenge> getChallengeByCategory(Category category) {
        return challengeRepository.findByCategory(category);
    }

}
