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
    public Detail updateDetail(Detail detail,Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));
        Long detailId = user.getDetail().getDetailId();
        Detail verifiedDetail = findAndVerifyDetailByDetailId(detailId);

        Optional.ofNullable(detail.getBirthDate())
                .ifPresent(verifiedDetail::setBirthDate);
        Optional.ofNullable(detail.getGender())
                .ifPresent(verifiedDetail::setGender);

        verifiedDetail.getConcerns().clear();
        detail.getConcerns().iterator().forEachRemaining(tag ->
                verifiedDetail.getConcerns().add(tag)
        );

        return detailRepository.save(verifiedDetail);
    }
    public Detail addConcern(Long concernId, Long detailId) {
        Detail detail = findAndVerifyDetailByDetailId(detailId);
        Concern concern = concernRepository.findById(concernId)
                .orElseThrow(() -> new BusinessLogicException(CONCERN_NOT_FOUND));

        // 이미 추가된 관심사인 경우 예외 발생
        if (detail.getConcerns().contains(concern)) {
            throw new BusinessLogicException(CONCERN_ALREADY_ADDED);
        }

        detail.getConcerns().add(concern);
        return detail;
    }

    public Detail removeConcern(Long concernId, Long detailId) {
        Detail detail = findAndVerifyDetailByDetailId(detailId);
        Concern concern = concernRepository.findById(concernId)
                .orElseThrow(() -> new BusinessLogicException(CONCERN_NOT_FOUND));

        // 추가되지 않은 관심사인 경우 예외 발생
        if (!detail.getConcerns().contains(concern)) {
            throw new BusinessLogicException(NOT_ADDED_CONCERN);
        }

        detail.getConcerns().remove(concern);
        return detail;
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

    public Detail findDetail(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));
        Long detailId = user.getDetail().getDetailId();
        return findAndVerifyDetailByDetailId(detailId);
    }

    private void verifyExistDetail(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.get().getDetail()!=null)
            throw new BusinessLogicException(DETAIL_EXISTS);
    }

}