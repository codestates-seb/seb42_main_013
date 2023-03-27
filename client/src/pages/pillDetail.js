import styled from "styled-components";
import { SpriteImage1, SpriteImage2 } from "../styles/SpriteImage";



const DetailContainer = styled.div`
  z-index: 1200;
`
const ContentContainer = styled.div`
transform: none;
padding-right: 15px;
transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
display: flex;
height: auto;
max-height: 100vh;
overflow-y: hidden;
flex: 1 0 auto;
position: fixed;
inset: auto 0px 0px;
outline: 0px;
width: 100%;
background-color: black;
@media (min-width: 1024px) {
padding-left: 460px;
}
`
const DetailImgBox = styled.div`

`

const ContentBox = styled.div`
    position: relative;
    margin: 0px auto;
    width: 100%;
    background-color: var(--black-500);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 24px 20px;
    overflow-y: auto;
    max-width: 428px !important;
`


function PillDetail ({openDetailHandler}) {
  // let imgGroups={group1:["capsule_plain","ellipse_half_white","rhombus_white","circle_white","omega3", "capsule_red","circle_brown","circle_yellow_1","circle_pink","omega3_2","circle_yellowgreen","capsule_brown","circle_small_yellow","circle_Mix_Pink","capsule_Orange","half_spot"],group2:["capsule_green","capsule_blue","ellipse_pink","ellipse_white","ellipse_half_yellow","rhombus_spot","ellipse_blue","capsule_black","half_circle"]}
  // const findImgSource = imgGroups.group1.includes(spreadPill.imageURL) ? "group1" : "group2"
  return(
    <DetailContainer>
      {/* <DetailImgBox>
        { findImgSource === "group1"
          ? <SpriteImage1 wrappersize="85" className={spreadPill.imageURL} url={process.env.PUBLIC_URL + '/images/pillVectorImg.png'}/>
          : <SpriteImage2 wrappersize="85" className={spreadPill.imageURL} url={process.env.PUBLIC_URL + '/images/pillVectorImg2.png'}/>
        } 
      </DetailImgBox>
      <ContentBox>
      </ContentBox> */}
    </DetailContainer>
  )
}

export default PillDetail;