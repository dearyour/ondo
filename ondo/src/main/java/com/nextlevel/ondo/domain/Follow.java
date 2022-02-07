package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private long followId;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    @JsonBackReference
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    @JsonBackReference
    private User toUser;


}
