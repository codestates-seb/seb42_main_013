package com.SebMainTeam13.team13.detail.controller;


import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.mapper.DetailMapper;
import com.SebMainTeam13.team13.detail.service.DetailService;
import com.SebMainTeam13.team13.dto.MultiResponseDto;
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
@RequestMapping("/details")
@Validated
@RequiredArgsConstructor
@Slf4j
public class DetailController {
    private final static String DETAIL_DEFAULT_URL = "/details";
    private final DetailService detailService;
    private final DetailMapper detailMapper;

    @PostMapping
    public ResponseEntity postDetail(@Valid @RequestBody DetailDto.Post post) {
 //       Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Detail detail = detailService.createDetail(detailMapper.detailPostDtoToDetail(post));
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detail.getDetailId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{detail-id}")
    public ResponseEntity patchDetail(@PathVariable("detail-id") @Positive long detailId,
                                        @Valid @RequestBody DetailDto.Patch patch) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        patch.setUserId(userId);
        patch.setDetailId(detailId);
        Detail detail = detailService.updateDetail(detailMapper.detailPatchDtoToDetail(patch));
        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{detail-id}")
    public ResponseEntity getDetail(@PathVariable("detail-id") long detailId) {
        Detail detail = detailService.findDetail(detailId);

        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);
        response.setUserId(detail.getUser().getUserId());
        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }



    @DeleteMapping("/{detailId}")
    public ResponseEntity deleteDetail(@PathVariable long detailId) {
        detailService.deleteDetail(detailId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
