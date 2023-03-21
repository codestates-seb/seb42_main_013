package com.SebMainTeam13.team13.detailSupplement.dto;


import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
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
        private SupplementDto.Response supplementResponse;

        public Response(DetailSupplement detailSupplement) {
            this.expirationDate = detailSupplement.getExpirationDate();
            this.startDate = detailSupplement.getStartDate();
            this.endDate = detailSupplement.getEndDate();
            this.takingTime = detailSupplement.getTakingTime();
            this.pillsLeft = detailSupplement.getPillsLeft();
            this.totalCapacity = detailSupplement.getTotalCapacity();
            this.dosagePerServing = detailSupplement.getDosagePerServing();
            this.dosageInterval = detailSupplement.getDosageInterval();
            this.supplementResponse = SupplementDto.Response.builder()
                    .supplementName(detailSupplement.getSupplement().getSupplementName())
                    .imageURL(detailSupplement.getSupplement().getImageURL())
                    .build();
        }
    }
}