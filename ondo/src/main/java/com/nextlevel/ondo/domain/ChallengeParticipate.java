package com.nextlevel.ondo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
@Table(name = "challenge_participate")
public class ChallengeParticipate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participate_id;
    @Column(nullable = false, columnDefinition = "BOOLEAN default FALSE")
    private Long achieved;
    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
