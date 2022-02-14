package com.nextlevel.ondo.service;

import com.nextlevel.ondo.controller.UserController;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.comment.CreateCommentDto;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.comment.ModifyCommentDto;
import com.nextlevel.ondo.repository.CommentRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
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
        if (user == null) {
            return null;
        }
        Feed feed = feedRepository.findByFeedId(createCommentDto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("해당 피드가 없습니다. id=" + createCommentDto.getFeedId()));
        Comment comment = createCommentDto.toEntity(user, feed);
        LocalDate now = LocalDate.now();
        System.out.println("현재 시각 : " + now);
        commentRepository.save(comment);
        System.out.println("저장후 Service createComment : " + comment.getCreatedDate());
        return comment;
    }

    public Comment modifyComment(ModifyCommentDto modifyCommentDto, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        if (user == null) {
            return null;
        }
        Comment comment = commentRepository.findByCommentId(modifyCommentDto.getCommentId())
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글은 삭제되었습니다." + modifyCommentDto.getCommentId()));
        comment.setContent(modifyCommentDto.getContent());
        return commentRepository.save(comment);
    }

    @Transactional
    public Long deleteComment(Long commentId, String token) {
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        if (user == null) {
            return null;
        }
        Long count = commentRepository.deleteByCommentId(commentId)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 댓글입니다." + commentId));
        return 1L;
    }

    public List<DetailCommentDto> getComment(Long feedId, String token) {
        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);

        Feed feed = feedRepository.findByFeedId(feedId)
                .orElseThrow(() -> new IllegalArgumentException("해당 피드가 존재하지 않습니다." + feedId));

        List<Comment> comments = commentRepository.findAllByFeed(feed).orElseThrow(() -> new IllegalArgumentException("NO"));
        //을 Dto에 담기(불리안 더 담아서)
        List<DetailCommentDto> detailCommentDtos = new ArrayList<>();

        for (Comment c : comments) {
            if (c.getUser().getUserId() == tokenuser.getUserId()) {
                DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), true);
                detailCommentDtos.add(detailCommentDto);
            } else {
                DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), false);
                detailCommentDtos.add(detailCommentDto);
            }
        }

        return detailCommentDtos;

        /*
        Feed feed = feedRepository.findByFeedId(feedId)
                .orElseThrow(() -> new IllegalArgumentException("해당 피드가 존재하지 않습니다." + feedId));
        List<Comment> comments = commentRepository.findAllByFeed(feed)
                .orElseThrow(() -> new IllegalArgumentException("NO" + feedId));
        return comments;

         */
    }
}
