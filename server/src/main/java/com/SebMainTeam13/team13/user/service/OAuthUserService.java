package com.SebMainTeam13.team13.user.service;


import com.SebMainTeam13.team13.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.SebMainTeam13.team13.user.entity.User;



import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthUserService {

    private final UserRepository userRepository;


    public User createUser(User user) {
         if (!existsEmail(user.getEmail())) {
             User savedUser = userRepository.save(user);
              return savedUser;
         }

            return null;
    }
    private boolean existsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }
}
