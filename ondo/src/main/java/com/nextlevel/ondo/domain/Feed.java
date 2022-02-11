package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "feedId")
public class Feed extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private long feedId;

    @Column(nullable = false, name = "challenge_id")
    private long challengeId;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false, name = "user_id") // 경로는 추후 설정
    private long userId;

    @JsonManagedReference
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<FeedLike> feedlike = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<Comment> comment = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<FeedTag> feedTag = new ArrayList<>();

    @Builder
    public Feed(long challengeId, String image, String content, long userId) {
        this.challengeId = challengeId;
        this.image = image;
        this.content = content;
        this.userId = userId;
    }
}
