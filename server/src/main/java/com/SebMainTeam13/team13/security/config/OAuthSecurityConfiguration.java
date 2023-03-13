<<<<<<< Updated upstream
package com.SebMainTeam13.team13.security.config;


import com.SebMainTeam13.team13.auth.handler.OAuth2SuccessHandler;
import com.SebMainTeam13.team13.auth.handler.UserAccessDeniedHandler;
import com.SebMainTeam13.team13.auth.handler.UserAuthenticationEntryPoint;
import com.SebMainTeam13.team13.auth.utils.AuthorityUtils;
import com.SebMainTeam13.team13.jwt.JwtTokenizer;
import com.SebMainTeam13.team13.security.filter.JwtAuthenticationFilter;
import com.SebMainTeam13.team13.security.filter.JwtVerificationFilter;
import com.SebMainTeam13.team13.user.service.OAuthUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;
@Configuration
@RequiredArgsConstructor
@Import(CorsConfig.class)
public class OAuthSecurityConfiguration {
        private final JwtTokenizer jwtTokenizer;
        private final AuthorityUtils authorityUtils;
        private final OAuthUserService userService;




        @Bean
        public SecurityFilterChain OAuthFilterChain(HttpSecurity http) throws Exception {
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
                    .apply(new OAuthCustomFilterConfigurer())
                    .and()
                    .authorizeHttpRequests(authorize -> authorize

                                    .anyRequest().permitAll()
                    )
                    .oauth2Login(oauth2 -> oauth2
                            .successHandler(new OAuth2SuccessHandler(jwtTokenizer, authorityUtils, userService))
                    );

            return http.build();
        }

        @Bean
        CorsConfigurationSource OAuthCorsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);

            return source;
        }

        public class OAuthCustomFilterConfigurer extends AbstractHttpConfigurer<OAuthCustomFilterConfigurer, HttpSecurity> {
            @Override
            public void configure(HttpSecurity builder) throws Exception {
                AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

                JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
                JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

                jwtAuthenticationFilter.setFilterProcessesUrl("/Oauth/login");

                builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
            }
        }
    }

=======
//package com.SebMainTeam13.team13.security.config;
//
//
//import com.SebMainTeam13.team13.auth.handler.OAuth2SuccessHandler;
//import com.SebMainTeam13.team13.auth.handler.UserAccessDeniedHandler;
//import com.SebMainTeam13.team13.auth.handler.UserAuthenticationEntryPoint;
//import com.SebMainTeam13.team13.auth.utils.AuthorityUtils;
//import com.SebMainTeam13.team13.jwt.JwtTokenizer;
//import com.SebMainTeam13.team13.security.filter.JwtAuthenticationFilter;
//import com.SebMainTeam13.team13.security.filter.JwtVerificationFilter;
//import com.SebMainTeam13.team13.user.service.OAuthUserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Import;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@RequiredArgsConstructor
//@Import(CorsConfig.class)
//public class OAuthSecurityConfiguration {
//        private final JwtTokenizer jwtTokenizer;
//        private final AuthorityUtils authorityUtils;
//        private final OAuthUserService userService;
//
//
//
//
//        @Bean
//        public SecurityFilterChain OAuthFilterChain(HttpSecurity http) throws Exception {
//            http
//                    .headers().frameOptions().sameOrigin()
//                    .and()
//                    .csrf().disable()
//                    .cors(withDefaults())
//                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                    .and()
//                    .formLogin().disable()
//                    .httpBasic().disable()
//                    .exceptionHandling()
//                    .authenticationEntryPoint(new UserAuthenticationEntryPoint())
//                    .accessDeniedHandler(new UserAccessDeniedHandler())
//                    .and()
//                    .apply(new OAuthCustomFilterConfigurer())
//                    .and()
//                    .authorizeHttpRequests(authorize -> authorize
//
//                                    .anyRequest().permitAll()
//                    )
//                    .oauth2Login(oauth2 -> oauth2
//                            .successHandler(new OAuth2SuccessHandler(jwtTokenizer, authorityUtils, userService))
//                    );
//
//            return http.build();
//        }
//
//        @Bean
//        CorsConfigurationSource OAuthCorsConfigurationSource() {
//            CorsConfiguration configuration = new CorsConfiguration();
//            configuration.setAllowedOrigins(Arrays.asList("*"));
//            configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
//            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//            source.registerCorsConfiguration("/**", configuration);
//
//            return source;
//        }
//
//        public class OAuthCustomFilterConfigurer extends AbstractHttpConfigurer<OAuthCustomFilterConfigurer, HttpSecurity> {
//            @Override
//            public void configure(HttpSecurity builder) throws Exception {
//                AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
//
//                JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
//                JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
//
//                jwtAuthenticationFilter.setFilterProcessesUrl("/Oauth/login");
//
//                builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
//            }
//        }
//    }
//
>>>>>>> Stashed changes
