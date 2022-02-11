package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Challenge extends BaseTimeEntity {
    @Id
    @Column(name = "challenge_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false,name = "s_date")
    private String sDate;
    @Column(columnDefinition = "varchar(255) default 'null'") // 경로는 추후 설정
    private String image;
    @Column(nullable = false,name = "owner")
    private Long owner;


    @Enumerated(EnumType.STRING)
    @Column
    private Category category;
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeParticipate> challengeParticipate = new ArrayList<>();


    @Builder
    public Challenge( String title, String content, String sDate, String image, long owner, Category category) {
        this.title = title;
        this.content = content;
        this.sDate = sDate;
        this.image = image;
        this.owner = owner;
        this.category = category;
    }
}
