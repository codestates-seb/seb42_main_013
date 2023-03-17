package com.SebMainTeam13.team13.concern.service;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.mapper.ConcernMapper;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;
import com.SebMainTeam13.team13.exception.ExceptionCode;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.SebMainTeam13.team13.exception.ExceptionCode.SUPPLEMENT_NOT_FOUND;
import static com.SebMainTeam13.team13.exception.ExceptionCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ConcernService {
    private final ConcernRepository concernRepository;
    private final SupplementRepository supplementRepository;



    public Concern createConcern(Concern concern){


        return concernRepository.save(concern);
    }

    public Concern updateConcern(Concern concern){
        Concern verifiedConcern = findVerifiedConcern(concern.getConcernId());

        Optional.ofNullable(concern.getTitle())
                .ifPresent(title -> verifiedConcern.setTitle(title));
        Optional.ofNullable(concern.getContents())
                .ifPresent(contents -> verifiedConcern.setContents(contents));

        return concernRepository.save(verifiedConcern);
    }

    public Concern findConcern(long concernId){
        Concern concern = findVerifiedConcern(concernId);

        return concern;
    }

    public List<Concern> findConcerns(){
        return (List<Concern>) concernRepository.findAll();
    }

    public Concern findVerifiedConcern(long concernId) {
        Optional<Concern> optionalConcern = concernRepository.findByConcernId(concernId);

        Concern findConcern=
                optionalConcern.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CONCERN_NOT_FOUND));

        return findConcern;
    }
}
