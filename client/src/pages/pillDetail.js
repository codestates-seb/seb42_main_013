import styled from "styled-components";
import { ModalBackdrop } from "../components/CreateModal";

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

const ContentBox = styled.div`
    position: relative;
    margin: 0px auto;
    width: 100%;
    background-color: rgb(255, 255, 255);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 24px 20px;
    overflow-y: auto;
    max-width: 428px !important;
`


function PillDetail ({openDetailHandler}) {

  return(
    <DetailContainer>
      <ModalBackdrop onClick={openDetailHandler} />
        
      <ContentBox onClick={(e) => e.stopPropagation()}>
      </ContentBox>
    </DetailContainer>
  )
}

export default PillDetail;