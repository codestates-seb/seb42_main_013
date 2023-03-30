package com.SebMainTeam13.team13.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "Member not found"),
    USER_ALREADY_EXISTS(409, "Member exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),

    DETAIL_NOT_FOUND(404, "Detail not found"),


    NOT_ADDED_CONCERN(404, "Is not added concern"),
    CONCERN_NOT_FOUND(404, "Concern not found"),
    CONCERN_ALREADY_ADDED(404, "Concern already added"),
    SUPPLEMENT_NOT_FOUND(404, "Supplement not found"),
    DETAIL_SUPPLEMENT_NOT_FOUND(404, "DetailSupplement not found"),

    ACCESS_TOKEN_EXPIRED(404, "AccessToken Expired"),
    DETAIL_EXISTS(409, "Detail already exists"); 

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
