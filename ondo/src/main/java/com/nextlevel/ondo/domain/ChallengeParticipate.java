package com.nextlevel.ondo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeParticipate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengeParticipate_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Builder
    public ChallengeParticipate(User user, Challenge challenge){
        this.user = user;
        this.challenge = challenge;
    }
}
