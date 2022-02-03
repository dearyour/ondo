package com.nextlevel.ondo.service;

import com.nextlevel.ondo.controller.UserController;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.CreateCommentDto;
import com.nextlevel.ondo.repository.CommentRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;
    private final KakaoUtil kakaoUtil;

    public Comment createComment(CreateCommentDto createCommentDto, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        Feed feed = feedRepository.findByFeedId(createCommentDto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("해당 피드가 없습니다. id=" + createCommentDto.getFeedId()));
        Comment comment =  createCommentDto.toEntity(user,feed);
        return commentRepository.save(comment);
    }
}
