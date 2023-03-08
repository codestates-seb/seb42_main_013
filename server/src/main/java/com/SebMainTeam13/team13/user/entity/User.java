package com.SebMainTeam13.team13.user.entity;

import com.SebMainTeam13.team13.security.entity.UserRole;
import lombok.*;
import org.springframework.data.domain.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(length = 100, nullable = false)
    private String password;
    private String displayName;
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = PERSIST, fetch = EAGER)
    @Setter(PRIVATE)
    private List<UserRole> userRoles = new ArrayList<>();
    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVATE;

    @Getter
    public enum UserStatus {
        USER_ACTIVATE(1, "활동중"),
        USER_SLEEP(2, "휴면"),
        USER_DELETE(3, "회원 삭제");
        private int nums;
        private String desc;

        UserStatus(int nums, String desc) {
            this.nums = nums;
            this.desc = desc;
        }
    }
}
