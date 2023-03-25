package com.SebMainTeam13.team13.concern.repository;

import com.SebMainTeam13.team13.concern.entity.Concern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConcernRepository extends JpaRepository<Concern, Long> {
    Optional<Concern> findByConcernId(long concernId);
    Optional<Concern> findByTitle(String title);
}
