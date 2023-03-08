package com.SebMainTeam13.team13.user.mapper;

import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserDto.Response userToUserResponseDto(User user) {
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .userStatus(user.getUserStatus())
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
        return new UserDto.Response(user);
    }
    public List<UserDto.Response> usersToResponses(List<User> users) {
        return users.stream().map(this::userToResponse).collect(Collectors.toList());
    }


}
