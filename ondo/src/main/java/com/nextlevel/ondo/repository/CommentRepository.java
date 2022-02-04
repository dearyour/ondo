package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByFeed(Feed feed);
}
