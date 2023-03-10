import styled from "styled-components";
import background1 from "../images/backgrounds/background1.jpg"
import background2 from "../images/backgrounds/background2.jpg"
import background3 from "../images/backgrounds/background3.jpg"
import background4 from "../images/backgrounds/background4.jpg"
import useWindowSize from "../util/useWindowSize";
import { useState } from "react";

const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const BackgroundContainer = styled.div`
  width: ${(props) => `${props.curwidth}px`};
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  position: relative;
`

const SlideDiv1 = styled.div`
  width: ${(props) => `${props.curwidth}px`};
  height: 100vh;
  position: relative;
  background-image: url(${background1});
  background-size: auto 100%;
  background-position: center;
  opacity: 0.85;
`

const SlideDiv2 = styled(SlideDiv1)`
  background-image: url(${background2});
  left: ${(props) => `${props.curwidth}px`};
  top: ${(props) => `-${props.curheight}px`};
`

const SlideDiv3 = styled(SlideDiv1)`
  background-image: url(${background3});
  opacity: 0.7;
  left: ${(props) => `${props.curwidth * 2}px`};
  top: ${(props) => `-${props.curheight * 2}px`};
`

const SlideDiv4 = styled(SlideDiv1)`
  background-image: url(${background4});
  left: ${(props) => `${props.curwidth * 3}px`};
  top: ${(props) => `-${props.curheight * 3}px`};
`

const SlideBtnDiv = styled.div`
  position: relative;
  bottom: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => `${props.curwidth}px`};
`
const SlideBtn = styled.button`
  border-style: none;
  width: 10px;
  height: 10px;
  margin: var(--gap-md);
  border-radius: 30px;
  background-color: var(--black-400);
  position: relative;
  z-index: 10;
`

function Intro() {
  // 이동버튼용 상태
  const [moveWidth, setMoveWidth] = useState(0);
  // 현재 화면 너비, 높이 설정
  const size = useWindowSize();
  let curwidth;
  if (size.width > 428) {
    curwidth = 428;
  } else {
    curwidth = size.width;
  }

  const curheight = size.height;

  // 이동 버튼 함수
  const firstBtn = () => {
    setMoveWidth(0);
  }
  const secondBtn = () => {
    setMoveWidth(-(curwidth));
  }
  const thirdBtn = () => {
    setMoveWidth(-(curwidth));
  }
  const fourthBtn = () => {
    setMoveWidth(-(curwidth));
  }

  return (
    <IntroContainer>
      <BackgroundContainer curwidth={curwidth}>
        <SlideDiv1 curwidth={curwidth} curheight={curheight}></SlideDiv1>
        <SlideDiv2 curwidth={curwidth} curheight={curheight}></SlideDiv2>
        <SlideDiv3 curwidth={curwidth} curheight={curheight}></SlideDiv3>
        <SlideDiv4 curwidth={curwidth} curheight={curheight}></SlideDiv4>
      </BackgroundContainer>
      <SlideBtnDiv curwidth={curwidth}>
        <SlideBtn />
        <SlideBtn />
        <SlideBtn />
        <SlideBtn />
      </SlideBtnDiv>
    </IntroContainer>
  )
}

export default Intro;