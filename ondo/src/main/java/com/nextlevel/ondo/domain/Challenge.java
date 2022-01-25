package com.nextlevel.ondo.domain;

import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Challenge extends BaseTimeEntity {
    public enum Category {운동, 공부, 식단관리;}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challenge_id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String s_date;
    @Column(nullable = false, columnDefinition = "varchar(255) default 'null'")
    private String image;
    @Column(nullable = false)
    private Long owner;
    @Column(nullable = false)
    private Category category;

    @OneToMany(mappedBy = "challenge")
    private List<ChallengeParticipate> challengeParticipate = new ArrayList<>();


}
