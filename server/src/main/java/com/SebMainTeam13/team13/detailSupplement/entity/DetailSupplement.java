package com.SebMainTeam13.team13.detailSupplement.entity;


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
    private Long detailId;
    private Long supplementId;
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
