package com.SebMainTeam13.team13.user.service;


import com.SebMainTeam13.team13.auth.utils.AuthorityUtils;
import com.SebMainTeam13.team13.exception.BusinessLogicException;
import com.SebMainTeam13.team13.jwt.JwtTokenizer;
import com.SebMainTeam13.team13.security.repository.RefreshTokenRepository;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.repository.UserRepository;
import com.nimbusds.jose.util.Pair;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static com.SebMainTeam13.team13.exception.ExceptionCode.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityUtils authorityUtils;

    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;


    public User createUser(User user) {
        verifyUserByEmail(user);

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

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
        //TODO: 삭제된 회원 조회 불가하도록 하는 기능이 없음
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

    public Long findUserIdByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) throw new RuntimeException("멤버가 존재 하지 않음");


        return optionalUser.get().getUserId();
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

    public Pair<Long, String> checkToken(HttpHeaders requestHeaders) {

        try {
            String token = requestHeaders.getFirst("Authorization").substring(7);
            Set<String> headerKeys = requestHeaders.keySet();
            for (String key : headerKeys) {
                System.out.println(key);
            }
            JwtParser parser = Jwts.parserBuilder()
                    .setSigningKey(jwtTokenizer.getSecretKey().getBytes())
                    .build();
            Jws<Claims> jws = parser.parseClaimsJws(token);
            String subject = jws.getBody().getSubject();
            return Pair.of(userRepository.findByEmail(subject).get().getUserId(), null);

            // 액세스 토큰이 유효한 경우
        }

        catch (ExpiredJwtException e) {
            Optional<String> refreshTokenOpt = requestHeaders.containsKey("refresh") ? requestHeaders.get("refresh").stream().findFirst() : Optional.empty();
            if(refreshTokenOpt.isEmpty()) throw new BusinessLogicException(ACCESS_TOKEN_EXPIRED);

            if (refreshTokenOpt.isPresent()) {
                String token = refreshTokenOpt.get();
                 User userFromToken = refreshTokenRepository.findByToken(token).get().getUser();
                 String username = e.getClaims().get("username").toString();
                 User user = userRepository.findByEmail(username).get();


                if(user.getUserId()==userFromToken.getUserId()) {

                    Map<String, Object> claims = new HashMap<>();
                    claims.put("type", "accessToken");

                    Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
                    String newAccessToken = jwtTokenizer.generateAccessToken(claims, username, expiration, jwtTokenizer.getSecretKey());
                    return Pair.of(userRepository.findByEmail(username).get().getUserId(), newAccessToken);
                }
            }

        }
        throw new RuntimeException("authization failed");
    }
}
