package com.SebMainTeam13.team13.detailSupplement.entity;


import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import lombok.*;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailSupplement {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long detailSupplementId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "detail_id")
    private Detail detail;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplement_id")
    private Supplement supplement;
    private String expirationDate;
    private String startDate;
    private String endDate;
    @ElementCollection
    @CollectionTable(name = "takingTime", joinColumns = @JoinColumn(name = "detailSupplement_id"))
    @Column(name = "times")
    private List<String> takingTime;
    private Integer pillsLeft;
    private Integer totalCapacity;
    private Integer dosagePerServing;
    private Integer dosageInterval;

}
