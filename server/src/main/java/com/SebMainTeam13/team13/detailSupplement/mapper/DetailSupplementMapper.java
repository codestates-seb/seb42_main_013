package com.SebMainTeam13.team13.detailSupplement.mapper;

import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.entity.Supplement;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DetailSupplementMapper {
    public DetailSupplement detailSupplementPostDtoToDetailSupplement(DetailSupplementDto.Post post) {
        return  DetailSupplement.builder()
                .detailId(post.getDetailId())
                .supplementId(post.getSupplementId())
                .expirationDate(post.getExpirationDate())
                .startDate(post.getStartDate())
                .endDate(post.getEndDate())
                .takingTime(post.getTakingTime())
                .pillsLeft(post.getPillsLeft())
                .totalCapacity(post.getTotalCapacity())
                .dosagePerServing(post.getDosagePerServing())
                .dosageInterval(post.getDosageInterval())

                .build();
    }

    public DetailSupplement detailSupplementPatchDtoToDetailSupplement(DetailSupplementDto.Patch patch) {
        return  DetailSupplement.builder()
                .detailId(patch.getDetailId())
                .supplementId(patch.getSupplementId())
                .expirationDate(patch.getExpirationDate())
                .startDate(patch.getStartDate())
                .endDate(patch.getEndDate())
                .takingTime(patch.getTakingTime())
                .pillsLeft(patch.getPillsLeft())
                .totalCapacity(patch.getTotalCapacity())
                .dosagePerServing(patch.getDosagePerServing())
                .dosageInterval(patch.getDosageInterval())

                .build();
    }

    public DetailSupplementDto.Response detailSupplementToDetailSupplementResponseDto(DetailSupplement detailSupplement) {

        return DetailSupplementDto.Response.builder()
                .detailId(detailSupplement.getDetailId())
                .supplementId(detailSupplement.getSupplementId())
                .expirationDate(detailSupplement.getExpirationDate())
                .startDate(detailSupplement.getStartDate())
                .endDate(detailSupplement.getEndDate())
                .takingTime(detailSupplement.getTakingTime())
                .pillsLeft(detailSupplement.getPillsLeft())
                .totalCapacity(detailSupplement.getTotalCapacity())
                .dosagePerServing(detailSupplement.getDosagePerServing())
                .dosageInterval(detailSupplement.getDosageInterval())

                .build();
    }


}