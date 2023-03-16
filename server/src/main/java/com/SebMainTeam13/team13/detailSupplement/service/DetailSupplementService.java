package com.SebMainTeam13.team13.detailSupplement.service;

import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.repository.DetailSupplementRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static com.SebMainTeam13.team13.exception.ExceptionCode.DETAILSUPPLEMENT_NOT_FOUND;



@Service
@RequiredArgsConstructor
public class DetailSupplementService {
    private final DetailSupplementRepository detailDetailSupplementRepository;


    public DetailSupplement createDetailSupplement(DetailSupplement detailDetailSupplement){
        verifyDetailSupplementById(detailDetailSupplement);

        return detailDetailSupplementRepository.save(detailDetailSupplement);

    }

    @Transactional
    public DetailSupplement updateDetailSupplement(DetailSupplement detailDetailSupplement) {
        Long detailDetailSupplementId = findAndVerifyDetailSupplementByDetailSupplementId(detailDetailSupplement.getDetailSupplementId()).getDetailSupplementId();
        DetailSupplement verifiedDetailSupplement = findAndVerifyDetailSupplementByDetailSupplementId(detailDetailSupplementId);


        Optional.ofNullable(detailDetailSupplement.getExpirationDate())
                .ifPresent(verifiedDetailSupplement::setExpirationDate);
        Optional.ofNullable(detailDetailSupplement.getStartDate())
                .ifPresent(verifiedDetailSupplement::setStartDate);
        Optional.ofNullable(detailDetailSupplement.getEndDate())
                .ifPresent(verifiedDetailSupplement::setEndDate);
        Optional.ofNullable(detailDetailSupplement.getTakingTime())
                .ifPresent(verifiedDetailSupplement::setTakingTime);
        Optional.ofNullable(detailDetailSupplement.getPillsLeft())
                .ifPresent(verifiedDetailSupplement::setPillsLeft);
        Optional.ofNullable(detailDetailSupplement.getTotalCapacity())
                .ifPresent(verifiedDetailSupplement::setTotalCapacity);
        Optional.ofNullable(detailDetailSupplement.getDosagePerServing())
                .ifPresent(verifiedDetailSupplement::setDosagePerServing);
        Optional.ofNullable(detailDetailSupplement.getDosageInterval())
                .ifPresent(verifiedDetailSupplement::setDosageInterval);





        return verifiedDetailSupplement;
    }
    //#### 내부 메서드 ###//

    private void verifyDetailSupplementById(DetailSupplement detailSupplement) {
        Long detailSupplementId = detailSupplement.getDetailSupplementId();
        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findByDetailSupplementId(detailSupplementId);
        optionalDetailSupplement.ifPresent(s -> {
            throw new RuntimeException("DetailSupplement already exists");
        });
    }
//    public DetailSupplement findAndVerifyDetailSupplementByName(String detailDetailSupplementName){
//        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findByDetailSupplementName(detailDetailSupplementName);
//        return optionalDetailSupplement.orElseThrow(() ->
//                new BusinessLogicException(SUPPLEMENT_NOT_FOUND));
//    }
    public DetailSupplement findAndVerifyDetailSupplementByDetailSupplementId(long detailDetailSupplementId) {
        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findById(detailDetailSupplementId);

        return optionalDetailSupplement.orElseThrow(() ->
                new BusinessLogicException(DETAILSUPPLEMENT_NOT_FOUND));
    }

}