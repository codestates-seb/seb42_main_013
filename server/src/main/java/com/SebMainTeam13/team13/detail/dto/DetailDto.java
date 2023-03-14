package com.SebMainTeam13.team13.detail.dto;


import com.SebMainTeam13.team13.user.dto.UserDto;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

public class DetailDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private Long userId;
        private Long age;
        private String gender;

//        private List<String> supplement;
//        private List<String> concerns;

    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        private Long userId;
        private Long detailId;
        private Long age;
        private String gender;
//        private List<String> supplement;
//        private List<String> concerns;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long userId;
        private Long detailId;
        private Long age;
        private String gender;
        private UserDto.Response user;


//        private List<String> supplement;
//        private List<String> concerns;


    }
 }
