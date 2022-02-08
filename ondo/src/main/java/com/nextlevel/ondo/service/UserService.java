package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.user.FeedUserDto;
import com.nextlevel.ondo.domain.dto.user.FollowUserDto;
import com.nextlevel.ondo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nextlevel.ondo.util.KakaoUtil;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class UserService {


    private final FollowService followService;
    private final ChallengeService challengeService;

    private final KakaoUtil kakaoUtil;
    private final BCryptPasswordEncoder encoder;

    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final ChallengeParticipateRepository challengeParticipateRepository;
    private final FollowRepository followRepository;
    private final ChallengeRepository challengeRepository;

    @Transactional(readOnly = true)
    public List<User> rankUser() {
        List<User> list = userRepository.findTop5ByOrderByOndoDesc();
        // List<User> list = userRepository.findAll();
        return list;
    }

    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            return new User();
        });
        return user;
    }

    @Transactional(readOnly = true)
    public List<User> findUserByKeyword(String keyword) {
        return userRepository.findByUsernameContaining(keyword).orElseThrow(
                () -> new IllegalArgumentException("올바른 유저명이 아니다."));
    }

    @Transactional(readOnly = true)
    public User findUser(String email) {
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            return new User();
        });

        return user;

    }

    public int signUp(User user) {
        String rawPassword = user.getPassword(); // 1234 원문
        String encPassword = encoder.encode(rawPassword); // 해쉬
        user.setPassword(encPassword);
        user.setRole(RoleType.USER);
        try {
            user.setOndo(36);
            userRepository.save(user);
            return 1;
        } catch (Exception e) {
            return -1;
        }

    }

    public FeedUserDto feedUser(String username, String accessToken) {

        String token = accessToken.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(token);

    //        User user;
        User user = userRepository.findByUsername(username).orElseGet(() -> {
            return new User();
        });

    //        Boolean modifyflag;
        Boolean modifyflag = true;
        if(user.getUserId() == tokenuser.getUserId()) modifyflag = false;

    //        Boolean followflag;
        Boolean followflag = true;
        List<Follow> fList = followRepository.findByFromUser(tokenuser);
        if(user.getUserId() == tokenuser.getUserId()) followflag = false;
        else{
            for(Follow f : fList){
                if(f.getToUser().getUserId() == user.getUserId()){
                    followflag = false;
                    break;
                }
            }
        }
            //팔로우 부분
    //        List<FollowUserDto> followingUserDtos = new ArrayList<>();

        //List<Follow> follows = followRepository.findByFromUser(user);

        List<FollowUserDto> followingUserDtos = followService.listFollowing(username);


    //        List<FollowUserDto> followerUserDtos = new ArrayList<>();
        List<FollowUserDto> followerUserDtos = followService.listFollower(username);



            //피드 부분
    //        List<DetailFeedDto> myFeedDtos = new ArrayList<>();
        List<Feed> myFeed = feedRepository.findByUserId(user.getUserId());
            //도전 부분
        List<ChallengeParticipate> challengeParticipates = challengeParticipateRepository.findByUser(user);
        List<Challenge> challenges = new ArrayList<>();
        for(ChallengeParticipate c : challengeParticipates){
            challenges.add(c.getChallenge());
        }
    //        List<Challenge> runChallenge = new ArrayList<>();
        List<Challenge> runChallenge = new ArrayList<>();
        for(Challenge c : challenges){
            if(challengeService.isProcessingChallenge(c)){
                runChallenge.add(c);
            }
        }
    //        List<Challenge> compeleteChallenge = new ArrayList<>();
        List<Challenge> compeleteChallenge = new ArrayList<>();
        tp: for(Challenge c : challenges){
            if(!challengeService.isProcessingChallenge(c) ){
                ChallengeParticipate cp = challengeParticipateRepository.findByChallenge(c);
                Boolean[] archived = cp.getArchived();
                for(Boolean b : archived){
                    if(b == false){
                        continue tp;
                    }
                }
                compeleteChallenge.add(c);
            }
        }
    //        List<Challenge> makedChallenge = new ArrayList<>();
        List<Challenge> makedChallenge = challengeRepository.findByOwner(user.getUserId());

        return new FeedUserDto(user,modifyflag,followflag,followingUserDtos,followerUserDtos,myFeed,runChallenge,compeleteChallenge,makedChallenge);

    }


}