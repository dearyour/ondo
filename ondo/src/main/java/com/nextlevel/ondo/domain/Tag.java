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
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private long tagId;

    @Column(nullable = false)
    private String name;
    /*
    @OneToMany(mappedBy = "tag", cascade = CascadeType.REMOVE)
    private List<FeedTag> feedTag = new ArrayList<>();
    */
    @Builder
    public Tag(String name) {
        this.name = name;
    }
}
