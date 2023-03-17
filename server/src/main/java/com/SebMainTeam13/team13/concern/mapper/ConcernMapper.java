package com.SebMainTeam13.team13.concern.mapper;

import com.SebMainTeam13.team13.concern.dto.ConcernDto;
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ConcernMapper {
    private final SupplementRepository supplementRepository;

        public Concern concernPostDtoToConcern(ConcernDto.Post post) {

            return Concern.builder()
                    .title(post.getTitle())
                    .contents(post.getContents())

                    
                    .build();

        }

        public Concern concernPatchDtoToConcern(ConcernDto.Patch patch) {


            return Concern.builder()

                    .title(patch.getTitle())
                    .contents(patch.getContents())


                    .build();

        }

        public ConcernDto.Response concernToConcernResponseDto(Concern concern) {
            List<String> supplementsList = concern.getSupplements().stream()
                    .map(Supplement::getSupplementName).collect(Collectors.toList());


            return ConcernDto.Response.builder()
                    .concernId(concern.getConcernId())
                    .title(concern.getTitle())
                    .contents(concern.getContents())
                    .supplementsList(supplementsList)

                    .build();
        }
    public List<ConcernDto.Response> concernsToConcernResponseDtos(List<Concern> concerns) {
        return concerns.stream().map(ConcernDto.Response::new).collect(Collectors.toList());
    }
    
}
