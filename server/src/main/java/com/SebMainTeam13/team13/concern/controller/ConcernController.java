package com.SebMainTeam13.team13.concern.controller;

import com.SebMainTeam13.team13.concern.dto.ConcernDto;
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.mapper.ConcernMapper;
import com.SebMainTeam13.team13.concern.service.ConcernService;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/concerns")
public class ConcernController {

    private final static String CONCERN_DEFAULT_URL = "/concerns";

    private final ConcernService concernService;
    private final ConcernMapper mapper;

    public ConcernController(ConcernService concernService, ConcernMapper mapper) {
        this.concernService = concernService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postConcern(@RequestBody ConcernDto.Post concernPostDto){
        Concern concern = concernService.createConcern(mapper.concernPostDtoToConcern(concernPostDto));
        URI location = UriCreator.createUri(CONCERN_DEFAULT_URL, concern.getConcernId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{concern-id}")
    public ResponseEntity patchConcern(@PathVariable("concern-id") @Positive long concernId,
                                       @RequestBody ConcernDto.Patch concernPatchDto){
        concernPatchDto.setConcernId(concernId);
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

//    @GetMapping
//    public ResponseEntity getConcerns(){
//        List<Concern> concernList = concernService.findConcerns();
//
//        List<ConcernDto.Response> responses = mapper.concernsToConcernResponseDtos(concernList);
//
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }
}
