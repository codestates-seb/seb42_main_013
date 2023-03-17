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

        private String birthDate;
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


        private Long detailId;
        private String birthDate;
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

        private Long detailId;
        private String birthDate;
        private String gender;


//        private List<String> supplement;
//        private List<String> concerns;


    }
 }
