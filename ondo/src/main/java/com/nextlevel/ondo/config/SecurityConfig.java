package com.nextlevel.ondo.config;

import com.nextlevel.ondo.config.auth.TokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.nextlevel.ondo.config.auth.PrincipalDetailService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 빈 등록 : 스프링 컨테이너에서 객체를 관리할 수 있게 하는 것

@Configuration // 빈등록 (IoC관리)
@EnableWebSecurity // 시큐리티 필터가 등록이 된다.
//Controller에서 특정 권한이 있는 유저만 접근을 허용하려면 @PreAuthorize 어노테이션을 사용하는데, 해당 어노테이션을 활성화 시키는 어노테이션이다.
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{


    @Autowired
    private PrincipalDetailService principalDetailService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean // IoC가 되요!!
    public BCryptPasswordEncoder encodePWD() {
        return new BCryptPasswordEncoder();
    }



    // 시큐리티가 대신 로그인해주는데 password를 가로채기를 하는데
    // 해당 password가 뭘로 해쉬가 되어 회원가입이 되었는지 알아야
    // 같은 해쉬로 암호화해서 DB에 있는 해쉬랑 비교할 수 있음.


    /*
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // csrf 토큰 비활성화 (테스트시 걸어두는 게 좋음)
                .authorizeRequests()
                .antMatchers("/", "/auth/**", "/js/**", "/css/**", "/image/**", "/dummy/**", "/user/rank", "/feed")
                .permitAll()
                .anyRequest()
                .authenticated()

                .and()
                .formLogin()
                .loginPage("/auth/loginForm")
                .loginProcessingUrl("/auth/loginProc")
                .defaultSuccessUrl("/"); // 스프링 시큐리티가 해당 주소로 요청오는 로그인을 가로채서 대신 로그인 해준다.
    }
    */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable().cors().configurationSource(corsConfigurationSource())
                .and().csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and().addFilter(new TokenFilter(authenticationManager()))
                .authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/api/auth/**", "/api/user/rank","/api/challenge","/api/challenge/info/**","/api/feed"
                        ,"/api/search/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .cors();

    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}