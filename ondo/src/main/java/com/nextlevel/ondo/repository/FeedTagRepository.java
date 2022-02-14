package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.FeedTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

// DAO
// 자동으로 bean등록이 된다.
// @Repository // 생략 가능하다.
public interface FeedTagRepository extends JpaRepository<FeedTag, Long> {
    List<FeedTag> findByFeed(Feed f);

//    Optional<List<FeedTag>> findByFeedId(String keyword);
//    List<FeedTag> DistinctFindByTagId(Long tagId);

}