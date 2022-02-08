package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// DAO
// 자동으로 bean등록이 된다.
// @Repository // 생략 가능하다.
public interface FeedRepository extends JpaRepository<Feed, Long> {
    Optional<Feed> findByFeedId(Long feedId);
    List<Feed> findAll();
    List<Feed> findAllByChallengeId(Long challengeId);
    List<Feed> findByUserId(Long userId);
}