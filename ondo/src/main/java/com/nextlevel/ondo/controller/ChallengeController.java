package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ResponseEntity<Challenge> createChallenge(@RequestBody ChallengeSaveDto challengeSaveDto) {
        System.out.println(challengeSaveDto.getTitle());
        System.out.println(challengeSaveDto.getContent());
        System.out.println(challengeSaveDto.getCategory());
        System.out.println(challengeSaveDto.getOwner());
        System.out.println(challengeSaveDto.getImage());
        System.out.println(challengeSaveDto.getS_date());
        return new ResponseEntity<Challenge>(challengeService.createChallenge(challengeSaveDto), HttpStatus.OK);
    }
    @GetMapping("/info/{challenge_id}") // 도전 상세보기
    public ResponseEntity<Challenge> challengeDetail(@PathVariable("challenge_id") long challengeId) {
        return new ResponseEntity<Challenge>(challengeService.challengeDetail(challengeId), HttpStatus.OK);
    }
    @PostMapping("/participate") // 여기서 유저 아이디를 프론트로부터 받아야함.
    public ResponseEntity<Challenge> participateChallenge(@RequestBody ChallengeSaveDto challengeSaveDto) {
        return new ResponseEntity<Challenge>(challengeService.createChallenge(challengeSaveDto), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<Challenge>> challengePage() {
        return new ResponseEntity<List<Challenge>>(challengeService.findAllChallenge(), HttpStatus.OK);
    }
    @GetMapping("/{category}") // 카테고리
    public ResponseEntity<List<Challenge>> getChallengeByCategory(@PathVariable("category")Category category) {
        return new ResponseEntity<List<Challenge>>(challengeService.getChallengeByCategory(category), HttpStatus.OK);
    }
}
