package com.nextlevel.ondo.service;

import com.nextlevel.ondo.domain.*;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeDetailDto;
import com.nextlevel.ondo.domain.dto.challenge.ChallengePageDto;
import com.nextlevel.ondo.domain.dto.challenge.ChallengeSaveDto;
import com.nextlevel.ondo.domain.dto.challenge.JoinChallengeDto;
import com.nextlevel.ondo.repository.ChallengeParticipateRepository;
import com.nextlevel.ondo.repository.ChallengeRepository;
import com.nextlevel.ondo.repository.FeedRepository;
import com.nextlevel.ondo.repository.UserRepository;
import com.nextlevel.ondo.util.KakaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final ChallengeParticipateRepository challengeParticipateRepository;
    private final FeedRepository feedRepository;
    private final KakaoUtil kakaoUtil;

    public ChallengeDetailDto detailChallenge(Long challengeId, String token) {
        // 1. 챌린지 id로 해당 챌린지 찾기. 챌린지에 참여한 사람은 챌린지에 필드로 존재
        Challenge challenge = challengeRepository.findByChallengeId(challengeId);
        // 2. 챌린지 관련 피드들 찾기
        List<Feed> feeds = feedRepository.findAllByChallengeId(challengeId);
        // 3. 토큰으로 User 찾기.
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        // 4. user가 해당 챌린지에 참여중인지 검사
        List<ChallengeParticipate> list = challenge.getChallengeParticipate();
        boolean amIParticipate = false;
        for (ChallengeParticipate challengeParticipate : list) {
            if (user.getEmail().equals(challengeParticipate.getUser().getEmail())) {
                amIParticipate = true;
                break;
            }
        }
        LocalDate now = LocalDate.now();
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷 적용
        String formatedNow = now.format(formatter);
        // 5. 해당 챌린지가 이미 종료된건지 검사
        boolean isFinished = false;
        if(Integer.parseInt(challenge.getSDate()) + 2 < Integer.parseInt(formatedNow)){
            isFinished = true;
        }
        boolean isStarted = false;
        // 현재 날짜 구하기
        if (Integer.parseInt(challenge.getSDate()) < Integer.parseInt(formatedNow)) {
            isStarted = true;
        }
        user = userRepository.findByUserId(challenge.getOwner());

        // 6. DTO에 담아서 리턴
        return ChallengeDetailDto.builder()
                .challenge(challenge)
                .feeds(feeds)
                .amIParticipate(amIParticipate)
                .isFinished(isFinished)
                .isStarted(isStarted)
                .username(user.getUsername())
                .image(user.getImage())
                .style(user.getChooseStyle())
                .build();
    }

    // 현재 날짜와 비교해 진행되고 있는 챌린지인지 여부 검사
    public boolean isProcessingChallenge(Challenge challenge) {
        // 현재 날짜 구하기
        LocalDate now = LocalDate.now();
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷 적용
        String formatedNow = now.format(formatter);
        System.out.println(formatedNow + " : 현재 날짜");
        System.out.println(challenge.getSDate() + " : 챌린지 개설일");
        // 현재 날짜와 비교
        try {
            if (formatedNow.equals(AddDate(challenge.getSDate(), 0, 0, 0))
                    || formatedNow.equals(AddDate(challenge.getSDate(), 0, 0, 1))
                    || formatedNow.equals(AddDate(challenge.getSDate(), 0, 0, 2))) {
                System.out.println("현재 진행중인 챌린지 입니다.");
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
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


    public Challenge createChallenge(ChallengeSaveDto challengeSaveDto, String token, String image) {
        // token으로 owner 찾기
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        // date 파싱
        String date = "";
        String[] temp = challengeSaveDto.getS_date().split("-");
        for (int i = 0; i < temp.length; i++) {
            date += temp[i];
        }
        challengeSaveDto.setS_date(date);
        Challenge newChallenge = challengeSaveDto.toEntity(user.getUserId(), image);
        Challenge challenge = challengeRepository.save(newChallenge);
        participateChallenge(JoinChallengeDto.builder()
                .challengeId(challenge.getChallengeId()).build(), token);
        return challenge;
    }

    public ChallengeParticipate participateChallenge(JoinChallengeDto joinChallengeDto, String token) {
        // DTO 하나 만들어서 .Entity() 사용 후 테이블에 저장.
        // Exception Handler
        String accessToken = token.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(accessToken);
        Challenge challenge = challengeRepository.findById(joinChallengeDto.getChallengeId())
                .orElseThrow(() -> new IllegalArgumentException("해당 챌린지가 없습니다. id=" + joinChallengeDto.getChallengeId()));
        ChallengeParticipate challengeParticipate = joinChallengeDto.toEntity(user, challenge);
        challengeParticipate.setArchived(0);
        if (challengeParticipateRepository.findByChallengeAndUser(challenge, user) != null) {
            // 이미 참가 중이거나 챌린지가 종료 되었을 경우.
            return null;
        }

        return challengeParticipateRepository.save(challengeParticipate);
    }

    @Transactional(readOnly = true)
    public ChallengePageDto findAllChallenge() {
        //List<Challenge> allChallenges = challengeRepository.findAll();

        List<Challenge> challenges = challengeRepository.findAll();
        List<Challenge> allChallenges = new ArrayList<>();

        // 현재 날짜 구하기
        LocalDate now = LocalDate.now();
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷 적용
        String formatedNow = now.format(formatter);
        for(Challenge c : challenges){
            if(Integer.parseInt(formatedNow) <= Integer.parseInt(c.getSDate())){
                allChallenges.add(c);
            }
        }

        allChallenges.sort(((o1, o2) -> -Integer.compare(o1.getChallengeParticipate().size(), o2.getChallengeParticipate().size())));
        List<Challenge> top10Challenges = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            if (allChallenges.size() < i + 1) {
                break;
            }
            top10Challenges.add(allChallenges.get(i));
        }
        return ChallengePageDto.builder()
                .allChallenges(allChallenges)
                .top10Challenges(top10Challenges)
                .build();
    }

    @Transactional(readOnly = true)
    public Challenge challengeDetail(long challengeId) {
        return challengeRepository.findByChallengeId(challengeId);
    }

    @Transactional(readOnly = true)
    public List<Challenge> getChallengeByCategory(Category category) {
        return challengeRepository.findAllByCategory(category);
    }

    @Transactional(readOnly = true)
    public List<Challenge> findChallengeByKeyword(String keyword) {
        return challengeRepository.findByTitleContaining(keyword);
    }

    public List<Challenge> canparticipate() {

        List<Challenge> challenges = challengeRepository.findAll();
        List<Challenge> canChallenge = new ArrayList<>();

        // 현재 날짜 구하기
        LocalDate now = LocalDate.now();
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷 적용
        String formatedNow = now.format(formatter);
        for(Challenge c : challenges){
            if(Integer.parseInt(formatedNow) <= Integer.parseInt(c.getSDate())){
                canChallenge.add(c);
            }
        }
       return canChallenge;

    }
}
