package com.nextlevel.ondo.domain.dto.challenge;

import com.nextlevel.ondo.domain.Category;
import com.nextlevel.ondo.domain.Challenge;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;


//challenge_id (Long)
//title (String)
//content (String)
//s_date (String)
//image (String)
//owner (Long)
//category(String)

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeSaveDto {
    private String title;
    private String content;
    private String s_date;
//    private String image;
    private Category category;

    public Challenge toEntity(Long owner, String image) {
        return Challenge.builder().
                title(title)
                .content(content)
                .sDate(s_date)
                .image(image)
                .owner(owner)
                .category(category).build();
    }
}


