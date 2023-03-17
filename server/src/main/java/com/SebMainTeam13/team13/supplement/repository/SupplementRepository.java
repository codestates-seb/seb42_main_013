package com.SebMainTeam13.team13.supplement.repository;

import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SupplementRepository extends JpaRepository <Supplement, Long>{
    Optional<Supplement> findBySupplementName(String supplementName);
    List<Supplement> findAllBySupplementNameIn(List<String> supplementNames);
    Optional<Supplement> findBySupplementId(Long supplementId);

}
