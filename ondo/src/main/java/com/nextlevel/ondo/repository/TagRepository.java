package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
//    @Query(value = "SELECT tag_id FROM tag WHERE name like %:keyword%", nativeQuery = true)
//    List<Long> selectByKeyword(@Param(value = "keyword") String keyword);
    List<Tag> findByNameContaining(String keyword);

    Tag findByName(String s);
}