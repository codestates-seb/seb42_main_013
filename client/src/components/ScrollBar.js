import styled from "styled-components";
import { useState } from "react";
import useWindowSize from "../util/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { health } from "./Health";

const ScrollBarContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  margin: 16px -20px;
  margin-left: 0;
  white-space: nowrap;
  overflow-x: scroll;
  .scroll-button {
    color: var(--black-300);
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .left {
    position: absolute;
    left: 10px;
    z-index: 10;
  }
  .right {
    position: absolute;
    right: 10px;
    z-index: 10;
  }
  .selected-area {
    font-weight: 600;
  }
  .category-select {
    background-color: rgba(91, 133, 235, 0.8);
    /* border: 2px solid var(--blue-100); */
  }
  ::-webkit-scrollbar {
    display: none;
  }
`

const CategoryDiv = styled.div`
  margin: 0 8px;
  font-size: 13px;
  cursor: pointer;
  transform: ${(props) => props.slidePx ? `translateX(${props.slidePx}px)` : "none"};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const [slidePx, setSlidePx] = useState(0);
  const size = useWindowSize();
  let moveWidth;
  if(size.width > 428) {
    moveWidth = 428;
  } else {
    moveWidth = size.width;
  }

  const toPrev = () => {
    if (slidePx < 0) setSlidePx(slidePx + moveWidth - 120);
  };

  const toNext = () => {
    if (slidePx > -1200) setSlidePx(slidePx - moveWidth + 120);
  };

  return (
    <ScrollBarContainer>
      <FontAwesomeIcon icon={faCircleChevronLeft} className="scroll-button left" onClick={toPrev} />
      {health.map(el => {
        return (
          <CategoryDiv key={el.id} slidePx={slidePx} className={el.title === "눈건강" ? "selected-area" : ""}>
            <CategoryIconDiv className={el.title === "눈건강" ? "category-select" : ""}>
              <img src={el.src} alt="health-icon"/>
            </CategoryIconDiv>
            {el.title}
          </CategoryDiv>
        )
      })}
      <FontAwesomeIcon icon={faCircleChevronRight} className="scroll-button right" windowwidth={size.width} onClick={toNext}/>
    </ScrollBarContainer>
  )
}

export default ScrollBar;