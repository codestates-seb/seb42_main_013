package com.SebMainTeam13.team13.detailSupplement.mapper;

import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.repository.DetailSupplementRepository;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;

import com.SebMainTeam13.team13.supplement.service.SupplementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DetailSupplementMapper {
    private final SupplementService supplementService;
    public final DetailSupplementRepository detailSupplementRepository;
    public DetailSupplement detailSupplementPostDtoToDetailSupplement(DetailSupplementDto.Post post) {
        Supplement supplement = supplementService.findAndVerifySupplementBySupplementId(post.getSupplementId());

        return  DetailSupplement.builder()

                .expirationDate(post.getExpirationDate())
                .startDate(post.getStartDate())
                .endDate(post.getEndDate())
                .takingTime(post.getTakingTime())
                .pillsLeft(post.getPillsLeft())
                .totalCapacity(post.getTotalCapacity())
                .dosagePerServing(post.getDosagePerServing())
                .dosageInterval(post.getDosageInterval())
                .supplement(supplement)

                .build();
    }

    public DetailSupplement detailSupplementPatchDtoToDetailSupplement(DetailSupplementDto.Patch patch,Long detailSupplementId ) {
        Supplement supplement = detailSupplementRepository.findByDetailSupplementId(detailSupplementId).get().getSupplement();

        return  DetailSupplement.builder()

                .expirationDate(patch.getExpirationDate())
                .startDate(patch.getStartDate())
                .endDate(patch.getEndDate())
                .takingTime(patch.getTakingTime())
                .pillsLeft(patch.getPillsLeft())
                .totalCapacity(patch.getTotalCapacity())
                .dosagePerServing(patch.getDosagePerServing())
                .dosageInterval(patch.getDosageInterval())
                .supplement(supplement)

                .build();
    }

    public DetailSupplementDto.Response detailSupplementToDetailSupplementResponseDto(DetailSupplement detailSupplement) {
        SupplementDto.Response supplement =
                   SupplementDto.Response.builder()
                  .supplementName(detailSupplement.getSupplement().getSupplementName())
                  .supplementType(detailSupplement.getSupplement().getSupplementType())
                  .imageURL(detailSupplement.getSupplement().getImageURL())
                  .nutrients(detailSupplement.getSupplement().getNutrients())

                  .build();
        return DetailSupplementDto.Response.builder()

                .detailSupplementId(detailSupplement.getDetailSupplementId())
                .supplementName(detailSupplement.getSupplement().getSupplementName())
                .expirationDate(detailSupplement.getExpirationDate())
                .startDate(detailSupplement.getStartDate())
                .endDate(detailSupplement.getEndDate())
                .takingTime(detailSupplement.getTakingTime())
                .pillsLeft(detailSupplement.getPillsLeft())
                .totalCapacity(detailSupplement.getTotalCapacity())
                .dosagePerServing(detailSupplement.getDosagePerServing())
                .dosageInterval(detailSupplement.getDosageInterval())
                .supplementResponse(supplement)

                .build();
    }
    public List<DetailSupplementDto.Response> detailSupplementsToDetailSupplementResponseDtos(List<DetailSupplement> detailSupplements) {
        return detailSupplements.stream().map(DetailSupplementDto.Response::new).collect(Collectors.toList());
    }

}