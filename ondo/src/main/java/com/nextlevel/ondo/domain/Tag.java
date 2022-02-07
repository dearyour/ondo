package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class Tag {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "tag_id")
    private long tagId;

    @Id
    @Column(nullable = false, name = "name")
    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "tag", cascade = CascadeType.REMOVE)
    private List<FeedTag> feedTag = new ArrayList<>();

    @Builder
    public Tag(String name) {
        this.name = name;
    }

}
