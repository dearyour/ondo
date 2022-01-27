package com.nextlevel.ondo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

//        도전 생성	/challenge/create
//        도전 상세보기	/challenge/info/{challange_id}
//        도전 참여하기	/challenge/participate
//        도전 페이지	/challenge
//        카테고리별 도전리스트	/challenge/{category}
@Controller
@RequiredArgsConstructor
@RequestMapping("/challenge")
public class ChallengeController {

    @GetMapping
    public String ChallengePage() {
        return "";
    }

    @PostMapping("/create")
    public String createChallenge(@RequestBody Map<String, Object> requestData) {
        requestData.forEach((key, value) -> {
            System.out.println("key: " + key);
            System.out.println("value: " + value);
        });
        return "";
    }
}
