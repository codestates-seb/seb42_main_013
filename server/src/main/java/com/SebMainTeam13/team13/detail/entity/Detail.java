package com.SebMainTeam13.team13.detail.entity;


import com.SebMainTeam13.team13.audit.Auditable;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.*;


import javax.persistence.*;
import javax.transaction.Transactional;


import static com.SebMainTeam13.team13.detail.entity.Detail.DetailType.ACTIVATE;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
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
    @OneToOne
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
}
