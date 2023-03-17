package com.SebMainTeam13.team13.user.mapper;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
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
    public UserDto.Response userToResponse(User user) {
      List<String> supplementNames = new ArrayList<>();
      if(user.getDetail().getConcerns()!=null) {
              List<Concern> concerns = user.getDetail().getConcerns();


              for (Concern i : concerns) {
                  List<Supplement> supplements = i.getSupplements();

                  for (Supplement j : supplements) {
                      supplementNames.add(j.getSupplementName());
                  }

              }
      }


        Detail detail = user.getDetail();
        DetailDto.Response detailDto =
                            DetailDto.Response.builder()
                            .detailId(detail.getDetailId())
                            .birthDate(detail.getBirthDate())
                            .gender(detail.getGender())
                            .build();




        return UserDto.Response.builder()
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .detail(detailDto)
                .supplementNames(supplementNames)





                .build();
    }
    public List<UserDto.Response> usersToResponses(List<User> users) {
        return users.stream().map(this::userToResponse).collect(Collectors.toList());
    }


}
