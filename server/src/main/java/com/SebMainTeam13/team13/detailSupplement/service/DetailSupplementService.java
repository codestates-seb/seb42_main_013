package com.SebMainTeam13.team13.detailSupplement.service;

import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.service.DetailService;
import com.SebMainTeam13.team13.detailSupplement.entity.DetailSupplement;
import com.SebMainTeam13.team13.detailSupplement.repository.DetailSupplementRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;

import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.service.SupplementService;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static com.SebMainTeam13.team13.exception.ExceptionCode.DETAIL_SUPPLEMENT_NOT_FOUND;



@Service
@RequiredArgsConstructor
public class DetailSupplementService {
    private final DetailSupplementRepository detailDetailSupplementRepository;
    private final DetailService detailService;
    private final UserService userservice;

    private final SupplementService supplementService;

    public DetailSupplement createDetailSupplement(DetailSupplement detailSupplement,Long userId){
        User user = userservice.getUser(userId);
        Detail detail = detailService.findAndVerifyDetailByDetailId(user.getDetail().getDetailId());
        Supplement supplement= detailSupplement.getSupplement();
        detailSupplement.setDetail(detail);

        verifyDetailSupplementByDetailAndSupplement(detailSupplement);

        DetailSupplement createdDetailSupplement = detailDetailSupplementRepository.save(detailSupplement);
        detail.getDetailSupplements().add(detailSupplement);
        supplement.getDetailSupplements().add(detailSupplement);


        return createdDetailSupplement;

    }

    @Transactional
    public DetailSupplement updateDetailSupplement(DetailSupplement detailSupplement,Long userId) {
        User user = userservice.getUser(userId);
        Detail detail = detailService.findAndVerifyDetailByDetailId(user.getDetail().getDetailId());
        Supplement supplement= detailSupplement.getSupplement();
        DetailSupplement verifiedDetailSupplement = findAndVerifyDetailSupplementByDetailAndSupplement(supplement, detail);


        Optional.ofNullable(detailSupplement.getExpirationDate())
                .ifPresent(verifiedDetailSupplement::setExpirationDate);
        Optional.ofNullable(detailSupplement.getStartDate())
                .ifPresent(verifiedDetailSupplement::setStartDate);
        Optional.ofNullable(detailSupplement.getEndDate())
                .ifPresent(verifiedDetailSupplement::setEndDate);
        Optional.ofNullable(detailSupplement.getTakingTime())
                .ifPresent(verifiedDetailSupplement::setTakingTime);
        Optional.ofNullable(detailSupplement.getPillsLeft())
                .ifPresent(verifiedDetailSupplement::setPillsLeft);
        Optional.ofNullable(detailSupplement.getTotalCapacity())
                .ifPresent(verifiedDetailSupplement::setTotalCapacity);
        Optional.ofNullable(detailSupplement.getDosagePerServing())
                .ifPresent(verifiedDetailSupplement::setDosagePerServing);
        Optional.ofNullable(detailSupplement.getDosageInterval())
                .ifPresent(verifiedDetailSupplement::setDosageInterval);





        return verifiedDetailSupplement;
    }
    //#### 내부 메서드 ###//

    private void  verifyDetailSupplementByDetailAndSupplement(DetailSupplement detailSupplement) {
        Detail detail= detailSupplement.getDetail();
        Supplement supplement = detailSupplement.getSupplement();
        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findByDetailAndSupplement(detail,supplement);
        optionalDetailSupplement.ifPresent(s -> {
            throw new RuntimeException("DetailSupplement already exists");
        });
    }
//    public DetailSupplement findAndVerifyDetailSupplementByName(String detailDetailSupplementName){
//        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findByDetailSupplementName(detailDetailSupplementName);
//        return optionalDetailSupplement.orElseThrow(() ->
//                new BusinessLogicException(SUPPLEMENT_NOT_FOUND));
//    }
    public DetailSupplement findAndVerifyDetailSupplementByDetailAndSupplement(Supplement supplement, Detail detail) {
        Optional<DetailSupplement> optionalDetailSupplement = detailDetailSupplementRepository.findByDetailAndSupplement(detail,supplement);
        

        return optionalDetailSupplement.orElseThrow(() ->
                new BusinessLogicException(DETAIL_SUPPLEMENT_NOT_FOUND));
    }

    public DetailSupplement findAndVerifyDetailSupplementByUserIDAndSupplementName(Long userId, String supplementName) {
        User user = userservice.getUser(userId);
        Detail detail = user.getDetail();
        Supplement supplement = supplementService.findAndVerifySupplementByName(supplementName);

        return detailDetailSupplementRepository.findByDetailAndSupplement(detail, supplement).get();
    }
}