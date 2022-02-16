package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Styles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "styles_id")
    private Long stylesId;
    @Column
    private String styleName;
    @Column
    private String content;

    @OneToMany(mappedBy = "styles", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<UserStyle> userStyles = new ArrayList<>();


    @Builder
    public Styles(String styleName, String content) {
        this.styleName = styleName;
        this.content = content;
    }

}
