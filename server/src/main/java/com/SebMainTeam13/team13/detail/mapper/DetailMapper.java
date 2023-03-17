package com.SebMainTeam13.team13.detail.mapper;


import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.detail.dto.DetailDto;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.user.dto.UserDto;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@Component
@RequiredArgsConstructor
public class DetailMapper {
    private final UserMapper userMapper;
    private final ConcernRepository concernRepository;
    public Detail detailPostDtoToDetail(DetailDto.Post post) {
       List<Concern> concerns = new ArrayList<>();
       for(Long i:post.getConcernIds()){
           concerns.add(concernRepository.findByConcernId(i).get());
       }
        return Detail.builder()

                .birthDate(post.getBirthDate())
                .gender(post.getGender())
                .concerns(concerns)
                .build();

    }

    public Detail detailPatchDtoToDetail(DetailDto.Patch patch) {
        return Detail.builder()
                .detailId(patch.getDetailId())
                .birthDate(patch.getBirthDate())
                .gender(patch.getGender())
                .build();

    }

    public DetailDto.Response detailToDetailResponseDto(Detail detail) {

        UserDto.Response userresponse = userMapper.userToUserResponseDto(detail.getUser());

        return DetailDto.Response.builder()
                .detailId(detail.getDetailId())
                .birthDate(detail.getBirthDate())
                .gender(detail.getGender())

                .build();
    }

}