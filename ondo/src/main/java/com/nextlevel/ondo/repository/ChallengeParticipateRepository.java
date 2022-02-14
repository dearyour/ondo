package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeParticipateRepository extends JpaRepository<ChallengeParticipate, Long> {
    ChallengeParticipate findByChallengeAndUser(Challenge challenge, User user);

    List<ChallengeParticipate> findByUser(User user);

    List<ChallengeParticipate> findByChallenge(Challenge challenge);
}
