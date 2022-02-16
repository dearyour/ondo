package com.nextlevel.ondo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextlevel.ondo.domain.KakaoProfile;
import com.nextlevel.ondo.domain.OAuthToken;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.dto.user.FeedUserDto;
import com.nextlevel.ondo.domain.dto.user.FollowUserDto;
import com.nextlevel.ondo.domain.dto.user.ModifyUserDto;
import com.nextlevel.ondo.service.UserService;
import com.nextlevel.ondo.util.KakaoUtil;
import com.nextlevel.ondo.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    @Value("${cos.key}")
    private String cosKey;
    @Value("${kakao.client_id}")
    private String kakaoCliendId;
    @Value("${kakao.redirect_uri}")
    private String kakaoRedirectUri;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final KakaoUtil kakaoUtil;
    private final S3Uploader s3Uploader;

    // 로그인 및 회원 가입
    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<Map<String, Object>> kakaoCallback(String code) { // Data를 리턴해주는 컨트롤러 함수

        // POST방식으로 key=value 데이터를 요청 (카카오쪽으로)
        // Retrofit2
        // OkHttp
        // RestTemplate

        RestTemplate rt = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "44dad20dedd901c8ca6eb5d6fde58baa");

        params.add("redirect_uri", "http://i6a601.p.ssafy.io/auth/kakao/callback");
//         params.add("redirect_uri", "http://localhost:3000/auth/kakao/callback");

        params.add("code", code);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class);

        // Gson, Json Simple, ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("****************");
        System.out.println("kakaotoken : " + oauthToken.getAccess_token());

        RestTemplate rt2 = new RestTemplate();
        System.out.println("test1");

        // HttpHeader 오브젝트 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + oauthToken.getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);
        System.out.println("test2");
        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest2,
                String.class);
        System.out.println(response2.getBody());

        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // User 오브젝트 : username, password, email
        System.out.println("카카오 아이디(번호) : " + kakaoProfile.getId());
        System.out.println("카카오 이메일 : " + kakaoProfile.getKakao_account().getEmail());

        System.out.println("블로그서버 유저네임 : " + kakaoProfile.getKakao_account().getEmail() + "_" + kakaoProfile.getId());
        System.out.println("블로그서버 이메일 : " + kakaoProfile.getKakao_account().getEmail());
        // UUID란 -> 중복되지 않는 어떤 특정 값을 만들어내는 알고리즘
        System.out.println("블로그서버 패스워드 : " + cosKey);

        User kakaoUser = User.builder()
                .username(kakaoProfile.getId().toString())
                .password(cosKey)
                .email(kakaoProfile.getKakao_account().getEmail())
                .build();

        // 가입자 혹은 비가입자 체크 해서 처리
        User originUser = userService.findUser(kakaoUser.getEmail());
        boolean newUser = false;
        if (originUser.getUsername() == null) {
            newUser=true;
            System.out.println("기존 회원이 아니기에 자동 회원가입을 진행합니다");
            userService.signUp(kakaoUser);
            originUser = userService.findUser(kakaoUser.getEmail());
        }

        System.out.println("자동 로그인을 진행합니다.");
        // 로그인 처리
        /*
         * Authentication authentication = authenticationManager
         * .authenticate(new
         * UsernamePasswordAuthenticationToken(kakaoUser.getUsername(), cosKey));
         * SecurityContextHolder.getContext().setAuthentication(authentication);
         */
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("token", oauthToken.getAccess_token());
        resultMap.put("username", originUser.getUsername());
        resultMap.put("newUser", newUser);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.ACCEPTED);
    }

    // 유저 피드 페이지
    @GetMapping("/user/feed/{username}")
    public ResponseEntity<FeedUserDto> feedUser(@PathVariable String username,
            @RequestHeader("Authorization") String accessToken) {
        FeedUserDto feedUserDto = userService.feedUser(username, accessToken);
        return new ResponseEntity<FeedUserDto>(feedUserDto, HttpStatus.OK);
    }

    // 회원 정보
    @GetMapping("/user/info")
    public ResponseEntity<User> infoUser(@RequestHeader("Authorization") String accessToken) {
        String token = accessToken.split(" ")[1];
        User user = kakaoUtil.getUserByEmail(token);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // 회원 랭킹
    @GetMapping("/user/rank")
    public ResponseEntity<List<User>> rankUser() {
        List<User> ranker = userService.rankUser();
        return new ResponseEntity<List<User>>(ranker, HttpStatus.OK);
    }

    // 개인 정보 수정 화면
    @GetMapping("/user/modify")
    public ResponseEntity<ModifyUserDto> beforemodifyUser(@RequestHeader("Authorization") String accessToken) {
        ModifyUserDto userDto = userService.beforemodifyUser(accessToken);
        return new ResponseEntity<ModifyUserDto>(userDto, HttpStatus.OK);
    }

    // 개인 정보 수정 버튼 클릭
    @PutMapping(value = "/user/modify", consumes = { "multipart/form-data" })
    public ResponseEntity<String> modifyUser(
            @RequestPart(value = "file", required = false) MultipartFile multipartFile, @RequestPart String username,
            @RequestPart String chooseStyle, @RequestHeader("Authorization") String accessToken) throws IOException {
        String image = null;
        if (multipartFile == null)
            image = null;
        else {
            image = s3Uploader.upload(multipartFile, "static", "user");
        }
        String result = userService.modifyUser(image, username, accessToken, chooseStyle);
        if (result.equals("fail")) {
            return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<String>(result, HttpStatus.OK);
        }
    }
}
