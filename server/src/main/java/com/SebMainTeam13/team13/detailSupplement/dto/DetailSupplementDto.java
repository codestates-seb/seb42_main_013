package com.SebMainTeam13.team13.detailSupplement.dto;


import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

public class DetailSupplementDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String supplementName;
        private String expirationDate;
        private String startDate;
        private String endDate;
        private List<String> takingTime;
        private Integer pillsLeft;
        private Integer totalCapacity;
        private Integer dosagePerServing;
        private Integer dosageInterval;

    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
        private String supplementName;
        private String expirationDate;
        private String startDate;
        private String endDate;
        private List<String> takingTime;
        private Integer pillsLeft;
        private Integer totalCapacity;
        private Integer dosagePerServing;
        private Integer dosageInterval;

    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String expirationDate;
        private String startDate;
        private String endDate;
        private List<String> takingTime;
        private Integer pillsLeft;
        private Integer totalCapacity;
        private Integer dosagePerServing;
        private Integer dosageInterval;

    }
}