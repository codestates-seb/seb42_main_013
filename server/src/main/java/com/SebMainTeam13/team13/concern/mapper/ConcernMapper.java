package com.SebMainTeam13.team13.concern.mapper;

import com.SebMainTeam13.team13.concern.dto.ConcernDto;
import com.SebMainTeam13.team13.concern.entity.Concern;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ConcernMapper {
    Concern concernPostDtoToConcern(ConcernDto.Post concernPostDto);
    Concern concernPatchDtoToConcern(ConcernDto.Patch concernPatchDto);
    ConcernDto.Response concernToConcernResponseDto(Concern concern);
    List<ConcernDto.Response> concernsToConcernResponseDtos(List<Concern> concerns);
}
