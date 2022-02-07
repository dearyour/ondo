package com.nextlevel.ondo.domain.dto.comment;

import com.nextlevel.ondo.domain.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class DetailCommentDto {

    Comment comment;
    Boolean flag;
    @Builder
    public DetailCommentDto(Comment comment, Boolean flag) {
        this.comment = comment;
        this.flag = flag;
    }
}