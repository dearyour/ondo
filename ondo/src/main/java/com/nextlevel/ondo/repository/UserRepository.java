package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // User 테이블에 필요한 쿼리를 작성.

    // 소셜 로그인 중 중복 email검사하기 위해 작성.
    Optional<User> findByEmail(String email);
}
