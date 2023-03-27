package com.SebMainTeam13.team13.detail.entity;


import com.SebMainTeam13.team13.audit.Auditable;
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.*;


import javax.persistence.*;
import javax.transaction.Transactional;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.SebMainTeam13.team13.detail.entity.Detail.DetailType.ACTIVATE;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Transactional
public class Detail  {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long detailId;
    @OneToOne(mappedBy = "detail")
    private User user;
    @Column(nullable = false)
    private String birthDate;

    @Column(nullable = false)
    private String gender;


    @Builder.Default
    @Enumerated(EnumType.STRING)
    private DetailType detailType = ACTIVATE;

    public enum DetailType {
        ACTIVATE, DELETED
    }
    @OneToMany(mappedBy = "detail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetailSupplement> detailSupplements = new ArrayList<>();

    @ManyToMany
    private List<Concern> concerns = new ArrayList<>();
    @ElementCollection
    @CollectionTable(name = "detail_map",
            joinColumns = {@JoinColumn(name = "detail_id")})
    @MapKeyColumn(name = "long_key")
    @Column(name = "long_value")
    private Map<Long, Long> longToLongMap = new HashMap<>();
}
