package com.SebMainTeam13.team13.user.service;


import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
        private final UserRepository userRepository;
        private final ApplicationEventPublisher publisher;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

        public User createUser(User user) {
            verifyUserByEmail(user);

            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
            List<String> roles = authorityUtils.createRoles(member.getEmail());
            member.setRoles(roles);
            User savedUser = userRepository.save(user);



            return savedUser;
        }


        public User updateUser(User user) {
            Long userId = user.getUserId();
            User verifiedUser = verifyUserById(userId);
            verifyDeleteUser(verifiedUser);

            Optional.ofNullable(user.getDisplayName())
                    .ifPresent(verifiedUser::setDisplayName);

            return userRepository.save(verifiedUser);
        }


        public User getUser(long userId) {
            //TODO: 삭제된 회원 조회시 처리
            return userRepository.findById(userId).orElseThrow(() -> {
                throw new RuntimeException("멤버가 없음");
            });
        }


        public Page<User> getUsers(Pageable pageable) {
            PageRequest of = PageRequest.of(pageable.getPageNumber() - 1,
                    pageable.getPageSize(),
                    pageable.getSort());

            return userRepository.findAll(of);
        }


        public void deleteUser(long userId) {
            User user = verifyUserById(userId);
            verifyDeleteUser(user);
            user.setUserStatus(User.UserStatus.USER_DELETE);
            userRepository.save(user);
        }


        private void verifyUserByEmail(User user) {
            String email = user.getEmail();
            Optional<User> optionalUser = userRepository.findByEmail(email);
            optionalUser.ifPresent(s -> {
                throw new RuntimeException("멤버가 이미 존재함");
            });
        }

        private User verifyUserById(Long userId) {
            return userRepository.findById(userId)
                    .orElseThrow(() -> {
                        throw new RuntimeException("멤버가 존재 하지 않음");
                    });
        }

        private static void verifyDeleteUser(User user) {
            int userStatus = user.getUserStatus().getNums();
            if (userStatus == 3) {
                throw new RuntimeException("삭제된 회원");
            }
        }


        public Optional<User> findUserByEmail(String email) {
            return userRepository.findByEmail(email);
        }
}
