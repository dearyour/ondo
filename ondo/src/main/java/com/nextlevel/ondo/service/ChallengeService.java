package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    public Challenge createChallenge(ChallengeSaveDto challengeSaveDto){
        Challenge newChallenge = challengeSaveDto.toEntity();
        Challenge challenge = challengeRepository.save(newChallenge);
        // Exception Handler


        // Exception Handler end
        return challenge;
    }
    @Transactional(readOnly = true)
    public List<Challenge> findAllChallenge(){
        return challengeRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Challenge challengeDetail(long challengeId){
        return challengeRepository.findByChallengeId(challengeId);
    }
    @Transactional(readOnly = true)
    public List<Challenge> getChallengeByCategory(Category category){
        return challengeRepository.findByCategory(category);
    }

}
