package com.SebMainTeam13.team13.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;
@Getter
public class ListResponseDto<T> {
    private List<T> data;

    public ListResponseDto(List<T> data) {
        this.data = data;
    }

}
