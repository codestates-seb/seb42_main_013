package com.SebMainTeam13.team13.supplement.entity;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import lombok.*;

import javax.persistence.*;


import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
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
    @Column(name = "nutrients")
    private List<String> nutrients;
    private String imageURL;
    private String supplementType;
    @OneToMany(mappedBy = "supplement", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<DetailSupplement> detailSupplements = new ArrayList<>();
    @ManyToOne
    private Concern concern;
}
