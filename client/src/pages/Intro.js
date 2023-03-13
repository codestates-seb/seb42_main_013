import styled from "styled-components";
import background1 from "../images/backgrounds/background1.jpg"
import background2 from "../images/backgrounds/background2.jpg"
import background3 from "../images/backgrounds/background3.jpg"
import background4 from "../images/backgrounds/background4.jpg"
import { CurrentBtn } from "../styles/Buttons";
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
  /* opacity: 0.75; */
  ::before {
    position: absolute;
    content: "";
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.2);
    }
`

const BackgroundImg2 = styled(BackgroundImg1)`
    background-image: url(${background2});
    ::before {
    background-color: rgba(255,255,255,0.35);
    }
`

const BackgroundImg3 = styled(BackgroundImg1)`
    background-image: url(${background3});
    ::before {
    background-color: rgba(255,255,255,0.35);
    }
`

const BackgroundImg4 = styled(BackgroundImg1)`
    background-image: url(${background4});
`

const ContentDiv1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 150px;
  z-index: 999;
  img {
    width: 300px;
    margin: var(--gap-md);
  }
  .content {
    color: var(--black-100);
    white-space: pre-wrap;
  }
`

const ContentDiv2 = styled(ContentDiv1)`
  top: 350px;
  right: 16px;
  align-items: flex-end;
  text-align: right;
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

  const content2 = "필요한 영양제를 추천받고\n원하는 영양제를 검색하세요!"
  return (
    <IntroContainer>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}>
        <SwiperSlide>
          <BackgroundImg1>
            <ContentDiv1>
              <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="logo" />
              <div className="content">당신을 위한 영양제 맞춤 서비스</div>
            </ContentDiv1>
          </BackgroundImg1>
        </SwiperSlide>
        <SwiperSlide>
          <BackgroundImg2>
            <ContentDiv2>
              <div className="content">{content2}</div>
            </ContentDiv2>
          </BackgroundImg2>
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