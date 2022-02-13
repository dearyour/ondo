package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.domain.dto.challenge.SimpleChallengeDto;
import com.nextlevel.ondo.domain.dto.comment.DetailCommentDto;
import com.nextlevel.ondo.domain.dto.feed.DetailFeedDto;
import com.nextlevel.ondo.domain.dto.feed.FeedSaveDto;
import com.nextlevel.ondo.domain.dto.feed.MainFeedDto;
import com.nextlevel.ondo.domain.dto.feed.ModifyFeedDto;
import com.nextlevel.ondo.domain.dto.user.FollowUserDto;
import com.nextlevel.ondo.repository.*;
import com.nextlevel.ondo.domain.dto.user.RankUserDto;
import com.nextlevel.ondo.repository.CommentRepository;
import com.nextlevel.ondo.repository.FeedLikeRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.repository.FeedTagRepository;
import com.nextlevel.ondo.repository.TagRepository;
import com.nextlevel.ondo.repository.UserRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

// 스프링이 컴포넌트  스캔 을  통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final ChallengeParticipateRepository challengeParticipateRepository;
    private final KakaoUtil kakaoUtil;
    private final TagRepository tagRepository;
    private final FeedTagRepository feedTagRepository;

    private final ChallengeService challengeService;

    @Transactional(readOnly = true)
    public MainFeedDto returnmain(String token) {
        //토큰 유저 (로그인 한 유저)
        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);

        List<Feed> list = feedRepository.findAll();
        List<DetailFeedDto> detailFeedDtos = new ArrayList<>();

        for (Feed f : list) {

            //피드 작성 유저
            User user = userRepository.findByUserId(f.getUserId());

            //해당피드에 달린 코멘트들

            List<Comment> comments = commentRepository.findAllByFeed(f).orElseThrow(() -> new IllegalArgumentException("NO"));
            //을 Dto에 담기(불리안 더 담아서)
            List<DetailCommentDto> detailCommentDtos = new ArrayList<>();

            for (Comment c : comments) {
                if (c.getUser().getUserId() == tokenuser.getUserId()) {
                    DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), false);
                    detailCommentDtos.add(detailCommentDto);
                } else {
                    DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), true); //토큰아이디랑 작성아이디 다르면 활성화 true
                    detailCommentDtos.add(detailCommentDto);
                }
            }
            Boolean flag = true;
            // 토큰에 있는 유저 아이디가 좋아요 목록에 있는 유저 아이디에 존재하면 false;
            if (f.getFeedlike().contains(tokenuser)) flag = false;


            DetailFeedDto detailFeedDto = new DetailFeedDto(user, f, detailCommentDtos, flag);
            detailFeedDtos.add(detailFeedDto);
        }

        List<User> ulist = userRepository.findTop5ByOrderByOndoDesc();
        List<RankUserDto> rankUserDtos = new ArrayList<>();
        for (User u : ulist) {
            rankUserDtos.add(new RankUserDto(u.getUsername(), u.getImage(), u.getOndo()));
        }

        MainFeedDto mainFeedDto = new MainFeedDto(detailFeedDtos, rankUserDtos);

        return mainFeedDto;
    }

    @Transactional(readOnly = true)
    public List<Feed> findFeedByKeyword(String keyword) {
        List<Feed> feedList; // Feed 담을 그릇
        List<FeedTag> feedIdList; // FeedTag 담을 그릇.
        List<Tag> tagIdList; // tagId 담을 그릇.
        // 1. 태그 테이블에서 태그명으로 태그 id 찾기.
        tagIdList = tagRepository.findByNameContaining(keyword);
        List<Feed> temp = new ArrayList<>();
        for (Tag t : tagIdList) {
            for (FeedTag ft : t.getFeedTag()) {
                temp.add(ft.getFeed());
            }
        }
        feedList = temp.stream().distinct().collect(Collectors.toList());
//        // 2. feedtag 테이블에서 태그 id랑 매치된 레코드 다 가져옴. 여기서 중복이 발생할 수 있는데, distinct로 중복 제거.
//        // 여기서 성능 이슈가 발생할 수 있음.
//        List<FeedTag> temp = new ArrayList<>();
//        for (Long tagId : tagIdList) {
//            temp.addAll(feedTagRepository.DistinctFindByTagId(tagId));
//        }
//        feedIdList = temp.stream().distinct().collect(Collectors.toList());
//        // 3. FeedTag 리스트를 for문 돌려서 feedId 뽑아 Feed를 추출해 담음. 그리고 리턴
//        for (FeedTag feedTag : feedIdList) {
//            Long feedId = feedTag.getFeed().getFeedId();
//            feedList.add(feedRepository.findByFeedId(feedId).orElseThrow(
//                    () -> new IllegalArgumentException("IllegalArgumentException")));
//        }
        return feedList;
    }

    @Transactional(readOnly = true)
    public Feed feedDetail(long feedId) {
        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(() -> {
            return new Feed();
        });
        return feed;
    }

    public Feed modifyFeed(ModifyFeedDto modifyFeedDto, String token) {
        // feed_id, user_id 필요

        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);

        Feed feed = feedRepository.findByFeedId(modifyFeedDto.getFeedId()).orElseGet(() -> {
            System.out.println("***test***");
            return new Feed();
        });
        System.out.println(feed.getFeedId());

        // token 의 유저아이디와 feed 작성자 아이디가 동일하면 진행 아니면 에러
        if (feed.getUserId() != user.getUserId()) {
            return null;
        }

        feed.setImage(modifyFeedDto.getImage());
        feed.setContent(modifyFeedDto.getContent());

        return feedRepository.save(feed);
    }

    public DetailFeedDto detailFeed(long feedId, String token) {
        //해당 피드
        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(() -> {
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

        for (Comment c : comments) {
            if (c.getUser().getUserId() == tokenuser.getUserId()) {
                DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), true);
                detailCommentDtos.add(detailCommentDto);
            } else {
                DetailCommentDto detailCommentDto = new DetailCommentDto(c, c.getUser().getUsername(), c.getUser().getImage(), false);
                detailCommentDtos.add(detailCommentDto);
            }
        }

        Boolean flag = false;
        // 토큰에 있는 유저 아이디가 좋아요 목록에 있는 유저 아이디에 존재하면 true;
        if (feed.getFeedlike().contains(tokenuser)) flag = true;


        DetailFeedDto detailFeedDto = new DetailFeedDto(user, feed, detailCommentDtos, flag);

        return detailFeedDto;
    }

    public Feed createFeed(String image, FeedSaveDto feedSaveDto, String token) {

        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);

        Feed newFeed = feedSaveDto.toEntity(user.getUserId(), image);
        Feed feed = feedRepository.save(newFeed);

        // 태그 등록 (이미 디비에 같은 이름 저장되어있으면 x)
        ArrayList<String> tags = feedSaveDto.getTags();
        for (String s : tags) {
            if (tagRepository.findByName(s) != null) {
                //연결
                Tag tag = new Tag(s);
                feedTagRepository.save(new FeedTag(feed, tag));
            } else {
                Tag tag = tagRepository.save(new Tag(s));
                //연결
                feedTagRepository.save(new FeedTag(feed, tag));
            }
        }


        //로직 구현
        Challenge challenge = challengeRepository.findByChallengeId(feedSaveDto.getChallengeId());
        ChallengeParticipate challengeParticipate = challengeParticipateRepository.findByChallengeAndUser(challenge, user);
        System.out.println("확인용");
        System.out.println(challengeParticipate);
        // 현재 날짜 구하기
        LocalDate now = LocalDate.now();
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷 적용
        String formatedNow = now.format(formatter);

        // 날짜 차이 계산
        int dif = Integer.parseInt(formatedNow) - Integer.parseInt(challenge.getSDate());
        if (dif < 0) {
            System.out.println("아직 시작 안함.");
        }

        int archived = challengeParticipate.getArchived();
        archived = archived | (1 << dif);
        challengeParticipate.setArchived(archived);


        //3개 다 true면 위에 코드 통과해서 여기로 오고, 온도 1도 오르기
        if (archived == 7) {
            user.setOndo(user.getOndo() + 1);
        }
        userRepository.save(user);

        System.out.println("피드 생성 완료");
        return feed;
    }

    public String AddDate(String strDate, int year, int month, int day) throws Exception {
        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyyMMdd");
        Calendar cal = Calendar.getInstance();
        Date dt = dtFormat.parse(strDate);
        cal.setTime(dt);
        cal.add(Calendar.YEAR, year);
        cal.add(Calendar.MONTH, month);
        cal.add(Calendar.DATE, day);
        return dtFormat.format(cal.getTime());
    }

    public String likeFeed(long feedId, String token) {

        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);

        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(() -> {
            return new Feed();
        });
        List<FeedLike> FL = feedLikeRepository.findByFeed(feed);
        // 리스트 돌다가 목록에 있으면 ( 이미 눌렀으니 해제)
        for (FeedLike f : FL) {
            if (f.getUser() == tokenuser) {
                feedLikeRepository.delete(f);
                return "delete";
            }
        }
        // 없으면 반복문 나와서
        FeedLike feedLike = new FeedLike(tokenuser, feed);
        feedLikeRepository.save(feedLike);
        return "ok";

    }

    public String deleteFeed(long feedId, String token) {

        String accessToken = token.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(accessToken);

        Feed feed = feedRepository.findByFeedId(feedId).orElseGet(() -> {
            return new Feed();
        });

        if (tokenuser.getUserId() != feed.getUserId()) return "no permission";

        feedRepository.delete(feed);
        return "delete complete";
    }

    public List<SimpleChallengeDto> beforecreateFeed(String accessToken) {

        List<SimpleChallengeDto> simpleChallengeDtos = new ArrayList<>();

        String token = accessToken.split(" ")[1];
        User tokenuser = kakaoUtil.getUserByEmail(token);

        List<ChallengeParticipate> challengeParticipates = challengeParticipateRepository.findByUser(tokenuser);

        for (ChallengeParticipate c : challengeParticipates) {
            if (challengeService.isProcessingChallenge(c.getChallenge()))
                simpleChallengeDtos.add(new SimpleChallengeDto(c.getChallenge().getChallengeId(), c.getChallenge().getTitle()));
        }

        return simpleChallengeDtos;

    }
}