package com.SebMainTeam13.team13.detailSupplement.repository;

import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DetailSupplementRepository extends JpaRepository<DetailSupplement, Long> {
 //   Optional<DetailSupplement> findByDetailSupplementName(String supplementName);
 //   List<Supplement> findAllBySupplementNameIn(List<String> supplementNames);
    Optional<DetailSupplement> findByDetailSupplementId(Long detailSupplementId);

    Optional<DetailSupplement>findByDetailAndSupplement(Detail detail, Supplement supplement);

    List<DetailSupplement>findDetailSupplementsByDetail(Detail detail);
}
