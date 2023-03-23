package com.SebMainTeam13.team13.api.controller;

import com.SebMainTeam13.team13.api.service.NaverShoppingSearchApi;
import com.SebMainTeam13.team13.api.dto.OpenApiDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/open")
public class OpenApiController {
    @Autowired
    NaverShoppingSearchApi naver = new NaverShoppingSearchApi();

    @GetMapping("naver/shopping")
    public ResponseEntity<JSONObject> getPlace(@RequestBody OpenApiDto.search searchDto) throws Exception{
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(naver.search(searchDto.getQuery()));
        JSONObject jsonObj = (JSONObject) obj;
        return ResponseEntity.ok(jsonObj);
    }
}
