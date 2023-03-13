package com.SebMainTeam13.team13.security.config;


import com.SebMainTeam13.team13.auth.handler.UserAccessDeniedHandler;
import com.SebMainTeam13.team13.auth.handler.UserAuthenticationEntryPoint;
import com.SebMainTeam13.team13.auth.utils.AuthorityUtils;
import com.SebMainTeam13.team13.jwt.JwtTokenizer;
import com.SebMainTeam13.team13.security.filter.JwtAuthenticationFilter;
import com.SebMainTeam13.team13.security.filter.JwtVerificationFilter;
import com.SebMainTeam13.team13.security.handler.JWTAuthenticationFailureHandler;
import com.SebMainTeam13.team13.security.handler.JwtAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@Import(CorsConfig.class)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final AuthorityUtils authorityUtils;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/users").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/*/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/users").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/users/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/users/**").hasRole("USER")
                        .anyRequest().permitAll()
                );
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // (2) 추가

            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new JwtAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new JWTAuthenticationFailureHandler());

            builder.addFilter(jwtAuthenticationFilter)
            .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
