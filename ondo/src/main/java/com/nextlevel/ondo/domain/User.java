package com.nextlevel.ondo.domain;

import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String name;
    private String nickname;
    @Column(nullable = false, columnDefinition = "int(10) default 36")
    private int ondo;
    @Column(columnDefinition = "varchar(255) default 'null'") // 경로는 추후 설정
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<ChallengeParticipate> challengeParticipate = new ArrayList<>();

    public User update(String name, String picture) {
        this.name = name;
        this.image = picture;
        return this;
    }
    @Builder
    public User(String email,String name,String nickname,int ondo,String image,Role role){
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.ondo = ondo;
        this.image = image;
        this.role = role;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
