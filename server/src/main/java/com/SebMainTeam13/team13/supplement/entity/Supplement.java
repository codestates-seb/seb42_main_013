package com.SebMainTeam13.team13.supplement.entity;

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
public class Supplement {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long supplementId;
    private String supplementName;
    @ElementCollection
    @CollectionTable(name = "nutrient", joinColumns = @JoinColumn(name = "supplement_id"))
    @Column(name = "name")
    private List<String> nutrients;
    private String imageURL;
 //   private List<DetailSupplement> detailSupplements;

}
