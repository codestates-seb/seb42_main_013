package com.SebMainTeam13.team13.naverOpenApi.controller;

import com.SebMainTeam13.team13.naverOpenApi.service.NaverShoppingSearchApi;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/open")
public class OpenApiController {
    @Autowired
    NaverShoppingSearchApi naverShoppingSearchApi = new NaverShoppingSearchApi();

    @GetMapping("naver/shopping")
    public ResponseEntity<Map<String, Object>> getPlace(@RequestParam("query") String query) throws Exception {
        String responseBody = naverShoppingSearchApi.search(query);

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> jsonMap = mapper.readValue(responseBody, new TypeReference<Map<String,Object>>(){});

        return ResponseEntity.ok(jsonMap);
    }
}