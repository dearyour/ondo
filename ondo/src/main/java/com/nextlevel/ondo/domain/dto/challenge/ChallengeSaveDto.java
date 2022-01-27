package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;


//challenge_id (Long)
//title (String)
//content (String)
//s_date (String)
//image (String)
//owner (Long)
//category(String)

@Getter
@NoArgsConstructor
public class ChallengeSaveDto {
    String title;
    String content;
    String s_date;
    String image;
    long owner;
    Category category;

    public Challenge toEntity() {
        return Challenge.builder().
                title(title)
                .content(content)
                .s_date(s_date)
                .image(image)
                .owner(owner)
                .category(category).build();
    }
}
