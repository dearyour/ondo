package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.domain.dto.comment.CreateCommentDto;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.comment.ModifyCommentDto;
import com.nextlevel.ondo.service.ChallengeService;
import com.nextlevel.ondo.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentDto createCommentDto,@RequestHeader("Authorization") String token) {
        // feed_id, content, token을 받는다.
        Comment response = commentService.createComment(createCommentDto, token);
        if (response == null) {
            return new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Comment>(response, HttpStatus.OK);
    }
    @PutMapping("/modify")
    public ResponseEntity<Comment> modifyComment(@RequestBody ModifyCommentDto modifyCommentDto,
                                                 @RequestHeader("Authorization") String token){
        Comment response = commentService.modifyComment(modifyCommentDto, token);
        if (response == null) {
            return new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Comment>(response, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{comment_id}")
    public ResponseEntity<Long> deleteComment(@PathVariable("comment_id") Long commentId,
                                                 @RequestHeader("Authorization") String token) {
        return new ResponseEntity<Long>(commentService.deleteComment(commentId,token), HttpStatus.OK);
    }
    @GetMapping("/{feed_id}")
    public ResponseEntity<List<DetailCommentDto>> getComment(@PathVariable("feed_id") Long feedId, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<List<DetailCommentDto>>(commentService.getComment(feedId, token), HttpStatus.OK);
    }

}
