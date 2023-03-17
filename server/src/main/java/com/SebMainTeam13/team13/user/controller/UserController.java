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
    @GetMapping("/{userId}")
    public ResponseEntity getUser(@PathVariable @Positive long userId) {
        User user = userService.getUser(userId);
        UserDto.Response response = mapper.userToUserResponseDto(user);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getUsers(Pageable pageable) {
        Page<User> pageUser = userService.getUsers(pageable);
        List<User> users = pageUser.getContent();
        List<UserDto.Response> responses = mapper.usersToResponses(users);

        return new ResponseEntity(new MultiResponseDto<>(responses, pageUser), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable @Positive Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}