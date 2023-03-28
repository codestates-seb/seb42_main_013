package com.SebMainTeam13.team13.detailSupplement.controller;

import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.mapper.DetailSupplementMapper;
import com.SebMainTeam13.team13.detailSupplement.repository.DetailSupplementRepository;
import com.SebMainTeam13.team13.detailSupplement.service.DetailSupplementService;
import com.SebMainTeam13.team13.dto.ListResponseDto;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
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
import java.util.List;


@RestController
@RequestMapping("/detailSupplements")
@Validated
@RequiredArgsConstructor
public class DetailSupplementController {
    private final static String DETAIL_DEFAULT_URL = "/detailSupplements";
    private final DetailSupplementService detailSupplementService;
    private final DetailSupplementMapper detailSupplementMapper;

    private final UserService userService;
    @PostMapping
    public ResponseEntity postDetailSupplement(@Valid @RequestBody DetailSupplementDto.Post post) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(principal);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (newAccessToken != null) {
            headers.set("Authorization", "Bearer " + newAccessToken);
        }

        DetailSupplement detailSupplement = detailSupplementService.createDetailSupplement(detailSupplementMapper.detailSupplementPostDtoToDetailSupplement(post),userId);
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detailSupplement.getDetailSupplementId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{detailSupplement-id}")
    public ResponseEntity patchDetailSupplement(@PathVariable("detailSupplement-id")  Long  detailSupplementId,
                                          @Valid @RequestBody DetailSupplementDto.Patch patch) {

        DetailSupplement detailSupplement = detailSupplementService.updateDetailSupplement(detailSupplementMapper.detailSupplementPatchDtoToDetailSupplement(patch,detailSupplementId),detailSupplementId);
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping("/{detailSupplement-id}")
    public ResponseEntity getDetailSupplement(@PathVariable("detailSupplement-id") Long detailSupplementId) {

        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByDetailSupplementId(detailSupplementId);
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getDetailSupplements() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(principal);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (newAccessToken != null) {
            headers.set("Authorization", "Bearer " + newAccessToken);
        }

        List<DetailSupplement> detailSupplements = detailSupplementService.findDetailSupplements(userId);
        List<DetailSupplementDto.Response> responses = detailSupplementMapper.detailSupplementsToDetailSupplementResponseDtos(detailSupplements);

        return new ResponseEntity<>(new ListResponseDto<>(responses),HttpStatus.OK);
    }
    @DeleteMapping("/{detailSupplement-id}")
    public ResponseEntity deleteDetailSupplement(@PathVariable("detailSupplement-id") Long detailSupplementId) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pair<Long, String> userIdAndTokenPair = userService.checkToken(principal);
        Long userId = userIdAndTokenPair.getLeft();
        String newAccessToken = userIdAndTokenPair.getRight();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (newAccessToken != null) {
            headers.set("Authorization", "Bearer " + newAccessToken);
        }

        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByDetailSupplementId(detailSupplementId);
        detailSupplementService.deleteDetailSupplement(detailSupplement,userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

