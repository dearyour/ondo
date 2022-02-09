package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeDetailDto;
import com.nextlevel.ondo.domain.dto.challenge.ChallengePageDto;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.service.ChallengeService;
import com.nextlevel.ondo.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

//        도전 생성	/challenge/create
//        도전 상세보기	/challenge/info/{challange_id}
//        도전 참여하기	/challenge/participate
//        도전 페이지	/challenge
//        카테고리별 도전리스트	/challenge/{category}
@Controller
@RequiredArgsConstructor
@RequestMapping("/challenge")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final S3Uploader s3Uploader;

    @GetMapping("/detail/{challenge_id}") // 챌린지 상세보기
    public ResponseEntity<ChallengeDetailDto> detailChallenge(@PathVariable("challenge_id") Long challengeId, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<ChallengeDetailDto>(challengeService.detailChallenge(challengeId, token), HttpStatus.OK);
    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<Challenge> createChallenge(@RequestPart(value = "file",required = false) MultipartFile multipartFile
            , @RequestPart(value = "data") ChallengeSaveDto challengeSaveDto
            , @RequestHeader("Authorization") String token) throws IOException {
        String image = s3Uploader.upload(multipartFile, "static", "challenge");
        return new ResponseEntity<Challenge>(challengeService.createChallenge(challengeSaveDto, token, image), HttpStatus.OK);
    }

    @GetMapping("/info/{challenge_id}") // 도전 상세보기
    public ResponseEntity<Challenge> challengeDetail(@PathVariable("challenge_id") Long challengeId) {
        return new ResponseEntity<Challenge>(challengeService.challengeDetail(challengeId), HttpStatus.OK);
    }

    @PostMapping("/participate")
    public ResponseEntity<ChallengeParticipate> participateChallenge(@RequestBody JoinChallengeDto joinChallengeDto, @RequestHeader("Authorization") String token) {
        ChallengeParticipate response = challengeService.participateChallenge(joinChallengeDto, token);
        if (response == null) {
            // 이미 참여중.
            return new ResponseEntity<ChallengeParticipate>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ChallengeParticipate>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ChallengePageDto> challengePage() {
        return new ResponseEntity<ChallengePageDto>(challengeService.findAllChallenge(), HttpStatus.OK);
    }

    @GetMapping("/{category}") // 카테고리
    public ResponseEntity<List<Challenge>> getChallengeByCategory(@PathVariable("category") Category category) {
        return new ResponseEntity<List<Challenge>>(challengeService.getChallengeByCategory(category), HttpStatus.OK);
    }
}
