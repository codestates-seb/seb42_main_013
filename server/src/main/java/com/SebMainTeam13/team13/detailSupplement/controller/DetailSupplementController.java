package com.SebMainTeam13.team13.detailSupplement.controller;

import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.mapper.DetailSupplementMapper;
import com.SebMainTeam13.team13.detailSupplement.service.DetailSupplementService;
import com.SebMainTeam13.team13.dto.SingleResponseDto;

import com.SebMainTeam13.team13.utils.UriCreator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/detailSupplements")
@Validated
@RequiredArgsConstructor
public class DetailSupplementController {
    private final static String DETAIL_DEFAULT_URL = "/detailSupplements";
    private final DetailSupplementService detailSupplementService;
    private final DetailSupplementMapper detailSupplementMapper;

    @PostMapping
    public ResponseEntity postDetailSupplement(@Valid @RequestBody DetailSupplementDto.Post post) {
//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        DetailSupplement detailSupplement = detailSupplementService.createDetailSupplement(detailSupplementMapper.detailSupplementPostDtoToDetailSupplement(post));
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detailSupplement.getDetailSupplementId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{detailSupplement-id}")
    public ResponseEntity patchDetailSupplement(@PathVariable("detailSupplement-id") @Positive long detailSupplementId,
                                          @Valid @RequestBody DetailSupplementDto.Patch patch) {
//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        DetailSupplement detailSupplement = detailSupplementService.updateDetailSupplement(detailSupplementMapper.detailSupplementPatchDtoToDetailSupplement(patch));
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping("/{detailSupplement-id}")
    public ResponseEntity getSupplement(@PathVariable("detailSupplement-id") long detailSupplementId) {
        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByDetailSupplementId(detailSupplementId);

//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }

}
