package com.nextlevel.ondo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableJpaAuditing
//@EnableWebMvc
public class OndoApplication {
    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.properties,"
            + "classpath:application-aws.properties";

    public static void main(String[] args) {
        new SpringApplicationBuilder(OndoApplication.class)
                .properties(APPLICATION_LOCATIONS)
                .run(args);

    }

}

