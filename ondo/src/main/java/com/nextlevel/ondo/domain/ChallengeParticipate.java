package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChallengeParticipate {
    @Id
    @Column(name="challenge_participate_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeParticipateId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @JsonBackReference
    private Challenge challenge;
    @Column
    private int archived = 0;

    @Builder
    public ChallengeParticipate(User user, Challenge challenge,int archived){
        this.user = user;
        this.challenge = challenge;
        this.archived = archived;
    }
}
