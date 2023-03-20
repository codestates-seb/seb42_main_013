package com.SebMainTeam13.team13.detail.controller;


import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.mapper.DetailMapper;
import com.SebMainTeam13.team13.detail.service.DetailService;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.user.service.UserService;
import com.SebMainTeam13.team13.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/details")
@Validated
@RequiredArgsConstructor
public class DetailController {
    private final static String DETAIL_DEFAULT_URL = "/details";
    private final DetailService detailService;
    private final DetailMapper detailMapper;
    private final UserService userService;
    @PostMapping
    public ResponseEntity postDetail(@Valid @RequestBody DetailDto.Post post) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        Detail detail = detailService.createDetail(detailMapper.detailPostDtoToDetail(post),userId);
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detail.getDetailId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity patchDetail(@Valid @RequestBody DetailDto.Patch patch) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        Detail detail = detailService.updateDetail(detailMapper.detailPatchDtoToDetail(patch),userId);
        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getDetail() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        Detail detail = detailService.findDetail(userId);
        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }



    @DeleteMapping("/{detailId}")
    public ResponseEntity deleteDetail(@PathVariable long detailId) {
        detailService.deleteDetail(detailId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
