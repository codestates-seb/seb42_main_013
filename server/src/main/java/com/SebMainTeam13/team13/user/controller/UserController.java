package com.SebMainTeam13.team13.user.controller;

import com.SebMainTeam13.team13.dto.MultiResponseDto;
import com.SebMainTeam13.team13.dto.SingleResponseDto;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.mapper.UserMapper;
import com.SebMainTeam13.team13.user.service.UserService;
import com.SebMainTeam13.team13.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Transactional
public class UserController {
    private final static String USERS_DEFAULT_URL = "/users";
    private final UserMapper mapper;
    private final UserService userService;


    @PostMapping
    public ResponseEntity createUser(@Valid @RequestBody UserDto.Post postDto) {
        User user = userService.createUser(mapper.userPostToUser(postDto));
        URI location = UriCreator.createUri(USERS_DEFAULT_URL, user.getUserId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{userId}")
    public ResponseEntity updateUser(@PathVariable @Positive long userId,
                                     @Valid @RequestBody UserDto.Patch patchDto) {
        patchDto.setUserId(userId);
        User user = userService.updateUser(mapper.userPatchToUser(patchDto));
        UserDto.Response response = mapper.userToUserResponseDto(user);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity updateMe(@Valid @RequestBody UserDto.Patch patchDto) {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        User user = (mapper.userPatchToUser(patchDto));
        user.setUserId(userId);
        userService.updateUser(user);
        UserDto.Response response = mapper.userToUserResponseDto(user);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getUser() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        User user = userService.getUser(userId);
        UserDto.Response response = mapper.userToResponse(user);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteUser() {
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId= userService.findUserIdByEmail(principal);
        userService.deleteUser(userId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
