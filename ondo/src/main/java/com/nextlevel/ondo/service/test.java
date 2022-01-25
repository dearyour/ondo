package com.nextlevel.ondo.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test/api")
public class test {
    @GetMapping("/hello")
    public String Hello(){
        return "Hello";
    }
}
