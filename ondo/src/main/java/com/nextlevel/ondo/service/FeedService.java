package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.repository.FeedTagRepository;
import com.nextlevel.ondo.repository.TagRepository;
import com.nextlevel.ondo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedTagRepository feedTagRepository;
    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<Feed> listFeed() {
        List<Feed> list = feedRepository.findAll();
        for(Feed f : list){
            System.out.println(f.getComment());
        }
        return list;
    }
    @Transactional(readOnly = true)
    public List<Feed> findFeedByKeyword(String keyword) {
        List<Feed> feedList = new ArrayList<>(); // Feed 담을 그릇
        List<Long> feedIdList; // feedId 담을 그릇.
        List<Long> tagIdList; // tagId 담을 그릇.
        // 1. 태그 테이블에서 태그명으로 태그 id 찾기.
        tagIdList = tagRepository.selectByKeyword(keyword);
        // 2. feedtag 테이블에서 태그 id랑 매치된 피드 id 다 가져옴. 여기서 중복이 발생할 수 있는데, distinct로 중복 제거.

        // 3. 피드id 리스트를 for문 돌려서 Feed를 담음. 그리고 리턴
        return null;
    }
}