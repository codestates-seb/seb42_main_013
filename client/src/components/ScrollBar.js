import styled from "styled-components";
import { useState } from "react";
import { health } from "./Health";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

const ScrollBarContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  margin: 16px -20px;
  margin-left: 0;
  white-space: nowrap;
  overflow-x: scroll;
  .category {
    font-size: 13px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .selected-area {
    font-weight: 600;
  }
  .category-select {
    background-color: rgba(91, 133, 235, 0.8);
  }
`

const CategoryIconDiv = styled.div`
  width: 55px;
  height: 55px;
  background-color: var(--black-600);
  border-radius: 20px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
  }
`

function ScrollBar() {
  const [isClicked, setIsClicked] = useState("영양보충");

  const clickHandler = (e) => {
    console.log(e.target);
  }

  return (
    <ScrollBarContainer>
      <Swiper
        spaceBetween={4}
        slidesPerView={5}
      >
        {health.map(el => {
          return (
            <SwiperSlide key={el.id} className={el.title === "눈건강" ? "selected-area category" : "category"} onClick={clickHandler}>
              <CategoryIconDiv className={el.title === "눈건강" ? "category-select" : ""}>
                <img src={el.src} alt="health-icon" />
              </CategoryIconDiv>
              {el.title}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </ScrollBarContainer>
  )
}

export default ScrollBar;