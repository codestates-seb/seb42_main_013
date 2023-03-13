package com.SebMainTeam13.team13.user.dto;

import com.SebMainTeam13.team13.user.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

public class UserDto {
    @Getter
    public static class Post {
        private String email;
        private String password;
        private String displayName;
    }
    @Getter
    @Setter
    public static class Patch {
        private Long userId;
        private String displayName;

    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long userId;
        private String email;
        private String displayName;
        private User.UserStatus userStatus;
        private List<String> roles = new ArrayList<>();
        public Response(User user) {
            this.userId = user.getUserId();
            this.email = user.getEmail();
            this.displayName = user.getDisplayName();
            this.userStatus = user.getUserStatus();
        }
    }

}
