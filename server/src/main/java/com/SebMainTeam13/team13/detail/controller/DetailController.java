package com.SebMainTeam13.team13.detail.controller;


import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.mapper.DetailMapper;
import com.SebMainTeam13.team13.detail.service.DetailService;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.user.service.UserService;
import com.SebMainTeam13.team13.utils.UriCreator;
import com.nimbusds.jose.util.Pair;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    public ResponseEntity postDetail(@Valid @RequestBody DetailDto.Post post,@RequestHeader("Authorization") HttpHeaders requestHeaders) {
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(requestHeaders);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();



        Detail detail = detailService.createDetail(detailMapper.detailPostDtoToDetail(post),userId);
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detail.getDetailId());
        if (newAccessToken != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + newAccessToken);

            return ResponseEntity.created(location).headers(headers).build();
        }
        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity patchDetail(@Valid @RequestBody DetailDto.Patch patch,@RequestHeader("Authorization") HttpHeaders requestHeaders) {
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(requestHeaders);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();

        Detail detail = detailService.updateDetail(detailMapper.detailPatchDtoToDetail(patch),userId);
        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);

        if (newAccessToken != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + newAccessToken);
            return new ResponseEntity<>(new SingleResponseDto<>(response), headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getDetail(@RequestHeader("Authorization") HttpHeaders requestHeaders) {
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(requestHeaders);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();



        Detail detail = detailService.findDetail(userId);
        DetailDto.Response response = detailMapper.detailToDetailResponseDto(detail);

        if (newAccessToken != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + newAccessToken);
            return new ResponseEntity<>(new SingleResponseDto<>(response), headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }



    @DeleteMapping("/{detailId}")
    public ResponseEntity deleteDetail(@PathVariable long detailId) {
        detailService.deleteDetail(detailId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
