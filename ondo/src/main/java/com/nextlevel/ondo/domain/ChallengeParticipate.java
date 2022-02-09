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
    private Boolean[] archived = new Boolean[3];

    @Builder
    public ChallengeParticipate(User user, Challenge challenge,Boolean[] archived){
        this.user = user;
        this.challenge = challenge;
        this.archived = archived;
    }
}
