import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ScrollBar from "../components/ScrollBar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { searchActions } from "../reducer/searchReducer";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../util/useAuthCheck";
import axios from "axios";
import card1 from "../images/cards/card1.jpg";
import card2 from "../images/cards/card2.jpg";
import card3 from "../images/cards/card3.jpg";
import card4 from "../images/cards/card4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const SuggestContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 100%;
  color: var(--black-100);
  .highlight {
    color: var(--blue-100);
    font-weight: 600;
  }
`

const WelcomeDiv = styled.div`
  padding: 0 20px;
  font-size: 14px;
`

const UserContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 0 20px;
  margin-top: var(--gap-md);
`
const UserConcern = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid var(--blue-100);
  border-radius: 20px;
  padding: var(--gap-md);
  margin-bottom: var(--gap-md);
`

const UserSupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  .supplement-area {
    width: 24%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  @media (max-width: 427px){
    font-size: 3.27vw;
    }
`

const UserSupImg = styled.img`
  width: 45px;
  margin-bottom: var(--gap-sm);
  @media (max-width: 427px){
    width: 10.51vw;
    }
`

const SugSlideContainer = styled(UserContainer)`
  height: 100px;
`

const SugSlideDiv = styled(UserConcern)`
  padding: 0;
  border-radius: 0;
  border-style: none;
  position: relative;
  .swiper {
    height: 100%;
  }
  .swiper-wrapper {
    z-index: -1;
  }
  .swiper-pagination {
    width: 100%;
    height: 20px;
    position: absolute;
    z-index: 20;
    right: 20px;
    top: 11.4px;
  }
  .swiper-pagination-bullet {
    background-color: transparent;
    display: none;
    position: absolute;
    right: 37px;
  }
  .swiper-pagination-bullet-active {
    display: inline-block;
    color: #ffffff;
    font-size: 14px;
    font-family: 'NanumBarunGothic';
  }
`

const SlideCounter = styled.div`
  width: 50px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 8px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  color: #ffffff;
  padding: 3px;
  padding-left: 22px;
`

const SugSlide = styled.div`
  width: 100%;
  height: 100%;
  padding: var(--gap-md);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => `${props.bgcolor}`};
  p {
    margin: 4px;
    font-weight: 600;
    color: var(--black-100);
  }
  .slide-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    margin-left: 36px;
    width: 60px;
  }
  .cough {
    margin-left: 60px;
  }
  @media (max-width: 427px){
    font-size: 3.5vw;
    }
`

const SugContentConatiner = styled.div`
  padding: 0 20px var(--gap-md);
  margin-top: var(--gap-md);
  border-top: 12px solid var(--black-500);
  .smallcontent-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
`

const CategoryTitle = styled.div`
  margin: var(--gap-md) 0 var(--gap-sm);
  font-weight: 600;
`

const LargeContent = styled.div`
  margin-bottom: var(--gap-lg);
  padding: var(--gap-lg);
  width: 100%;
  height: 360px;
  background-color: rgba(91, 133, 235, 0.8);
  border-radius: 30px;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .lg-content-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
  }
  .ipu-icon {
    width: 20px;
    margin-right: 4px;
  }
  @media (max-width: 427px){
    height: 80vw;
    font-size: 3.4vw;
    .lg-content-title {
      font-size: 3.73vw;
    }
    }
`

const SupplementsArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: var(--gap-md);
  gap: 4px;
`

const SupplementDiv = styled.div`
  width: 30%;
  height: 48.5%;
  display: flex;
  flex-direction: column;
  margin: 0 var(--gap-lg);
  justify-content: flex-start;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  cursor: pointer;
  img {
    width: 60%;
  }
  .icon-image {
    width: 50%;
  }
  @media (max-width: 427px){
    width: 22.4vw;
    img {
    width: 50%;
    }
  }
