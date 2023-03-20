import styled from "styled-components";
import { health } from "./Health";
import { useSelector, useDispatch } from "react-redux";
import { concernActions } from "../reducer/concernReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const ScrollBarContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  margin: var(--gap-sm) -20px var(--gap-md);
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
  const state = useSelector(state => state.concernReducer);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    const data = e.currentTarget.id;
    dispatch(concernActions.changeConcernClicked({ data }));
  }

  return (
    <ScrollBarContainer>
      <Swiper
        spaceBetween={4}
        slidesPerView={5}
      >
        {health.map(el => {
          return (
            <SwiperSlide key={el.id} className={el.title === state.selectedConcern ? "selected-area category" : "category"} onClick={clickHandler} id={el.title}>
              <CategoryIconDiv className={el.title === state.selectedConcern ? "category-select" : ""}>
                <img src={el.src} alt="health-icon" />
              </CategoryIconDiv>
              <div>{el.title}</div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </ScrollBarContainer>
  )
}

export default ScrollBar;