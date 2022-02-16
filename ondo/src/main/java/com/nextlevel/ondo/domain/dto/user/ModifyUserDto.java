package com.nextlevel.ondo.domain.dto.user;

import com.nextlevel.ondo.domain.Styles;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ModifyUserDto {
    private String username;
    private String image;
    private List<Styles> stylesList;

    @Builder
    public ModifyUserDto(String username, String image, List<Styles> stylesList) {
        this.username = username;
        this.image = image;
        this.stylesList = stylesList;
    }
}
