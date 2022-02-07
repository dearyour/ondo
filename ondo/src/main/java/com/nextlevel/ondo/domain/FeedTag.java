package com.nextlevel.ondo.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeedTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_tag_id")
    private Long feedTagId;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
