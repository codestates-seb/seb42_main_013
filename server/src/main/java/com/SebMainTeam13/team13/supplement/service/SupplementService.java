package com.SebMainTeam13.team13.supplement.service;


import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.detail.entity.ConcernDetailMap;
import com.SebMainTeam13.team13.detail.entity.Detail;
import com.SebMainTeam13.team13.detail.repository.DetailRepository;
import com.SebMainTeam13.team13.exception.BusinessLogicException;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import com.SebMainTeam13.team13.user.entity.User;
import com.SebMainTeam13.team13.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import static com.SebMainTeam13.team13.exception.ExceptionCode.*;


@Service
@RequiredArgsConstructor
public class SupplementService {
    private final SupplementRepository supplementRepository;
    private final ConcernRepository concernRepository;
    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
    private final DetailRepository detailRepository;


    public Supplement createSupplement(Supplement supplement) {
        Optional.ofNullable(supplement.getConcern())
                .ifPresent(supplement::setConcern);
        supplement.setNumberSearched(0);
        return supplementRepository.save(supplement);
    }

    @Transactional
    public Supplement updateSupplement(Supplement supplement, Long supplementId) {
        supplement.setSupplementId(supplementId);
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

    public Supplement findAndVerifySupplementByName(String supplementName) {
        Optional<Supplement> optionalSupplement = supplementRepository.findBySupplementName(supplementName);
        if (optionalSupplement.isPresent()) {
            Supplement supplement = optionalSupplement.get();
            if (supplement.getNumberSearched() == null) supplement.setNumberSearched(0);
            supplement.setNumberSearched(supplement.getNumberSearched() + 1);
            supplementRepository.save(supplement);
            return supplement;
        } else throw new BusinessLogicException(SUPPLEMENT_NOT_FOUND);
    }

    public boolean findIfNewSupplementName(String supplementName) {
        Optional<Supplement> optionalSupplement = supplementRepository.findBySupplementName(supplementName);
        if (optionalSupplement.isPresent()) {
            Supplement supplement = optionalSupplement.get();
            supplement.setNumberSearched(optionalSupplement.get().getNumberSearched() + 1);
            supplementRepository.save(supplement);
        }
        return optionalSupplement.isPresent();
    }


    public void createSupplements(String response, String principal) throws JsonProcessingException {
        if (response == null) return;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);
        JsonNode items = jsonNode.get("items");
        Long concernId;
        Set<String> titleSet = new HashSet<>(jdbcTemplate.queryForList("SELECT DISTINCT title FROM concern", String.class));


        for (JsonNode item : items) {
            if (item == null) continue;
            concernId = 0L;
            String contents = item.get("title").asText();
            if (contents == null) continue;
            List<String> values = new ArrayList<>();
            int startIndex = 0;
            int endIndex = 0;

            while ((startIndex = contents.indexOf("<b>", endIndex)) != -1 && (endIndex = contents.indexOf("</b>", startIndex)) != -1) {
                String keyword = contents.substring(startIndex + 3, endIndex);
                if (titleSet.contains(keyword)) {
                    Optional<Concern> optionalConcern = concernRepository.findByTitle(keyword);
                    if (optionalConcern.isPresent()) {
                        concernId = concernRepository.findByTitle(keyword).get().getConcernId();
                        if (!"anonymousUser".equals(principal) && concernId != null) {
                            User user = userRepository.findByEmail(principal).get();
                            Detail detail = user.getDetail();
                            Concern concern = optionalConcern.get();
                            if (detail != null) {
                                List<ConcernDetailMap> mapList = detail.getMapList();
                                ConcernDetailMap mapToUpdate = null;
                                for (ConcernDetailMap map : mapList) {
                                    if (map.getConcernCountMap().containsKey(concern)) {
                                        mapToUpdate = map;
                                        break;
                                    }
                                }
                                if (mapToUpdate != null) {
                                    mapToUpdate.getConcernCountMap().put(concern, mapToUpdate.getConcernCountMap().get(concern) + 1);
                                } else {
                                    Map<Concern, Long> newMap = new HashMap<>();
                                    newMap.put(concern, 1L);
                                    ConcernDetailMap newConcernDetailMap = ConcernDetailMap.builder()
                                            .detail(detail)
                                            .concernCountMap(newMap)
                                            .build();
                                    mapList.add(newConcernDetailMap);
                                }
                                detail.setMapList(mapList);
                                detailRepository.save(detail);
                            }
                        }

                        values.add(keyword);
                    }
                    String supplementName = item.get("title").asText().replaceAll("<(/)?[bB]>", "");
                    String supplementType = item.get("category3").asText();

                    if (!findIfNewSupplementName(supplementName) && supplementType.equals("영양제")) {

                        Supplement supplement = new Supplement();
                        Optional.ofNullable(supplementName).ifPresent(supplement::setSupplementName);

                        supplement.setSupplementType("nutrient");
                        supplement.setImageURL(item.get("image").asText());
                        String nutrients = item.get("category4").asText();
                        List<String> nutrientsList = nutrients != null ? Arrays.asList(nutrients) : Collections.emptyList();
                        supplement.setNutrients(nutrientsList);
                        supplement.setConcern(optionalConcern.orElse(null));

                        createSupplement(supplement);

                    }

                }
            }

        }
    }
}

