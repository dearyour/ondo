package com.nextlevel.ondo.domain;

import com.nextlevel.ondo.util.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@ToString
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false, columnDefinition = "int(20) default 36")
    private int ondo;
    @Column(columnDefinition = "varchar(255) default 'null'") // 경로는 추후 설정
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(10) default 'user'")
    private RoleType role;

}
