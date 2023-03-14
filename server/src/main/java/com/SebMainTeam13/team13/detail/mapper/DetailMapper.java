package com.SebMainTeam13.team13.detail.mapper;


import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@Component
@RequiredArgsConstructor
public class DetailMapper {
    private final UserMapper userMapper;

    public Detail detailPostDtoToDetail(DetailDto.Post post) {
        User user = new User();
        user.setUserId(post.getUserId());
        Detail detail = new Detail();
        detail.setAge(post.getAge());
        detail.setGender(post.getGender());
        detail.setUser(user);
//        List<DetailSupplement> detailSupplements = new ArrayList<>();
//        if (post.getSupplements() != null) {
//            detailSupplements = post.getSupplements()
//                    .stream()
//                    .map(Supplement::new)
//                    .map(Supplement -> {
//                        DetailSupplement detailSupplement = new DetailSupplement();
//                        detailSupplement.setDetail(detail);
//                        detailSupplement.setSupplement(Supplement);
//                        return detailSupplement;
//                    }).collect(Collectors.toList());
//        }
//        detail.setDetailSupplements(detailSupplements);
        return detail;
    }

    public Detail detailPatchDtoToDetail(DetailDto.Patch patch) {
        User user = new User();
        user.setUserId(patch.getUserId());
        Detail detail = new Detail();
        detail.setDetailId(patch.getDetailId());
        detail.setAge(patch.getAge());
        detail.setGender(patch.getGender());
        detail.setUser(user);
//        List<DetailSupplement> detailSupplements = patch.getSupplements()
//                .stream()
//                .map(Supplement::new)
//                .map(Supplement -> {
//                    DetailSupplement detailSupplement = new DetailSupplement();
//                    detailSupplement.setDetail(detail);
//                    detailSupplement.setSupplement(Supplement);
//                    return detailSupplement;
//                }).collect(Collectors.toList());
//        detail.setDetailSupplements(detailSupplements);
        return detail;
    }

    public DetailDto.Response detailToDetailResponseDto(Detail detail) {
//        List<String> SupplementNames = detail.getDetailSupplements().stream()
//                .map(detailSupplement -> detailSupplement.getSupplement().getName())
//                .collect(Collectors.toList());
        UserDto.Response userresponse = userMapper.userToUserResponseDto(detail.getUser());

        return DetailDto.Response.builder()
                .detailId(detail.getDetailId())
                .age(detail.getAge())
                .gender(detail.getGender())
 //               .owner(userresponse)
 //               .Supplements(SupplementNames)
 //               .detailType(detail.getDetailType())
                .build();
    }

    public List<DetailDto.Response> detailsToDetailResponseDtos(List<Detail> details) {
        return details.stream()
                .map(this::detailToDetailResponseDto)
                .collect(Collectors.toList());
    }

}