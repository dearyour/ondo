package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// DAO
// 자동으로 bean등록이 된다.
// @Repository // 생략 가능하다.
public interface FeedRepository extends JpaRepository<Feed, Integer> {
}