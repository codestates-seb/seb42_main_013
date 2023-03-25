package com.SebMainTeam13.team13.db;

import com.SebMainTeam13.team13.concern.entity.Concern;
import com.SebMainTeam13.team13.concern.repository.ConcernRepository;
import com.SebMainTeam13.team13.supplement.entity.Supplement;
import com.SebMainTeam13.team13.supplement.repository.SupplementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class DBController implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;
    private final ConcernRepository concernRepository;
    private final SupplementRepository supplementRepository;

        @Override
       public void run(String... args) {
//        jdbcTemplate.execute("DROP DATABASE dbformain13");
//        jdbcTemplate.execute("CREATE DATABASE dbformain13");
            Optional<Concern> DBTester= concernRepository.findByConcernId(1);
         if (DBTester.isEmpty()) {
             concernRepository.save(Concern.builder()
                     .concernId(1)
                     .title("영양보충")
                     .contents(Arrays.asList(
                             "맛있는 고기로 단백질도 잊지 말고 섭취해 주세요",
                             "든든하게 영양보충하고 집 앞 산책 30분 함께해요!",
                             "건강에 좋은 야채도 든든히 먹기!",
                             "배달음식 그만! 맛있는 집밥으로 영양도 챙겨요"
                     ))
                     .build());

             concernRepository.save(Concern.builder()
                     .title("눈건강")
                     .contents(Arrays.asList(
                             "맛도 좋고 눈에도 좋은 블루베리를 섭취하세요!",
                             "지금 이 글을 보고 계시다면, 하늘을 바라보며 10분 휴식!",
                             "눈의 건조함 막아주는 인공 눈물 사용을 추천드려요",
                             "오늘 저녁 반찬은 눈에 좋은 당근볶음을 만들어 볼까요?"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("면역력")
                     .contents(Arrays.asList(
                             "체온을 올리는 운동도 꾸준히 진행해 주세요!",
                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
                             "항암, 항염 작용에 좋은 마늘, 면역력을 위해 챙겨 드세요",
                             "면역력이 걱정인 당신, 매일 아침 홍삼스틱 하나 어떠신가요?"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("간건강")
                     .contents(Arrays.asList(
                             "건강한 간을 위해 술은 조금만 드세요!",
                             "과유불급! 약을 과다복용하지 않도록 주의해 주세요",
                             "간 건강에도 꾸준한 운동은 많은 도움이 됩니다!",
                             "양질의 단백질과 균형 잡힌 식사도 잊지 마세요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("피로회복")
                     .contents(Arrays.asList(
                             "충분한 수면으로 몸이 회복할 수 있도록 해주세요",
                             "적당히 움직이는 것이 오히려 피로회복에 더 좋다는 사실!",
                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
                             "나만의 루틴으로 규칙적인 생활을 지속해 주세요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("장건강")
                     .contents(Arrays.asList(
                             "아침 식사로 장에 좋은 사과 1개 먹는 건 어떠신가요?",
                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
                             "너무 매운 음식과 너무 많은 커피는 장 건강에 좋지 않아요",
                             "건강한 장을 위한 수분 섭취! 지금 바로 물 한 잔을 마셔 주세요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("체지방감소")
                     .contents(Arrays.asList(
                             "꾸준한 유산소 운동은 체지방 감소의 지름길",
                             "달달한 간식은 잠시 내려두고 건강한 간식으로 바꾸기!",
                             "나만의 식단 일기장에 식단을 꾸준히 기록하세요",
                             "과도한 탄수화물을 줄이고 단백질을 섭취해 주세요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("혈행개선")
                     .contents(Arrays.asList(
                             "너무 짠 음식, 기름진 음식은 좋지 않아요",
                             "혈액의 원활한 흐름을 위해 충분히 수분을 섭취해 주세요",
                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
                             "견과류 하루 한 줌으로 혈관 건강 함께 챙겨요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("피부건강")
                     .contents(Arrays.asList(
                             "매일매일 스킨케어 미루지 않고 진행해 주세요!",
                             "외출할 때 꼭꼭! 잊지 말고 선크림 바르고 나가세요!",
                             "기름진 음식은 피부 건강에 좋지 않아요",
                             "물을 많이 마시면 피부가 건강해져요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("위건강")
                     .contents(Arrays.asList(
                             "짜고 맵고 기름진 음식은 위를 괴롭게 합니다",
                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
                             "신선한 채소를 많이 섭취해 주세요!",
                             "지나친 흡연은 위암을 유발할 수 있어요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("관절/뼈건강")
                     .contents(Arrays.asList(
                             "음식 먹을 때 포화지방 섭취는 줄여주세요",
                             "근력 운동은 뼈 건강에도 좋은 영향을 미쳐요!",
                             "뼈 건강을 위해 멸치와 유제품 꼭 챙겨 드세요!",
                             "체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("갱년기")
                     .contents(Arrays.asList(
                             "균형잡힌 식사와 꾸준한 운동으로 건강을 관리해 주세요",
                             "집 주변을 산책하며 햇볕을 쬐는 건 어떠신가요?",
                             "뼈 건강을 위해 멸치와 유제품 꼭 챙겨 드세요!",
                             "주변 사람과 자주 대화하며 우울한 감정을 풀어보세요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("기억력개선")
                     .contents(Arrays.asList(
                             "기억력 개선에는 호두와 연어 섭취가 도움이 돼요!",
                             "충분한 수면으로 뇌가 정보를 정리할 시간을 주세요",
                             "새로운 분야에 도전하여 뇌에 자극을 주는 건 어떠신가요?",
                             "사람들을 많이 만나고 대화를 많이 나누는 것도 좋습니다"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("긴장완화")
                     .contents(Arrays.asList(
                             "편안한 자세로 호흡에만 집중하며 긴장을 완화시켜 보세요!",
                             "마음 속으로 ‘다 잘 될 거야’를 외쳐 보세요!",
                             "스트레스는 만병의 근원, 나만의 스트레스 해소법 찾기!",
                             "명상이나 요가로 정신을 안정시킬 수 있습니다."
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("성장발육")
                     .contents(Arrays.asList(
                             "편식하지 않고 영양분을 골고루 섭취할 수 있게 해주세요!",
                             "활발한 야외 활동으로 아이들은 쑥쑥 자라나요",
                             "인스턴트, 가공식품을 너무 많이 먹지 않도록 주의해 주세요",
                             "규칙적인 생활습관을 유지할 수 있도록 지도해 주세요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("혈당조절")
                     .contents(Arrays.asList(
                             "충분한 수면으로 인슐린 능력을 높여주세요",
                             "정제된 곡물 대신 통곡물을 많이 섭취해 주세요",
                             "간헐적 단식으로 체중도 줄이고 혈당도 조절하세요!",
                             "혈당 조절에는 꾸준한 운동도 많은 도움이 돼요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("스트레스 관리")
                     .contents(Arrays.asList(
                             "스트레스를 받았을 때 깊이 숨을 들이마셔 보세요",
                             "스트레스를 받았을 때 숨을 쉬어 내보면서 긴장을 풀어보세요",
                             "좋아하는 일, 취미생활을 통해 스트레스를 해소해 보세요",
                             "규칙적인 운동을 유지하여 스트레스를 줄여보세요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("항산화")
                     .contents(Arrays.asList(
                             "다양한 색의 과일과 채소를 섭취해 보세요!",
                             "차가운 물 대신 미지근한 물을 마셔 보세요",
                             "양파, 마늘, 생강 등 향신료를 적극 활용해 보세요",
                             "카페인이 많은 음료는 가급적 피해주세요"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("전립선")
                     .contents(Arrays.asList(
                             "오래 앉아 있었다면 바로 일어나 스트레칭해주세요!",
                             "규칙적인 생활습관 형성이 중요해요",
                             "토마토, 양파, 마늘을 많이 섭취해 주세요!",
                             "규칙적으로 꾸준히 운동을 진행해 주세요!"
                     ))
                     .build());
             concernRepository.save(Concern.builder()
                     .title("콜레스테롤")
                     .contents(Arrays.asList(
                             "포화지방과 콜레스테롤이 많은 음식을 피해주세요",
                             "끼니 거르지 말고 일정한 시간에 챙겨 드세요!",
                             "등 푸른 생선 섭취로 나쁜 콜레스테롤을 줄일 수 있어요!",
                             "체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"
                     ))
                     .build());

             supplementRepository.save(Supplement.builder()
                             .supplementId(1L)
                             .supplementName("종합비타민")
                             .supplementType("supplement")
                             .concern(concernRepository.findByConcernId(1).get())
                             .nutrients(Arrays.asList("비타민A", "비타민B", "비타민D", "비타민E"))
                            .imageURL("https://shopping-phinf.pstatic.net/main_1735391/17353911012.20201120160601.jpg")

                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(2L)
                     .supplementName("비오틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(1).get())
                     .nutrients(Arrays.asList("오메가3"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3059076/30590766618.20221117103035.jpg")

                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(3L)
                     .supplementName("엽산")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(1).get())
                     .nutrients(Arrays.asList("엽산"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3828576/38285763618.20230227090321.jpg")

                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(4L)
                     .supplementName("프로틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(1).get())
                     .nutrients(Arrays.asList("단백질"))
                     .imageURL("https://shop-phinf.pstatic.net/20221124_121/1669270131010dflBp_PNG/70405976682551817_101234843.png")

                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(5L)
                     .supplementName("루테인 지아잔틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(2).get())
                     .nutrients(Arrays.asList("루테인 지아잔틴", "비타민A"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2210312/22103121641.20211122100054.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(6L)
                     .supplementName("비타민A")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(2).get())
                     .nutrients(Arrays.asList("비타민A"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1735391/17353911012.20201120160601.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(7L)
                     .supplementName("빌베리")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(2).get())
                     .nutrients(Arrays.asList("빌베리", "루테인", "오메가3"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2710561/27105610528.20210511123510.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(8L)
                     .supplementName("아스타잔틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(2).get())
                     .nutrients(Arrays.asList("아스타잔틴"))
                     .imageURL("https://shop-phinf.pstatic.net/20200828_297/1598602573028JpHXn_JPEG/35962407501631118_251154579.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(9L)
                     .supplementName("홍삼")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(3).get())
                     .nutrients(Arrays.asList("진세노사이드"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1125965/11259655619.20210323174551.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(10L)
                     .supplementName("오메가3")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(3).get())
                     .nutrients(Arrays.asList("오메가3"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2491614/24916146522.20201120102440.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(11L)
                     .supplementName("비타민D")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(3).get())
                     .nutrients(Arrays.asList("비타민D"))
                     .imageURL("https://shop-phinf.pstatic.net/20191203_76/1575360942465Vx3DE_JPEG/12721681099271758_703307881.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(12L)
                     .supplementName("엘더베리")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(3).get())
                     .nutrients(Arrays.asList("엘더베리추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20221101_72/1667293713026QMvaY_JPEG/68429601738877838_300918665.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(13L)
                     .supplementName("밀크씨슬")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(3).get())
                     .nutrients(Arrays.asList("밀크씨슬"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1977116/19771162299.20230313120229.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(14L)
                     .supplementName("실리마린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(4).get())
                     .nutrients(Arrays.asList("실리마린", "민들레추출물", "아티초크추출물"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2051460/20514608589.20190805124639.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(15L)
                     .supplementName("UDCA")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(4).get())
                     .nutrients(Arrays.asList("UDCA", "비타민E", "비타민B1"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8417527/84175274034.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(16L)
                     .supplementName("아티초크추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(4).get())
                     .nutrients(Arrays.asList("아티초크추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20230228_39/1677554670418zMuh3_JPEG/78690504230006105_191141921.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(17L)
                     .supplementName("마그네슘")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(4).get())
                     .nutrients(Arrays.asList("마그네슘", "비타민D", "칼슘", "아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1309871/13098713037.20210805172525.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(18L)
                     .supplementName("비타민B")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(5).get())
                     .nutrients(Arrays.asList("비타민B1", "비타민B2", "비타민B6", "비타민B12"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1735391/17353911012.20201120160601.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(19L)
                     .supplementName("아답토젠")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(5).get())
                     .nutrients(Arrays.asList("허브혼합물"))
                     .imageURL("https://shop-phinf.pstatic.net/20220512_265/1652322432380OnC2y_JPEG/1513455879_l1.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(20L)
                     .supplementName("타우린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(5).get())
                     .nutrients(Arrays.asList("타우린"))
                     .imageURL("https://shop-phinf.pstatic.net/20230309_201/1678322731934yvzjY_JPEG/79458627663540433_1080456906.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(21L)
                     .supplementName("프로바이오틱스")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(6).get())
                     .nutrients(Arrays.asList("프로바이오틱스"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3505461/35054619618.20221005080625.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(22L)
                     .supplementName("타우린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(6).get())
                     .nutrients(Arrays.asList("타우린"))
                     .imageURL("https://shop-phinf.pstatic.net/20230309_201/1678322731934yvzjY_JPEG/79458627663540433_1080456906.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(23L)
                     .supplementName("차전자피")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(6).get())
                     .nutrients(Arrays.asList("차전자피 식이섬유"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2675726/26757266524.20221129172915.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(24L)
                     .supplementName("알로에겔")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(6).get())
                     .nutrients(Arrays.asList("알로에겔"))
                     .imageURL("https://shop-phinf.pstatic.net/20230127_32/1674801507143ylUAd_JPEG/75937340960693205_2056346986.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(25L)
                     .supplementName("녹차카테킨")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(7).get())
                     .nutrients(Arrays.asList("카테킨"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2460735/24607359522.20230316114352.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(26L)
                     .supplementName("CLA")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(7).get())
                     .nutrients(Arrays.asList("공액리놀레산"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2108214/21082141177.20200110112341.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(27L)
                     .supplementName("가르시니아")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(7).get())
                     .nutrients(Arrays.asList("가르시니아 캄보지아", "비타민B1", "비타민B2", "비타민B6"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1329417/13294174020.20230316090601.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(28L)
                     .supplementName("L-카르니틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(7).get())
                     .nutrients(Arrays.asList("L-카르니틴"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2090924/20909247470.20220816165032.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(29L)
                     .supplementName("비타민E")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(8).get())
                     .nutrients(Arrays.asList("비타민E", "셀렌"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2090924/20909247470.20220816165032.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(30L)
                     .supplementName("코엔자임Q10")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(8).get())
                     .nutrients(Arrays.asList("코엔자임Q10", "아연", "비타민E"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3532696/35326969621.20221019173459.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(31L)
                     .supplementName("나토키나제")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(8).get())
                     .nutrients(Arrays.asList("나토키나제"))
                     .imageURL("https://shop-phinf.pstatic.net/20230310_250/1678403496257OuaA7_JPEG/79539384963765930_1730942881.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(32L)
                     .supplementName("병풀추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(8).get())
                     .nutrients(Arrays.asList("센텔라"))
                     .imageURL("https://shop-phinf.pstatic.net/20220323_191/1648043421243FvXoz_JPEG/49179319950892717_1113365487.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(33L)
                     .supplementName("콜라겐")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(9).get())
                     .nutrients(Arrays.asList("피쉬콜라겐", "비오틴", "비타민C"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2234835/22348357257.20200402154654.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(34L)
                     .supplementName("스피루리나")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(9).get())
                     .nutrients(Arrays.asList("스피루리나", "히알루론산"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2287826/22878264426.20200516152559.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(35L)
                     .supplementName("히알루론산")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(9).get())
                     .nutrients(Arrays.asList("히알루론산", "MSM"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2215686/22156867863.20220608095424.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(36L)
                     .supplementName("세라마이드")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(9).get())
                     .nutrients(Arrays.asList("밀추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20220318_13/1647598278191ulyX7_JPEG/48734106020714601_803492493.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(37L)
                     .supplementName("스페인감초")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(10).get())
                     .nutrients(Arrays.asList("프로바이오틱스", "스페인감초", "아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8336466/83364667643.10.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(38L)
                     .supplementName("매스틱 검")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(10).get())
                     .nutrients(Arrays.asList("매스틱 검"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2962220/29622203623.20211110163045.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(39L)
                     .supplementName("소화효소")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(10).get())
                     .nutrients(Arrays.asList("효소", "제산제", "MMSC"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8243000/82430008468.1.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(40L)
                     .supplementName("브로멜라인")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(10).get())
                     .nutrients(Arrays.asList("브로멜라인"))
                     .imageURL("https://shop-phinf.pstatic.net/20220922_43/1663827634648A8NCD_JPEG/64963469478709213_1910128129.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(41L)
                     .supplementName("칼슘")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(11).get())
                     .nutrients(Arrays.asList("칼슘", "마그네슘", "아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1345221/13452217992.20201214154239.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(42L)
                     .supplementName("글루코사민")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(11).get())
                     .nutrients(Arrays.asList("글루코사민 황산염", "염소", "칼륨"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2384884/23848842522.20230207142957.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(43L)
                     .supplementName("MSM")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(11).get())
                     .nutrients(Arrays.asList("MSM", "NAG", "비타민D"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2850959/28509596557.20210820170430.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(44L)
                     .supplementName("콘드로이친")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(11).get())
                     .nutrients(Arrays.asList("콘드로이친 황산나트륨"))
                     .imageURL("https://shop-phinf.pstatic.net/20230309_182/16783648733743c5hz_JPEG/79500707164078570_1904517433.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(45L)
                     .supplementName("피크노제놀")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(12).get())
                     .nutrients(Arrays.asList("피크노제놀"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3536709/35367098618.20221021150849.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(46L)
                     .supplementName("회화나무열매추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(12).get())
                     .nutrients(Arrays.asList("회화나무열매추출물"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8434906/84349060781.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(47L)
                     .supplementName("백수오추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(12).get())
                     .nutrients(Arrays.asList("백수오추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20220817_180/16607050838225b5nx_PNG/61840982480564581_65313341.png")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(48L)
                     .supplementName("석류추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(12).get())
                     .nutrients(Arrays.asList("석류추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20221212_199/1670829542434BAMGk_JPEG/71965441142309190_973120149.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(49L)
                     .supplementName("은행잎추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(13).get())
                     .nutrients(Arrays.asList("은행잎추출물", "나토추출물", "비타민E"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8182440/81824407982.1.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(50L)
                     .supplementName("포스파티딜세린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(13).get())
                     .nutrients(Arrays.asList("포스파티딜세린", "은행잎추출물", "비타민E"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3476793/34767932619.20230302102017.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(51L)
                     .supplementName("콜린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(13).get())
                     .nutrients(Arrays.asList("콜린"))
                     .imageURL("https://shop-phinf.pstatic.net/20210419_137/16188144900930Recw_JPEG/19950332052942888_1714757952.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(52L)
                     .supplementName("천마추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(13).get())
                     .nutrients(Arrays.asList("천마복합추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20230117_12/1673902706706ywxD9_JPEG/202301170542471.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(53L)
                     .supplementName("L-테아닌")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(14).get())
                     .nutrients(Arrays.asList("테아닌", "이노시톨"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3619100/36191005618.20221130093830.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(54L)
                     .supplementName("홍경천")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(14).get())
                     .nutrients(Arrays.asList("밀크씨슬", "홍경천추출물", "비타민B1"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3604167/36041677619.20221123104955.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(55L)
                     .supplementName("락티움")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(14).get())
                     .nutrients(Arrays.asList("알파에스1카제인"))
                     .imageURL("https://shop-phinf.pstatic.net/20230126_74/16747147636540mhPP_PNG/2017447481628641_181779227.png")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(56L)
                     .supplementName("아슈와간다")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(14).get())
                     .nutrients(Arrays.asList("아슈와간다 추출물"))
                     .imageURL("https://shop-phinf.pstatic.net/20230309_72/1678363796612gCGC8_JPEG/79499692341308353_1968870700.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(57L)
                     .supplementName("키즈 비타민")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(15).get())
                     .nutrients(Arrays.asList("칼슘", "망간", "비타민A", "비타민B1"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8306891/83068918634.4.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(58L)
                     .supplementName("키즈 칼슘")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(15).get())
                     .nutrients(Arrays.asList("칼슘", "마그네슘", "비타민D", "아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1545815/15458155124.20220401124817.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(59L)
                     .supplementName("바나바잎추출물")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(15).get())
                     .nutrients(Arrays.asList("바나바잎 추출물"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3057232/30572321618.20220119110050.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(60L)
                     .supplementName("난소화성말토덱스트린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(15).get())
                     .nutrients(Arrays.asList("글루타치온", "비타민C", "콜라겐"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3158567/31585674065.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(61L)
                     .supplementName("크로뮴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(16).get())
                     .nutrients(Arrays.asList("크롬"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_8281040/82810403311.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(62L)
                     .supplementName("이눌린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(16).get())
                     .nutrients(Arrays.asList("식이섬유"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1198803/11988034721.5.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(63L)
                     .supplementName("아르기닌")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(16).get())
                     .nutrients(Arrays.asList("아르기닌"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2812726/28127266522.20221012114128.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(64L)
                     .supplementName("칼륨")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(16).get())
                     .nutrients(Arrays.asList("칼륨"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3000225/30002252618.20211208143706.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(65L)
                     .supplementName("폴리코사놀")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(17).get())
                     .nutrients(Arrays.asList("폴리코사놀"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2360474/23604744490.20200728153746.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(66L)
                     .supplementName("GABA")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(17).get())
                     .nutrients(Arrays.asList("GABA"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3397818/33978181619.20220818084027.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(67L)
                     .supplementName("비타민C")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(17).get())
                     .nutrients(Arrays.asList("비타민C"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2685541/26855413531.20220719084339.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(68L)
                     .supplementName("프로폴리스")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(17).get())
                     .nutrients(Arrays.asList("프로폴리스", "아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3129732/31297322631.20220314114144.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(69L)
                     .supplementName("아연")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(18).get())
                     .nutrients(Arrays.asList("아연"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1860252/18602526124.20200814113559.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(70L)
                     .supplementName("셀레늄")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(18).get())
                     .nutrients(Arrays.asList("셀레늄"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1623678/16236788013.20210719141606.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(71L)
                     .supplementName("쏘팔메토")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(18).get())
                     .nutrients(Arrays.asList("쏘팔메토"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1032692/10326922248.20220921181158.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(72L)
                     .supplementName("옥타코사놀")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(18).get())
                     .nutrients(Arrays.asList("옥타코사놀", "쏘팔메토"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2237563/22375636422.20221128122006.jpg")
                     .build());
             supplementRepository.save(Supplement.builder()
                     .supplementId(73L)
                     .supplementName("마카")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(19).get())
                     .nutrients(Arrays.asList("마카"))
                     .imageURL("https://shop-phinf.pstatic.net/20221211_217/16707432334871Rwaf_JPEG/71879076200461233_801802333.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(74L)
                     .supplementName("감마리놀렌산")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(19).get())
                     .nutrients(Arrays.asList("감마리놀렌산", "비타민E"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_6595389/6595389674.20200818161546.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(75L)
                     .supplementName("레시틴")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(19).get())
                     .nutrients(Arrays.asList("대두레시틴"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1471290/14712906888.20230125113205.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(76L)
                     .supplementName("키토산")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(19).get())
                     .nutrients(Arrays.asList("키토산"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_1937838/19378383673.20220504115822.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(77L)
                     .supplementName("모나콜린")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(20).get())
                     .nutrients(Arrays.asList("홍국"))
                     .imageURL("https://shop-phinf.pstatic.net/20191202_51/1575267752076wYEwI_JPEG/12629294685395889_1967427266.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(78L)
                     .supplementName("GABA")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(20).get())
                     .nutrients(Arrays.asList("GABA"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3397818/33978181619.20220818084027.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(79L)
                     .supplementName("엽산")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(20).get())
                     .nutrients(Arrays.asList("엽산"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_3828576/38285763618.20230227090321.jpg")
                     .build());

             supplementRepository.save(Supplement.builder()
                     .supplementId(80L)
                     .supplementName("비타민C")
                     .supplementType("supplement")
                     .concern(concernRepository.findByConcernId(20).get())
                     .nutrients(Arrays.asList("비타민C"))
                     .imageURL("https://shopping-phinf.pstatic.net/main_2685541/26855413531.20220719084339.jpg")
                     .build());


         }
    }
}

