import styled from "styled-components";
import { useRef, useState } from "react";

const ScrollBarContainer = styled.div`
  height: 100px;
  display: flex;
  margin: 16px -20px;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const CategoryDiv = styled.div`
  margin: 0 8px;
  font-size: 14px;
`

const CategoryIconDiv = styled.div`
  width: 55px;
  height: 55px;
  background-color: #eaeaea;
  border-radius: 20px;
  margin-bottom: 8px;
`

function ScrollBar() {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if(isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if(scrollLeft === 0) {
        setStartX(e.pageX);
      } else if(scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  }

  console.log("렌더링테스트");

  return (
    <ScrollBarContainer
    onMouseDown={onDragStart}
    onMouseMove={onDragMove}
    onMouseUp={onDragEnd}
    onMouseLeave={onDragEnd}
    ref={scrollRef}>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민1
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민2
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민3
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민4
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민5
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민6
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민7
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민8
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민9
      </CategoryDiv>
      <CategoryDiv>
        <CategoryIconDiv></CategoryIconDiv>
        건강고민10
      </CategoryDiv>
    </ScrollBarContainer>
  )
}

export default ScrollBar;