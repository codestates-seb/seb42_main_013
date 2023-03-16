package com.SebMainTeam13.team13.detailSupplement.controller;

import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.service.DetailService;
import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.mapper.DetailSupplementMapper;
import com.SebMainTeam13.team13.detailSupplement.service.DetailSupplementService;
import com.SebMainTeam13.team13.dto.SingleResponseDto;

import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.service.UserService;
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
    private final DetailService detailService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity postDetailSupplement(@Valid @RequestBody DetailSupplementDto.Post post) {
//TODO:: userID 토큰에서 받기   Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= 1L;
        DetailSupplement detailSupplement = detailSupplementService.createDetailSupplement(detailSupplementMapper.detailSupplementPostDtoToDetailSupplement(post),userId);
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detailSupplement.getDetailSupplementId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{supplement-name}")
    public ResponseEntity patchDetailSupplement(@PathVariable("supplement-name")  String  supplementName,
                                          @Valid @RequestBody DetailSupplementDto.Patch patch) {
//TODO:: userID 토큰에서 받기   Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId=1L;
        DetailSupplement detailSupplement = detailSupplementService.updateDetailSupplement(detailSupplementMapper.detailSupplementPatchDtoToDetailSupplement(patch,supplementName),userId);
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping("/{supplement-name}")
    public ResponseEntity getSupplement(@PathVariable("supplement-name") String supplementName) {
//TODO:: userID 토큰에서 받기   Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId=1L;
        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByUserIDAndSupplementName(userId,supplementName);

//        Long userIdAuthed = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }

}
