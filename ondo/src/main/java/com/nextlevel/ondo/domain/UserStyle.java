package com.nextlevel.ondo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserStyle {
    @Id
    @Column(name="user_style_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userStyleId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    @ManyToOne
    @JoinColumn(name = "styles_id")
    @JsonBackReference
    private Styles styles;

    @Builder
    public UserStyle(User user, Styles styles){
        this.user = user;
        this.styles = styles;
    }
}
