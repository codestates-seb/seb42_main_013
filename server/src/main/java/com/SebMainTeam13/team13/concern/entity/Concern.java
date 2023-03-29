package com.SebMainTeam13.team13.concern.entity;

import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Concern {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long concernId;
    @Column(unique = true)
    private String title;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> contents = new ArrayList<>();
    @OneToMany(mappedBy = "concern")
    private List<Supplement> supplements = new ArrayList<>();
    @ManyToMany(mappedBy = "concerns")
    private List<Detail> details = new ArrayList<>();
}
