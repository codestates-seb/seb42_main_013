package com.SebMainTeam13.team13.security.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue
    private Long roleId;
    private String roleName;
    private String roleDesc;
    @OneToMany(mappedBy = "role")
    private List<UserRole> userRoles = new ArrayList<>();
}
