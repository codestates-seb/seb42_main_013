package com.SebMainTeam13.team13.user.mapper;

import com.SebMainTeam13.team13.concern.dto.ConcernDto;
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.dto.SupplementDto;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final SupplementRepository supplementRepository;

    public UserDto.Response userToUserResponseDto(User user) {
        return UserDto.Response.builder()

                .email(user.getEmail())
                .displayName(user.getDisplayName())

                .build();
    }

    public User userPostToUser(UserDto.Post postDto) {
        return User.builder()
                .email(postDto.getEmail())
                .password(postDto.getPassword())
                .displayName(postDto.getDisplayName())
                .build();
    }

    public User userPatchToUser(UserDto.Patch patchDto) {
        return User.builder()
                .userId(patchDto.getUserId())
                .displayName(patchDto.getDisplayName())
                .build();
    }
//    public UserDto.Response userToResponse(User user) {
//        List<ConcernDto.ResponseForUser> concerns = user.getDetail().getConcerns().stream()
//                .map(concern -> {
//                    if (concern != null) {
//                        return ConcernDto.ResponseForUser.builder()
//                                .concernId(concern.getConcernId())
//                                .title(concern.getTitle())
//                                .build();
//                    } else {
//                        // Concern이 null인 경우, 예외처리 또는 로깅 등의 대응이 필요합니다.
//                        return null;
//                    }
//                })
//                .filter(Objects::nonNull)
//                .collect(Collectors.toList());
//
//        List<Supplement> supplements = user.getDetail().getConcerns()
//            .stream()
//            .flatMap(concern -> concern.getSupplements().stream())
//            .collect(Collectors.toList());
//
//      List<Supplement> sortedSupplements = supplements.stream()
//           .sorted(Comparator.comparingInt(Supplement::getNumberSearched).reversed())
//          .distinct()
//           .limit(3)
//           .collect(Collectors.toList());
//
//        List<SupplementDto.ResponseForUser> supplementDtos = sortedSupplements.stream()
//                .map(s -> SupplementDto.ResponseForUser.builder()
//                        .supplementName(Arrays.stream(s.getSupplementName().split(" ")).limit(3).collect(Collectors.joining(" ")))
//                        .imageURL(s.getImageURL())
//                        .build())
//                .collect(Collectors.toList());
//
//
//
//
//        Detail detail = user.getDetail();
//        DetailDto.Response detailDto =
//                            DetailDto.Response.builder()
//                            .detailId(detail.getDetailId())
//                            .birthDate(detail.getBirthDate())
//                            .gender(detail.getGender())
//                            .build();
//
//
//
//
//        return UserDto.Response.builder()
//                .email(user.getEmail())
//                .displayName(user.getDisplayName())
//                .detail(detailDto)
//                .supplements(supplementDtos)
//                .concerns(concerns)
//
//
//
//
//
//                .build();
//    }
//    public List<UserDto.Response> usersToResponses(List<User> users) {
//        return users.stream().map(this::userToResponse).collect(Collectors.toList());
//    }
//
//
//}

    public UserDto.Response userToResponse(User user) {
        List<ConcernDto.ResponseForUser> concerns = user.getDetail().getConcerns().stream()
                .map(concern -> {
                    if (concern != null) {
                        return ConcernDto.ResponseForUser.builder()
                                .concernId(concern.getConcernId())
                                .title(concern.getTitle())
                                .build();
                    } else {
                        // Concern이 null인 경우, 예외처리 또는 로깅 등의 대응이 필요합니다.
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        List<Supplement> supplements = user.getDetail().getConcerns()
                .stream()
                .map(concern -> {
                    Long concernId = concern.getConcernId();
                    List<Supplement> concernSupplements = new ArrayList<>();
                    for (int i = 1; i <= 4; i++) {
                        Optional<Supplement> supplementOptional = supplementRepository.findById((concernId - 1) * 4 + i);
                        if (supplementOptional.isPresent()) {
                            Supplement supplement = supplementOptional.get();
                            concernSupplements.add(supplement);
                        }
                    }
                    return concernSupplements;
                })
                .flatMap(List::stream)
                .collect(Collectors.toList());

        List<SupplementDto.ResponseForUser> supplementDtos = supplements.stream()
                .map(s -> SupplementDto.ResponseForUser.builder()
                        .supplementName(Arrays.stream(s.getSupplementName().split(" ")).limit(3).collect(Collectors.joining(" ")))
                        .imageURL(s.getImageURL())
                        .build())
                .collect(Collectors.toList());

        Detail detail = user.getDetail();
        DetailDto.Response detailDto = DetailDto.Response.builder()
                .detailId(detail.getDetailId())
                .birthDate(detail.getBirthDate())
                .gender(detail.getGender())
                .build();

        return UserDto.Response.builder()
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .detail(detailDto)
                .supplements(supplementDtos)
                .concerns(concerns)
                .build();
    }

    public List<UserDto.Response> usersToResponses(List<User> users) {
        return users.stream().map(this::userToResponse).collect(Collectors.toList());
    }
}