package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {
    FeedLike findByFeedLikeId(Long feedLikeId);
}
