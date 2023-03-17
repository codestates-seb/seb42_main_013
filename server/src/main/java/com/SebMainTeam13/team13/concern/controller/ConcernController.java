package com.SebMainTeam13.team13.concern.controller;

import com.SebMainTeam13.team13.concern.dto.ConcernDto;
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.mapper.ConcernMapper;
import com.SebMainTeam13.team13.concern.service.ConcernService;
import com.SebMainTeam13.team13.dto.ListResponseDto;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/concerns")
@RequiredArgsConstructor
public class ConcernController {

    private final static String CONCERN_DEFAULT_URL = "/concerns";

    private final ConcernService concernService;
    private final ConcernMapper mapper;



    @PostMapping
    public ResponseEntity postConcern(@RequestBody ConcernDto.Post concernPostDto){
        Concern concern = concernService.createConcern(mapper.concernPostDtoToConcern(concernPostDto));
        URI location = UriCreator.createUri(CONCERN_DEFAULT_URL, concern.getConcernId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{concern-id}")
    public ResponseEntity patchConcern(@PathVariable("concern-id") @Positive long concernId,
                                       @RequestBody ConcernDto.Patch concernPatchDto){

        Concern concern = concernService.updateConcern(mapper.concernPatchDtoToConcern(concernPatchDto));
        ConcernDto.Response response = mapper.concernToConcernResponseDto(concern);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{concern-id}")
    public ResponseEntity getConcern(@PathVariable("concern-id") @Positive long concernId){
        Concern concern = concernService.findConcern(concernId);
        ConcernDto.Response response = mapper.concernToConcernResponseDto(concern);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getConcerns() {
        List<Concern> concerns = concernService.findConcerns();
        List<ConcernDto.Response> responses = mapper.concernsToConcernResponseDtos(concerns);

        return new ResponseEntity<>(new ListResponseDto<>(responses),HttpStatus.OK);
    }

}
