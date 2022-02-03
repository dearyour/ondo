package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.domain.dto.comment.CreateCommentDto;
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
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentDto createCommentDto) {
        // feed_id, content, token을 받는다.
        return new ResponseEntity<Comment>(commentService.createComment(createCommentDto), HttpStatus.OK);
    }
}
