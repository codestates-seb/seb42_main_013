package com.SebMainTeam13.team13.supplement.controller;

import com.SebMainTeam13.team13.dto.MultiResponseDto;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.mapper.SupplementMapper;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import com.SebMainTeam13.team13.supplement.service.SupplementService;
import com.SebMainTeam13.team13.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/supplements")
@Validated
@RequiredArgsConstructor
public class SupplementController {
    private final static String DETAIL_DEFAULT_URL = "/supplements";
    private final SupplementService supplementService;
    private final SupplementMapper supplementMapper;
    private final SupplementRepository supplementRepository;

    @PostMapping
    public ResponseEntity postSupplement(@Valid @RequestBody SupplementDto.Post post) {
//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Supplement supplement = supplementService.createSupplement(supplementMapper.supplementPostDtoToSupplement(post));
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, supplement.getSupplementId());
        SupplementDto.Response response = supplementMapper.supplementToSupplementResponseDto(supplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping("/{supplement-id}")
    public ResponseEntity patchSupplement(@PathVariable("supplement-id") @Positive long supplementId,
                                      @Valid @RequestBody SupplementDto.Patch patch) {
//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Supplement supplement = supplementService.updateSupplement(supplementMapper.supplementPatchDtoToSupplement(patch),supplementId);
        SupplementDto.Response response = supplementMapper.supplementToSupplementResponseDto(supplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping("/{supplement-id}")
    public ResponseEntity getSupplement(@PathVariable("supplement-id") Long supplementId) {
        Supplement supplement = supplementService.findAndVerifySupplementBySupplementId(supplementId);

//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        SupplementDto.Response response = supplementMapper.supplementToSupplementResponseDto(supplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }
    @GetMapping("/name/{supplement-name}")
    public ResponseEntity getSupplement(@PathVariable("supplement-name") String supplementName) {
        List<Supplement> supplements = supplementRepository.findBySupplementNameContaining(supplementName);

//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<SupplementDto.Response> response = supplementMapper.supplementsToSupplementResponseDtos(supplements);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }



}
