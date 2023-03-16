package com.SebMainTeam13.team13.supplement.mapper;


import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class SupplementMapper {

    public Supplement supplementPostDtoToSupplement(SupplementDto.Post post) {
        return  Supplement.builder()
                .supplementName(post.getSupplementName())
                .nutrients(post.getNutrients())
                .supplementType(post.getSupplementType())
                .imageURL(post.getImageURL())


                .build();

//        List<SupplementSupplement> supplementSupplements = new ArrayList<>();
//        if (post.getSupplements() != null) {
//            supplementSupplements = post.getSupplements()
//                    .stream()
//                    .map(Supplement::new)
//                    .map(Supplement -> {
//                        SupplementSupplement supplementSupplement = new SupplementSupplement();
//                        supplementSupplement.setSupplement(supplement);
//                        supplementSupplement.setSupplement(Supplement);
//                        return supplementSupplement;
//                    }).collect(Collectors.toList());
//        }
//        supplement.setSupplementSupplements(supplementSupplements);
    }

    public Supplement supplementPatchDtoToSupplement(SupplementDto.Patch patch) {
        return Supplement.builder()
                .supplementName(patch.getSupplementName())
                .nutrients(patch.getNutrients())
                .supplementType(patch.getSupplementType())
                .imageURL(patch.getImageURL())

                .build();
//        List<SupplementSupplement> supplementSupplements = patch.getSupplements()
//                .stream()
//                .map(Supplement::new)
//                .map(Supplement -> {
//                    SupplementSupplement supplementSupplement = new SupplementSupplement();
//                    supplementSupplement.setSupplement(supplement);
//                    supplementSupplement.setSupplement(Supplement);
//                    return supplementSupplement;
//                }).collect(Collectors.toList());
//        supplement.setSupplementSupplements(supplementSupplements);

    }

    public SupplementDto.Response supplementToSupplementResponseDto(Supplement supplement) {
//        List<String> SupplementNames = supplement.getSupplementSupplements().stream()
//                .map(supplementSupplement -> supplementSupplement.getSupplement().getName())
//                .collect(Collectors.toList());
//        UserDto.Response userresponse = userMapper.userToUserResponseDto(supplement.getUser());
            return SupplementDto.Response.builder()
                    .supplementName(supplement.getSupplementName())
                    .nutrients(supplement.getNutrients())
                    .imageURL(supplement.getImageURL())
                    .supplementType(supplement.getSupplementType())



                    .build();

  //  }

//    public List<SupplementDto.Response> supplementsToSupplementResponseDtos(List<Supplement> supplements) {
//        return supplements.stream()
//                .map(this::supplementToSupplementResponseDto)
//                .collect(Collectors.toList());
    }

}