package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserStyleRepository extends JpaRepository<UserStyle, Long> {
    UserStyle findByUserAndStyles(User user, Styles styles);

    List<UserStyle> findByUser(User user);
}
