package com.nextlevel.ondo.domain;

import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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
    private String userId;

    @OneToMany(mappedBy = "feed", cascade = CascadeType.REMOVE)
    private List<FeedLike> feedlike = new ArrayList<>();
    @OneToMany(mappedBy = "feed", cascade = CascadeType.REMOVE)
    private List<Comment> comment = new ArrayList<>();

    @Builder
    public Feed(long challengeId, String image, String content, String userId) {
        this.challengeId = challengeId;
        this.image = image;
        this.content = content;
        this.userId = userId;
    }
}
