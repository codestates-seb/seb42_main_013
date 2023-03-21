package com.SebMainTeam13.team13.concern.dto;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;


public class ConcernDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String title;
        private List<String> contents;


    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        private String title;
        private List<String> contents;



    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {


        private Long concernId;
        private String title;
        private List<SupplementDto.ResponseForUser> supplementsList;
        private List<String> contents;
        public Response(Concern concern) {

                    this.concernId= concern.getConcernId();
                    this.contents=concern.getContents();
                    this.supplementsList=concern.getSupplements().stream()
                            .map(supplement -> SupplementDto.ResponseForUser.builder()
                                    .supplementName(supplement.getSupplementName())
                                    .imageURL(supplement.getImageURL())
                                    .build())
                            .collect(Collectors.toList());
                    this.title=concern.getTitle();


        }


    }
}
