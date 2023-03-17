package com.SebMainTeam13.team13.concern.entity;

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

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> supplementsList = new ArrayList<>();
}
