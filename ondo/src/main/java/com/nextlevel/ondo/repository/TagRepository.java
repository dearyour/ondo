package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Tag;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
//    @Query(value = "SELECT tag_id FROM tag WHERE name like %:keyword%", nativeQuery = true)
//    List<Long> selectByKeyword(@Param(value = "keyword") String keyword);
    List<Tag> findByNameContaining(String keyword);
}