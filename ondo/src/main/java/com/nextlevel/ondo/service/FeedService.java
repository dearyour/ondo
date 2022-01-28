package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.Feed;
import com.nextlevel.ondo.domain.RoleType;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    @Transactional(readOnly = true)
    public List<Feed> listFeed() {
        List<Feed> list = feedRepository.findAll();
        return list;
    }

}