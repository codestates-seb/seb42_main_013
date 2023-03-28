package com.SebMainTeam13.team13.detail.entity;

import com.SebMainTeam13.team13.concern.entity.Concern;
import lombok.*;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConcernDetailMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "detail_id")
    private Detail detail;

    @ElementCollection
    @CollectionTable(name = "detail_concern_map")
    @MapKeyJoinColumn(name = "concern_id")
    @Column(name = "count")
    private Map<Concern, Long> concernCountMap = new HashMap<>();
}