package com.SebMainTeam13.team13.supplement.mapper;


import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class SupplementMapper {
    private final ConcernRepository concernRepository;

    public Supplement supplementPostDtoToSupplement(SupplementDto.Post post) {
        Concern concern= null;
        if(post.getConcernId()!= null)
        concern = concernRepository.findByConcernId(post.getConcernId()).get();
        return  Supplement.builder()
                .supplementName(post.getSupplementName())
                .nutrients(post.getNutrients())
                .supplementType(post.getSupplementType())
                .imageURL(post.getImageURL())
                .concern(concern)


                .build();

    }

    public Supplement supplementPatchDtoToSupplement(SupplementDto.Patch patch) {


        return Supplement.builder()
                .supplementName(patch.getSupplementName())
                .nutrients(patch.getNutrients())
                .supplementType(patch.getSupplementType())
                .imageURL(patch.getImageURL())


                .build();

    }

    public SupplementDto.Response supplementToSupplementResponseDto(Supplement supplement) {

            return SupplementDto.Response.builder()
                    .supplementId(supplement.getSupplementId())
                    .supplementName(supplement.getSupplementName())
                    .nutrients(supplement.getNutrients())
                    .imageURL(supplement.getImageURL())
                    .supplementType(supplement.getSupplementType())




                    .build();


    }
    public SupplementDto.ResponseForUser supplementToSupplementResponseForUser(Supplement supplement) {

        return SupplementDto.ResponseForUser.builder()
                .supplementName(supplement.getSupplementName())
                .imageURL(supplement.getImageURL())

                .build();


    }

}