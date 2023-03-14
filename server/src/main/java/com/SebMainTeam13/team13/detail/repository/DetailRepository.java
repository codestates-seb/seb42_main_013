package com.SebMainTeam13.team13.detail.repository;

import com.SebMainTeam13.team13.detail.entity.Detail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DetailRepository extends JpaRepository<Detail, Long> {
    Optional<Detail> findByDetailId(Long detailId);
}
