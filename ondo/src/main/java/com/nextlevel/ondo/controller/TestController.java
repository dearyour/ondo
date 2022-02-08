package com.nextlevel.ondo.controller;

import com.nextlevel.ondo.domain.dto.feed.FeedSaveDto;
import com.nextlevel.ondo.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final S3Uploader s3Uploader;
    @PostMapping("/images")
    public String upload(@RequestParam("images") MultipartFile multipartFile
    ,@RequestParam String content
    ,@RequestParam String[] tags
    ,@RequestParam Long challengeId) throws IOException {
        System.out.println(multipartFile);
        s3Uploader.upload(multipartFile, "static","challenge");
        return "test";
    }
}
