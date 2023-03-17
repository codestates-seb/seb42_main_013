package com.SebMainTeam13.team13.user.dto;

import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
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

        private String email;
        private String displayName;
        private DetailDto.Response detail;
        private List<String> supplementNames;
    }

}
