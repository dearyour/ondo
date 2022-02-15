package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Styles;
import com.nextlevel.ondo.domain.User;
import com.nextlevel.ondo.domain.UserStyle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StylesRepository extends JpaRepository<Styles, Long> {
    Styles findByStyleName(String styleName);
}
