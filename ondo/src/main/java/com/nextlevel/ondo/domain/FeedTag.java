package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    @JsonBackReference
    private Feed feed;
    @ManyToOne
    @JoinColumn(name = "tag_id")
    @JsonBackReference
    private Tag tag;

    @Builder
    public FeedTag(Feed feed, Tag tag){
        this.feed = feed;
        this.tag = tag;
    }


}