`

const SupplementImgDiv = styled.div`
  width: 102px;
  height: 70%;
  border-radius: 25px;
  background-color: #ffffff;
  margin-bottom: var(--gap-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 427px){
    width: 21.2vw;
  }
`

const SmallContentTitle = styled(CategoryTitle)`
  margin: var(--gap-md) 0;
`

const SmallContent1 = styled.div`
  padding: 12px;
  width: 46.395%;
  height: 180px;
  border-style: none;
  background-image: url(${card4});
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  color: var(--black-600);
  font-size: 18px;
  font-weight: 600;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 140%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: ${(props) => props.align || "left"};
  div {
    width: 100%;
  }
  @media (max-width: 427px){
    height: 42vw;
    font-size: 4.2vw;
  }
`

const SmallContent2 = styled(SmallContent1)`
  align-items: center;  
  text-align: center;
  background-image: url(${card2});
  background-size: cover;
  background-position: center;
  border-style: none;
  color: var(--black-100);
`

const SmallContent3 = styled(SmallContent1)`
  align-items: center;
  text-align: center;
  background-image: url(${card3});
  background-size: 100%;
  background-position: center;
  border-style: none;
  color: var(--black-100);

`

const SmallContent4 = styled(SmallContent1)`
  text-align: right;
  border-style: none;
  align-items: baseline;
  background-image: url(${card1});
  background-size: cover;
  background-position: center;
  color: var(--black-100);
