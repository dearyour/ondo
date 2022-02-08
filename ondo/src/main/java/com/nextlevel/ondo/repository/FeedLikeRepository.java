package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {
    FeedLike findByFeedLikeId(Long feedLikeId);

    List<FeedLike> findByFeed(Feed feed);

}
