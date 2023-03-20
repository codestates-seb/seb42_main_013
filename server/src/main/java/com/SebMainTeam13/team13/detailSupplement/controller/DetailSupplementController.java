package com.SebMainTeam13.team13.detailSupplement.controller;

import com.SebMainTeam13.team13.detailSupplement.dto.DetailSupplementDto;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.mapper.DetailSupplementMapper;
import com.SebMainTeam13.team13.detailSupplement.service.DetailSupplementService;
import com.SebMainTeam13.team13.dto.ListResponseDto;
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
        Long userId= userService.findUserIdByEmail(principal);
        DetailSupplement detailSupplement = detailSupplementService.createDetailSupplement(detailSupplementMapper.detailSupplementPostDtoToDetailSupplement(post),userId);
        URI location = UriCreator.createUri(DETAIL_DEFAULT_URL, detailSupplement.getDetailSupplementId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{supplement-name}")
    public ResponseEntity patchDetailSupplement(@PathVariable("supplement-name")  String  supplementName,
                                          @Valid @RequestBody DetailSupplementDto.Patch patch) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        DetailSupplement detailSupplement = detailSupplementService.updateDetailSupplement(detailSupplementMapper.detailSupplementPatchDtoToDetailSupplement(patch,supplementName),userId);
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping("/{supplement-name}")
    public ResponseEntity getSupplement(@PathVariable("supplement-name") String supplementName) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByUserIDAndSupplementName(userId,supplementName);
        DetailSupplementDto.Response response = detailSupplementMapper.detailSupplementToDetailSupplementResponseDto(detailSupplement);

        return new ResponseEntity<>(new SingleResponseDto<>(response),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getSupplements() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        List<DetailSupplement> detailSupplements = detailSupplementService.findDetailSupplements(userId);
        List<DetailSupplementDto.Response> responses = detailSupplementMapper.detailSupplementsToDetailSupplementResponseDtos(detailSupplements);

        return new ResponseEntity<>(new ListResponseDto<>(responses),HttpStatus.OK);
    }
    @DeleteMapping("/{supplement-name}")
    public ResponseEntity deleteQuestion(@PathVariable("supplement-name") String supplementName) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        DetailSupplement detailSupplement = detailSupplementService.findAndVerifyDetailSupplementByUserIDAndSupplementName(userId,supplementName);

        detailSupplementService.deleteDetailSupplement(detailSupplement);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