`

function Suggest() {
  const { selectedConcern } = useSelector(state => state.concernReducer);
  const { login, userInfo } = useSelector(state => state.loginInfoReducer);
  const [concerns, setConcerns] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickedConcern = concerns.filter(el => el.concernId === selectedConcern)[0];
  const numbers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  useAuthCheck();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/concerns/`)
      .then((res) => {
        setConcerns(res.data.data)

      });
  }, [])

  const supplementClick = (e) => {
    const data = e.currentTarget.id;
    dispatch(searchActions.changeSearchValue({ data }));
    const query = JSON.parse(localStorage.getItem("searchValue"));
    navigate(`/search?query=${query}`);
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
        <SuggestContainer>
          <SearchBar />
          <WelcomeDiv>환영합니다, <span className="highlight">{userInfo?.displayName}</span>님!</WelcomeDiv>
          <UserContainer>
            <UserConcern>
              <div><span className="highlight">{userInfo?.displayName}</span>님을 위한 영양제 추천</div>
              <UserSupContainer>
                <div className="supplement-area" id={userInfo?.supplements[0].supplementName} onClick={supplementClick}>
                  <UserSupImg src="images/icon-pill1.png" alt="supplement-icon" />
                  <div>{userInfo?.supplements[0].supplementName}</div>
                </div>
                <div className="supplement-area" id={userInfo?.supplements[1].supplementName} onClick={supplementClick}>
                  <UserSupImg src="images/icon-pill2.png" alt="supplement-icon" />
                  <div>{userInfo?.supplements[1].supplementName}</div>
                </div>
                <div className="supplement-area" id={userInfo?.supplements[2].supplementName} onClick={supplementClick}>
                  <UserSupImg src="images/icon-pill3.png" alt="supplement-icon" />
                  <div>{userInfo?.supplements[2].supplementName}</div>
                </div>
              </UserSupContainer>
            </UserConcern>
          </UserContainer>
          <SugSlideContainer>
            <SugSlideDiv>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={pagination}
                rewind={true}
                autoplay={{ delay: 3000 }}
              >
                <SlideCounter>/ 5</SlideCounter>
                <SwiperSlide>
                  <SugSlide bgcolor="#ffedba" onClick={() => navigate("/search?query=오메가3")}>
                    <div className="slide-text">
                      <p>다른 건 몰라도 이 영양제는 꼭 드세요!</p>
                      <p>오메가3 구매하러 가기</p>
                    </div>
                    <div className="slide-icon">
                      <img src="images/icon-suggest1.png" alt="slide-icon" />
                    </div>
                  </SugSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <SugSlide bgcolor="#e6e3f4" onClick={() => navigate("/summary")}>
                    <div className="slide-text">
                      <p>너무 많아 관리하기 힘든 내 영양제...</p>
                      <p>'알약관리'에 등록해 보셨나요?</p>
                    </div>
                    <div className="slide-icon">
                      <img src="images/icon-suggest2.png" alt="slide-icon" />
                    </div>
                  </SugSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <SugSlide bgcolor="#d2f4e1" onClick={() => navigate("/search?query=감기예방")}>
                    <div className="slide-text">
                      <p>꽃샘추위 감기 조심하세요!</p>
                      <p>미리미리 준비하고 감기예방하기</p>
                    </div>
                    <div className="slide-icon">
                      <img src="images/icon-suggest3.png" alt="slide-icon" className="cough" />
                    </div>
                  </SugSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <SugSlide bgcolor="#f9e3ee" onClick={() => navigate("/mypage")}>
                    <div className="slide-text">
                      <p>새로운 건강고민이 생기셨나요?</p>
                      <p>건강고민 선택하고 맞춤 영양제 추천 받아보세요!</p>
                    </div>
                  </SugSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <SugSlide bgcolor="#cedcff">
                    <div className="slide-text">
                      <p>🍙양반김에 양조간장🥢팀</p>
                      <p>프로젝트 정말정말 고생 많으셨습니다!</p>
                    </div>
                  </SugSlide>
                </SwiperSlide>
              </Swiper>
            </SugSlideDiv>
          </SugSlideContainer>
          <SugContentConatiner>
            <CategoryTitle><span className="highlight">건강고민</span>별 영양 찾기</CategoryTitle>
            <ScrollBar concerns={concerns}/>
            <LargeContent>
              <div className="lg-content-title"><img src="images/icon--ipu.png" alt="ipu-icon" className="ipu-icon" />{clickedConcern?.title}에 좋은 영양제</div>
              <SupplementsArea>
                {clickedConcern?.supplementsList.map((el, idx) => {
                  return (
                    <SupplementDiv key={idx} id={el.supplementName} onClick={supplementClick}>
                      <SupplementImgDiv><img src={el.imageURL || "images/icon-pill4.png"} alt="supplement-icon" className={el.imageURL ? "" : "icon-image"} /></SupplementImgDiv>
                      <div>{el.supplementName}</div>
                    </SupplementDiv>
                  )
                })}
              </SupplementsArea>
            </LargeContent>
            <SmallContentTitle>건강한 생활정보</SmallContentTitle>
            {clickedConcern?.concernId === 17 ? (
              <div className="smallcontent-area">
                <SmallContent1>
                  <div>{"술과 담배는 가급적 멀리해 주세요"}</div>
                </SmallContent1>
                <SmallContent2>
                  <div>{"규칙적으로 꾸준히 운동을 진행해 주세요!"}</div>
                </SmallContent2>
                <SmallContent3>
                  <div>{"체중이 많이 나간다면 좀 더 가볍게\n조절해 주세요"}</div>
                </SmallContent3>
                <SmallContent4>
                  <div>{"짠 음식 섭취는 혈압을 높게 만들어요"}</div>
                </SmallContent4>
              </div>
            ) : (
              <div className="smallcontent-area">
                <SmallContent1>
                  <div>{clickedConcern?.contents[numbers[0]]}</div>
                </SmallContent1>
                <SmallContent2>
                  <div>{clickedConcern?.contents[numbers[1]]}</div>
                </SmallContent2>
                <SmallContent3>
                  <div>{clickedConcern?.contents[numbers[2]]}</div>
                </SmallContent3>
                <SmallContent4>
                  <div>{clickedConcern?.contents[numbers[3]]}</div>
                </SmallContent4>
              </div>
            )}
          </SugContentConatiner>
        </SuggestContainer>
  )
}

export default Suggest;