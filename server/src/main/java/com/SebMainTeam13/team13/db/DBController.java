package com.SebMainTeam13.team13.db;
/*
import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;


//@Component
//@RequiredArgsConstructor
//public class DBController implements CommandLineRunner {
//    private final JdbcTemplate jdbcTemplate;
//    private final ConcernRepository concernRepository;
//        @Override
//       public void run(String... args) {
////        jdbcTemplate.execute("DROP DATABASE dbformain13");
////        jdbcTemplate.execute("CREATE DATABASE dbformain13");
//            Optional<Concern> DBTester= concernRepository.findByConcernId(1);
//         if (DBTester.isEmpty()) {
//             concernRepository.save(Concern.builder()
//                     .concernId(1)
//                     .title("영양보충")
//                     .contents(Arrays.asList(
//                             "맛있는 고기로 단백질도 잊지 말고 섭취해 주세요",
//                             "든든하게 영양보충하고 집 앞 산책 30분 함께해요!",
//                             "건강에 좋은 야채도 든든히 먹기!",
//                             "배달음식 그만! 맛있는 집밥으로 영양도 챙겨요"
//                     ))
//                     .build());
//
//             concernRepository.save(Concern.builder()
//                     .title("눈건강")
//                     .contents(Arrays.asList(
//                             "맛도 좋고 눈에도 좋은 블루베리를 섭취하세요!",
//                             "지금 이 글을 보고 계시다면, 하늘을 바라보며 10분 휴식!",
//                             "눈의 건조함 막아주는 인공 눈물 사용을 추천드려요",
//                             "오늘 저녁 반찬은 눈에 좋은 당근볶음을 만들어 볼까요?"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("면역력")
//                     .contents(Arrays.asList(
//                             "체온을 올리는 운동도 꾸준히 진행해 주세요!",
//                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
//                             "항암, 항염 작용에 좋은 마늘, 면역력을 위해 챙겨 드세요",
//                             "면역력이 걱정인 당신, 매일 아침 홍삼스틱 하나 어떠신가요?"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("간건강")
//                     .contents(Arrays.asList(
//                             "건강한 간을 위해 술은 조금만 드세요!",
//                             "과유불급! 약을 과다복용하지 않도록 주의해 주세요",
//                             "간 건강에도 꾸준한 운동은 많은 도움이 됩니다!",
//                             "양질의 단백질과 균형 잡힌 식사도 잊지 마세요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("피로회복")
//                     .contents(Arrays.asList(
//                             "충분한 수면으로 몸이 회복할 수 있도록 해주세요",
//                             "적당히 움직이는 것이 오히려 피로회복에 더 좋다는 사실!",
//                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
//                             "나만의 루틴으로 규칙적인 생활을 지속해 주세요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("장건강")
//                     .contents(Arrays.asList(
//                             "아침 식사로 장에 좋은 사과 1개 먹는 건 어떠신가요?",
//                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
//                             "너무 매운 음식과 너무 많은 커피는 장 건강에 좋지 않아요",
//                             "건강한 장을 위한 수분 섭취! 지금 바로 물 한 잔을 마셔 주세요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("체지방감소")
//                     .contents(Arrays.asList(
//                             "꾸준한 유산소 운동은 체지방 감소의 지름길",
//                             "달달한 간식은 잠시 내려두고 건강한 간식으로 바꾸기!",
//                             "나만의 식단 일기장에 식단을 꾸준히 기록하세요",
//                             "과도한 탄수화물을 줄이고 단백질을 섭취해 주세요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("혈행개선")
//                     .contents(Arrays.asList(
//                             "너무 짠 음식, 기름진 음식은 좋지 않아요",
//                             "혈액의 원활한 흐름을 위해 충분히 수분을 섭취해 주세요",
//                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
//                             "견과류 하루 한 줌으로 혈관 건강 함께 챙겨요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("피부건강")
//                     .contents(Arrays.asList(
//                             "매일매일 스킨케어 미루지 않고 진행해 주세요!",
//                             "외출할 때 꼭꼭! 잊지 말고 선크림 바르고 나가세요!",
//                             "기름진 음식은 피부 건강에 좋지 않아요",
//                             "물을 많이 마시면 피부가 건강해져요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("위건강")
//                     .contents(Arrays.asList(
//                             "짜고 맵고 기름진 음식은 위를 괴롭게 합니다",
//                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
//                             "신선한 채소를 많이 섭취해 주세요!",
//                             "지나친 흡연은 위암을 유발할 수 있어요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("관절/뼈건강")
//                     .contents(Arrays.asList(
//                             "음식 먹을 때 포화지방 섭취는 줄여주세요",
//                             "근력 운동은 뼈 건강에도 좋은 영향을 미쳐요!",
//                             "뼈 건강을 위해 멸치와 유제품 꼭 챙겨 드세요!",
//                             "체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("갱년기")
//                     .contents(Arrays.asList(
//                             "균형잡힌 식사와 꾸준한 운동으로 건강을 관리해 주세요",
//                             "집 주변을 산책하며 햇볕을 쬐는 건 어떠신가요?",
//                             "뼈 건강을 위해 멸치와 유제품 꼭 챙겨 드세요!",
//                             "주변 사람과 자주 대화하며 우울한 감정을 풀어보세요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("기억력개선")
//                     .contents(Arrays.asList(
//                             "기억력 개선에는 호두와 연어 섭취가 도움이 돼요!",
//                             "충분한 수면으로 뇌가 정보를 정리할 시간을 주세요",
//                             "새로운 분야에 도전하여 뇌에 자극을 주는 건 어떠신가요?",
//                             "사람들을 많이 만나고 대화를 많이 나누는 것도 좋습니다"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("긴장완화")
//                     .contents(Arrays.asList(
//                             "편안한 자세로 호흡에만 집중하며 긴장을 완화시켜 보세요!",
//                             "마음 속으로 ‘다 잘 될 거야’를 외쳐 보세요!",
//                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
//                             "명상이나 요가로 정신을 안정시킬 수 있습니다."
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("성장발육")
//                     .contents(Arrays.asList(
//                             "편식하지 않고 영양분을 골고루 섭취할 수 있게 해주세요!",
//                             "활발한 야외 활동으로 아이들은 쑥쑥 자라나요",
//                             "인스턴트, 가공식품을 너무 많이 먹지 않도록 주의해 주세요",
//                             "규칙적인 생활습관을 유지할 수 있도록 지도해 주세요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("혈당조절")
//                     .contents(Arrays.asList(
//                             "충분한 수면으로 인슐린 능력을 높여주세요",
//                             "정제된 곡물 대신 통곡물을 많이 섭취해 주세요",
//                             "간헐적 단식으로 체중도 줄이고 혈당도 조절하세요!",
//                             "혈당 조절에는 꾸준한 운동도 많은 도움이 돼요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("스트레스 관리")
//                     .contents(Arrays.asList(
//                             "스트레스를 받았을 때 깊이 숨을 들이마셔 보세요",
//                             "스트레스를 받았을 때 숨을 쉬어 내보면서 긴장을 풀어보세요",
//                             "좋아하는 일, 취미생활을 통해 스트레스를 해소해 보세요",
//                             "규칙적인 운동을 유지하여 스트레스를 줄여보세요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("항산화")
//                     .contents(Arrays.asList(
//                             "다양한 색의 과일과 채소를 섭취해 보세요!",
//                             "차가운 물 대신 미지근한 물을 마셔 보세요",
//                             "양파, 마늘, 생강 등 향신료를 적극 활용해 보세요",
//                             "카페인이 많은 음료는 가급적 피해주세요"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("전립선")
//                     .contents(Arrays.asList(
//                             "오래 앉아 있었다면 바로 일어나 스트레칭해주세요!",
//                             "규칙적인 생활습관 형성이 중요해요",
//                             "토마토, 양파, 마늘을 많이 섭취해 주세요!",
//                             "규칙적으로 꾸준히 운동을 진행해 주세요!"
//                     ))
//                     .build());
//             concernRepository.save(Concern.builder()
//                     .title("콜레스테롤")
//                     .contents(Arrays.asList(
//                             "포화지방과 콜레스테롤이 많은 음식을 피해주세요",
//                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
//                             "등 푸른 생선 섭취로 나쁜 콜레스테롤을 줄일 수 있어요!",
//                             "체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"
//                     ))
//                     .build());
//         }
//        }
//}

*/