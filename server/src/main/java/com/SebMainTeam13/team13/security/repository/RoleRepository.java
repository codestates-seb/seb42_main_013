package com.SebMainTeam13.team13.security.repository;

import com.SebMainTeam13.team13.security.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
