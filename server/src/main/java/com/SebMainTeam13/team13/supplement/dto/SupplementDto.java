package com.SebMainTeam13.team13.supplement.dto;

import lombok.*;

import java.util.List;

public class SupplementDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String supplementName;
        private List<String> nutrients;
        private String imageURL;
        private String supplementType;
        private Long concernId;
    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch{
        private String supplementName;
        private List<String> nutrients;
        private String imageURL;
        private String supplementType;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private String supplementName;
        private List<String> nutrients;
        private String imageURL;
        private String supplementType;
        private Long concernId;
    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseForUser {
        private String supplementName;
        private String imageURL;
    }


}
