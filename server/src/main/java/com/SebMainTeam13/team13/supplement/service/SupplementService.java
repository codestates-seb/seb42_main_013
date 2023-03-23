package com.SebMainTeam13.team13.supplement.service;


import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import com.SebMainTeam13.team13.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.SebMainTeam13.team13.exception.ExceptionCode.*;


@Service
@RequiredArgsConstructor
public class SupplementService {
    private final SupplementRepository supplementRepository;
    private final ConcernRepository concernRepository;



    public Supplement createSupplement(Supplement supplement){
        Optional.ofNullable(supplement.getConcern())
                .ifPresent(supplement::setConcern);
        return supplementRepository.save(supplement);
    }

    @Transactional
    public Supplement updateSupplement(Supplement supplement) {
        Long supplementId = findAndVerifySupplementByName(supplement.getSupplementName()).getSupplementId();
        Supplement verifiedSupplement = findAndVerifySupplementBySupplementId(supplementId);

        Optional.ofNullable(supplement.getSupplementName())
                .ifPresent(verifiedSupplement::setSupplementName);
        Optional.ofNullable(supplement.getNutrients())
                .ifPresent(verifiedSupplement::setNutrients);
        Optional.ofNullable(supplement.getImageURL())
                .ifPresent(verifiedSupplement::setImageURL);
        Optional.ofNullable(supplement.getSupplementType())
                .ifPresent(verifiedSupplement::setSupplementType);



        return verifiedSupplement;
    }
        //#### 내부 메서드 ###//

//    private void verifySupplementByName(Supplement supplement) {
//        String supplementName = supplement.getSupplementName();
//        Optional<Supplement> optionalSupplement = supplementRepository.findBySupplementName(supplementName);
//        optionalSupplement.ifPresent(s -> {
//            throw new RuntimeException("Supplement already exists");
//        });
//    }
    public Supplement findAndVerifySupplementBySupplementId(long supplementId) {
        Optional<Supplement> optionalSupplement = supplementRepository.findById(supplementId);

        return optionalSupplement.orElseThrow(() ->
                new BusinessLogicException(SUPPLEMENT_NOT_FOUND));
    }
    public Supplement findAndVerifySupplementByName(String supplementName){
        Optional<Supplement> optionalSupplement = supplementRepository.findBySupplementName(supplementName);
        if (optionalSupplement.isPresent()) {
            Supplement supplement = optionalSupplement.get();

            if (supplement.getNumberSearched() == null) {
                supplement.setNumberSearched(0);
            }
            supplement.setNumberSearched(supplement.getNumberSearched() + 1);
            supplementRepository.save(supplement);
            return supplement;
        }

        else throw new BusinessLogicException(SUPPLEMENT_NOT_FOUND);

    }
}

