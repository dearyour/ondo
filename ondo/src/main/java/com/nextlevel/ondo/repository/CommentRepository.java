package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
