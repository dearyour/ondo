package com.nextlevel.ondo.domain;

import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Challenge extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challenge_id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private Date s_date;
    @Column(columnDefinition = "varchar(255) default 'null'") // 경로는 추후 설정
    private String image;
    @Column(nullable = false)
    private String owner;
    @Enumerated(EnumType.STRING)
    @Column
    private Category category;
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.REMOVE)
    private List<ChallengeParticipate> challengeParticipate = new ArrayList<>();


    @Builder
    public Challenge( String title, String content, Date s_date, String image, String owner, Category category) {
        this.title = title;
        this.content = content;
        this.s_date = s_date;
        this.image = image;
        this.owner = owner;
        this.category = category;
    }
}
