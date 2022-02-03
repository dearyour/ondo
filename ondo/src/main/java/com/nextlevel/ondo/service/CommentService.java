package com.nextlevel.ondo.service;

import com.nextlevel.ondo.controller.UserController;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.CreateCommentDto;
import com.nextlevel.ondo.domain.dto.comment.ModifyCommentDto;
import com.nextlevel.ondo.repository.CommentRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;
    private final KakaoUtil kakaoUtil;

    public Comment createComment(CreateCommentDto createCommentDto, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        if(user == null){
            return null;
        }
        Feed feed = feedRepository.findByFeedId(createCommentDto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("해당 피드가 없습니다. id=" + createCommentDto.getFeedId()));
        Comment comment =  createCommentDto.toEntity(user,feed);
        return commentRepository.save(comment);
    }
    public Comment modifyComment(ModifyCommentDto modifyCommentDto, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        if(user == null){
            return null;
        }
        Comment comment = commentRepository.findByCommentId(modifyCommentDto.getCommentId())
                .orElseThrow(()->new IllegalArgumentException("해당 댓글은 삭제되었습니다." + modifyCommentDto.getCommentId()));
        comment.setContent(modifyCommentDto.getContent());
        return commentRepository.save(comment);
    }
    public Long deleteComment(Long commentId, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        if(user == null){
            return null;
        }
        Long count = commentRepository.deleteByCommentId(commentId)
                .orElseThrow(()->new IllegalArgumentException("이미 삭제된 댓글입니다." + commentId));
        return 1L;
    }
    public List<Comment> getComment(Long feedId){
        List<Comment> comments = commentRepository.findAllByFeedId(feedId)
                .orElseThrow(()->new IllegalArgumentException("ㅗ" + feedId));
        return comments;
    }
}
