package com.SebMainTeam13.team13.security.handler;

import com.SebMainTeam13.team13.jwt.JwtTokenizer;
import com.SebMainTeam13.team13.security.entity.RefreshToken;
import com.SebMainTeam13.team13.security.repository.RefreshTokenRepository;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        User user = (User) authentication.getPrincipal();
        String refreshToken = response.getHeader("Refresh");
        LocalDateTime expiryDateTime = LocalDateTime.now().plusMinutes(jwtTokenizer.getRefreshTokenExpirationMinutes());

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(refreshToken);
        token.setExpiryDateTime(expiryDateTime);
        user.setRefreshToken(token);

        refreshTokenRepository.save(token);
        log.info("# Authentication succeeded");
    }
}
