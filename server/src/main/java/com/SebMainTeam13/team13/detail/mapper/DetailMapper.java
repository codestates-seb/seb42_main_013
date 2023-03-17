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
        return Detail.builder()

                .birthDate(post.getBirthDate())
                .gender(post.getGender())
                .build();
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

    }

    public Detail detailPatchDtoToDetail(DetailDto.Patch patch) {
        return Detail.builder()
                .detailId(patch.getDetailId())
                .birthDate(patch.getBirthDate())
                .gender(patch.getGender())
                .build();
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

    }

    public DetailDto.Response detailToDetailResponseDto(Detail detail) {
//        List<String> SupplementNames = detail.getDetailSupplements().stream()
//                .map(detailSupplement -> detailSupplement.getSupplement().getName())
//                .collect(Collectors.toList());
        UserDto.Response userresponse = userMapper.userToUserResponseDto(detail.getUser());

        return DetailDto.Response.builder()
                .detailId(detail.getDetailId())
                .birthDate(detail.getBirthDate())
                .gender(detail.getGender())
 //               .owner(userresponse)
 //               .Supplements(SupplementNames)
 //               .detailType(detail.getDetailType())
                .build();
    }

//    public List<DetailDto.Response> detailsToDetailResponseDtos(List<Detail> details) {
//        return details.stream()
//                .map(this::detailToDetailResponseDto)
//                .collect(Collectors.toList());
//    }

}