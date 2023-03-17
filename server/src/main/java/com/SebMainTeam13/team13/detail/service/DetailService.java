package com.SebMainTeam13.team13.detail.service;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.repository.DetailRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.SebMainTeam13.team13.exception.ExceptionCode.*;

@Service
@RequiredArgsConstructor

@Slf4j
public class DetailService {
    private final DetailRepository detailRepository;
    private final UserRepository userRepository;
    private final ConcernRepository concernRepository;
//    private final SupplementRepository supplementRepository;
//    private final SupplementService supplementService;

    @Transactional
    public Detail createDetail(Detail detail,Long userId) {
        verifyExistDetail(userId);
       User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));
        detail.setUser(user);
        user.setDetail(detail);
        for(Concern i:detail.getConcerns()) i.getDetails().add(detail);

        return detailRepository.save(detail);
    }



    @Transactional
    public Detail updateDetail(Detail detail) {
        Long detailId = detail.getDetailId();
        Detail verifiedDetail = findAndVerifyDetailByDetailId(detailId);
//        if (!Objects.equals(verifiedDetail.getUser().getUserId(), detail.getUser().getUserId())) {
//            throw new RuntimeException("수정할 수 있는 회원이 아닙니다.");
//        }

        Optional.ofNullable(detail.getBirthDate())
                .ifPresent(verifiedDetail::setBirthDate);
        Optional.ofNullable(detail.getGender())
                .ifPresent(verifiedDetail::setGender);
//        detail.getDetailSupplements().forEach(detailSupplement -> {
//            String name = detailSupplement.getSupplement().getName();
//            Supplement supplement = supplementService.verifySupplement(name);
//            detailSupplement.setSupplement(supplement);
//        });
//
//        verifiedDetail.getDetailSupplements().clear();
//        detail.getDetailSupplements().iterator().forEachRemaining(supplement ->
//                verifiedDetail.getDetailSupplements().add(supplement)
//        );

        return verifiedDetail;
    }






    @Transactional
    public void deleteDetail(Long detailId) {
        Detail detail = findAndVerifyDetailByDetailId(detailId);
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Objects.equals(detail.getUser().getUserId(), userId)) {
            throw new RuntimeException("삭제할 수 있는 권한이 없습니다.");
        }
        detail.setDetailType(Detail.DetailType.DELETED);
        detailRepository.save(detail);
    }


    @Transactional
    public void saveDetail(Detail detail) {
        detailRepository.save(detail);
    }





    //#### 내부 메서드 ###//

    public Detail findAndVerifyDetailByDetailId(long detailId) {
        Optional<Detail> optionalDetail = detailRepository.findById(detailId);

        return optionalDetail.orElseThrow(() ->
                new BusinessLogicException(DETAIL_NOT_FOUND));
    }

    public Detail findDetail(long detailId) {

        return findAndVerifyDetailByDetailId(detailId);
    }

    private void verifyExistDetail(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.get().getDetail()!=null)
            throw new BusinessLogicException(DETAIL_EXISTS);
    }

//    private void verifyExistSupplement(List<String> supplementNames) {
//        for (String supplementName : supplementNames) {
//            Optional<Supplement> supplement = supplementRepository.findByName(supplementName);
//            if (supplement.isEmpty()) supplementService.createSupplement(supplementName);
//        }
//    }
}