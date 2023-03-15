package com.SebMainTeam13.team13.supplement.entity;

import com.SebMainTeam13.team13.detail.entity.Detail;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
public class DetailSupplement {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long detailSupplementId;
    @ManyToOne
    @JoinColumn(name = "detail_id")
    private Detail detail;
    @ManyToOne
    @JoinColumn(name = "supplement_id")
    private Supplement supplement;
    private String expirationDate;
    private String lastDoseTime;
    private Long pillNumber;
}
