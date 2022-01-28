package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    List<Challenge> findAllByCategory(Category category);
    Challenge findByChallengeId(long challengeId);
    List<Challenge> findByCategory(Category category);
}
