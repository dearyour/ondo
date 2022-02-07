package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.FeedTag;
import com.nextlevel.ondo.domain.Follow;
import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

// DAO
// 자동으로 bean등록이 된다.
// @Repository // 생략 가능하다.
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Transactional
    int deleteByFromUserAndToUser(User fromUser, User toUser);

    List<Follow> findByFromUser(User user);

    List<Follow> findByToUser(User user);
}