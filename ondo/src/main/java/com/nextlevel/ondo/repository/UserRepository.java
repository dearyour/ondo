package com.nextlevel.ondo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nextlevel.ondo.domain.User;

// DAO
// 자동으로 bean등록이 된다.
// @Repository // 생략 가능하다.
public interface UserRepository extends JpaRepository<User, Long> {
    // SELECT * FROM user WHERE username = 1?;
    Optional<User> findByUsername(String username);
    Optional<List<User>> findByUsernameContaining(String keyword);

    List<User> findTop5ByOrderByOndoDesc();

    Optional<User> findByEmail(String email);

    User findByUserId(long userId);
    User findUserByEmail(String kakaoEmail);
}