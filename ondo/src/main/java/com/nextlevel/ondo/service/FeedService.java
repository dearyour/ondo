package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.feed.ModifyFeedDto;
import com.nextlevel.ondo.repository.CommentRepository;
import com.nextlevel.ondo.repository.FeedLikeRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.repository.FeedTagRepository;
import com.nextlevel.ondo.repository.TagRepository;
import com.nextlevel.ondo.repository.UserRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.List;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final KakaoUtil kakaoUtil;
    private final FeedTagRepository feedTagRepository;
    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<DetailFeedDto> listFeed(String token) {
        //토큰 유저 (로그인 한 유저)
        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);

        List<Feed> list = feedRepository.findAll();
        List<DetailFeedDto> detailFeedDtos = new ArrayList<>();

        for(Feed f : list){

            //피드 작성 유저
            User user = userRepository.findByUserId(f.getUserId());

            //해당피드에 달린 코멘트들

            List<Comment> comments = commentRepository.findAllByFeed(f).orElseThrow(() -> new IllegalArgumentException("NO"));
            //을 Dto에 담기(불리안 더 담아서)
            List<DetailCommentDto> detailCommentDtos = new ArrayList<>();

            for(Comment c : comments){
                if(c.getUser().getUserId() == tokenuser.getUserId()){
                    DetailCommentDto detailCommentDto = new DetailCommentDto(c,true);
                    detailCommentDtos.add(detailCommentDto);
                } else {
                    DetailCommentDto detailCommentDto = new DetailCommentDto(c,false);
                    detailCommentDtos.add(detailCommentDto);
                }
            }
            Boolean flag = false;
            // 토큰에 있는 유저 아이디가 좋아요 목록에 있는 유저 아이디에 존재하면 true;
            if(f.getFeedlike().contains(tokenuser)) flag = true;

            DetailFeedDto detailFeedDto = new DetailFeedDto(user,f,detailCommentDtos,flag);
            detailFeedDtos.add(detailFeedDto);
        }
        return detailFeedDtos;
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
    @Transactional(readOnly = true)
    public Feed feedDetail(long feedId) {
        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(()->{
            return new Feed();
        });
        return feed;
    }

    public Feed modifyFeed(ModifyFeedDto modifyFeedDto, String token) {
        // feed_id, user_id 필요

        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);

        Feed feed = feedRepository.findByFeedId(modifyFeedDto.getFeedId()).orElseGet(()->{
            System.out.println("***test***");
            return new Feed();
        });
        System.out.println(feed.getFeedId());

        // token 의 유저아이디와 feed 작성자 아이디가 동일하면 진행 아니면 에러
        if(feed.getUserId() !=user.getUserId()){
            return null;
        }

        feed.setImage(modifyFeedDto.getImage());
        feed.setContent(modifyFeedDto.getContent());

        return feedRepository.save(feed);
    }

    public DetailFeedDto detailFeed(long feedId, String token) {
        //해당 피드
        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(()->{
            return new Feed();
        });
        //피드 작성 유저
        User user = userRepository.findByUserId(feed.getUserId());


        //토큰 유저 (로그인 한 유저)
        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);


        //해당피드에 달린 코멘트들

        List<Comment> comments = commentRepository.findAllByFeed(feed).orElseThrow(() -> new IllegalArgumentException("NO"));
        //을 Dto에 담기(불리안 더 담아서)
        List<DetailCommentDto> detailCommentDtos = new ArrayList<>();

        for(Comment c : comments){
            if(c.getUser().getUserId() == tokenuser.getUserId()){
                DetailCommentDto detailCommentDto = new DetailCommentDto(c,true);
                detailCommentDtos.add(detailCommentDto);
            } else {
                DetailCommentDto detailCommentDto = new DetailCommentDto(c,false);
                detailCommentDtos.add(detailCommentDto);
            }
        }

        Boolean flag = false;
        // 토큰에 있는 유저 아이디가 좋아요 목록에 있는 유저 아이디에 존재하면 true;
        if(feed.getFeedlike().contains(tokenuser)) flag = true;


        DetailFeedDto detailFeedDto = new DetailFeedDto(user,feed,detailCommentDtos,flag);

        return detailFeedDto;
    }
}