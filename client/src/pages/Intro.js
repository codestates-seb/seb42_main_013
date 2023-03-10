import styled from "styled-components";
import background1 from "../images/backgrounds/background1.jpg"
import background2 from "../images/backgrounds/background2.jpg"
import background3 from "../images/backgrounds/background3.jpg"
import background4 from "../images/backgrounds/background4.jpg"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
  .swiper-pagination {
    bottom: 160px;
  }
  .swiper-pagination-bullet {
    margin: 0 var(--gap-sm)!important;
    background-color: var(--black-200);
  }
  .swiper-pagination-bullet-active {
    background-color: var(--blue-100);
  }
`

const BackgroundImg1 = styled.div`
  width: ${(props) => `${props.curwidth}px`};
  height: 100vh;
  object-fit: cover;
  background-image: url(${background1});
  background-size: auto 100%;
  background-position: center;
  opacity: 0.75;
`

const BackgroundImg2 = styled(BackgroundImg1)`
    background-image: url(${background2});
`

const BackgroundImg3 = styled(BackgroundImg1)`
    background-image: url(${background3});
    opacity: 0.65;
`

const BackgroundImg4 = styled(BackgroundImg1)`
    background-image: url(${background4});
`

export const CurrentBtn = styled.button`
  width: 250px;
  height: 50px;
  border-style: none;
  border-radius: 5px;
  background-color: var(--blue-100);
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin: var(--gap-md) 0;
  :hover {background-color: rgba(91, 133, 235, 0.8)} :active {background-color: rgba(91, 133, 235, 0.8)}
`
const LoginSignupDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 999;
  bottom: 150px;
  .login-area {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--black-200)
  }
  .login-button {
    color: var(--blue-100);
  }
`

function Intro() {

  return (
    <IntroContainer>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}>
        <SwiperSlide>
          <BackgroundImg1></BackgroundImg1>
        </SwiperSlide>
        <SwiperSlide>
        <BackgroundImg2></BackgroundImg2>
        </SwiperSlide>
        <SwiperSlide>
        <BackgroundImg3></BackgroundImg3>
        </SwiperSlide>
        <SwiperSlide>
          <BackgroundImg4></BackgroundImg4>
        </SwiperSlide>
      </Swiper>
      <LoginSignupDiv>
        <CurrentBtn>시작하기</CurrentBtn>
        <div className="login-area">
          <div>계정이 있으신가요?</div>
          <Link to="/login" className="login-button">로그인하기</Link>
        </div>
      </LoginSignupDiv>
    </IntroContainer>
  )
}

export default Intro;