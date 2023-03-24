package com.SebMainTeam13.team13.naverOpenApi.dto;

import lombok.*;

public class OpenApiDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class search {
        private String query;
    }
}
