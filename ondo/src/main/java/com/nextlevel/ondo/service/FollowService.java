package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.Follow;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.user.FollowUserDto;
import com.nextlevel.ondo.repository.*;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final KakaoUtil kakaoUtil;



    @Transactional(readOnly = false)
    public void follow(String username, String token) {

        String accessToken = token.split(" ")[1];
        User fromUser = kakaoUtil.getUserByEmail(accessToken);

        Optional<User> otoUser = userRepository.findByUsername(username);
        User toUser = otoUser.get();

        Follow follow = new Follow();
        follow.setFromUser(fromUser);
        follow.setToUser(toUser);

        followRepository.save(follow);

    }

    @Transactional(readOnly = false)
    public void unfollow(String username, String token) {

        String accessToken = token.split(" ")[1];
        User fromUser = kakaoUtil.getUserByEmail(accessToken);

        Optional<User> otoUser = userRepository.findByUsername(username);
        User toUser = otoUser.get();

        followRepository.deleteByFromUserAndToUser(fromUser,toUser);
    }

    @Transactional(readOnly = true)
    public List<FollowUserDto> listFollowing(String username) {

        Optional<User> oUser = userRepository.findByUsername(username);
        User user = oUser.get();

        List<Follow> follows = followRepository.findByFromUser(user);

        List<FollowUserDto> followUserDtos = new ArrayList<>();

        for(Follow f : follows){
            User fuser = f.getToUser();
            FollowUserDto followUserDto = new FollowUserDto(fuser.getUsername(), fuser.getImage());
            followUserDtos.add(followUserDto);
        }

        return followUserDtos;
    }

    @Transactional(readOnly = true)
    public List<FollowUserDto> listFollower(String username) {

        Optional<User> oUser = userRepository.findByUsername(username);
        User user = oUser.get();

        List<Follow> follows = followRepository.findByToUser(user);

        List<FollowUserDto> followUserDtos = new ArrayList<>();

        for(Follow f : follows){
            User fuser = f.getFromUser();
            FollowUserDto followUserDto = new FollowUserDto(fuser.getUsername(), fuser.getImage());
            followUserDtos.add(followUserDto);
        }

        return followUserDtos;
    }


}