import styled from "styled-components";
import { useState } from "react";
import { ModalBackdrop } from "../components/CreateModal";

const ListContainer = styled.li`
  display: flex;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 16px  8px;
  position:relative;
  z-index:1200;
  .backdrop{
    background-color: transparent;
  }
`

const ListImgBox = styled.div`
  display: flex;
  width: 100px;
  background-image: ${(props) => props.img};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const ListContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  div{
    margin-bottom: 8px;
  }
  >div:last-child{
    margin-bottom: 0;
  }
`
const PillSection = styled.div`
  color: var(--black-200);
  font-size: 14px;
`
const PillName = styled.span`
  font-family: NanumBarunGothicBold;
  color:black;
  font-size: 16px;
`
const PillContains = styled.span`
  color: var(--black-200);
  font-size: 14px;
`
const PillSummary = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--black-100);
  gap: 4px;
  svg{
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
const OpenMenu = styled.div`
  color:var(--black-100);
  position: absolute;
  right:8px;
  top:8px;
  cursor: pointer;
  svg{
    width:16px;
    height:16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`
const ModalMenu = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  color: var(--black-200);
  font-size: 12px;
  background-color: white;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  >div{
    padding: 4px 16px;
  }
  >div:first-child{
    padding-top: 8px;
  }
  >div:last-child{
    color: rgb(240, 86, 86);
    padding-bottom: 8px
  }
  >div:hover{
    :hover{
    background-color: #F7F9FA;
  }
  }
`

function SummaryList ({pill}){
const [isOpen, setIsOpen] = useState(false)
const openModalHandler = () => {
  setIsOpen(!isOpen)
  console.log(isOpen)
}

  return(
    <ListContainer>
      {isOpen && <ModalBackdrop className="backdrop" onClick={openModalHandler} />}
      <ListImgBox img={pill.img}></ListImgBox>
      <ListContent>
        <PillSection>
          <PillName>{pill.name}</PillName>
          <PillContains>{` ${pill.contains[0].amount}`}</PillContains>
        </PillSection>
        <PillSummary>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
          {pill.cycle===1 ? "매일" :`${pill.cycle}일 마다`} 
          {!!pill.time.length && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
          {pill.time} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
          {`${pill.dose}알`}
        </PillSummary>
        <PillSection>
          {`남은 알 수 ${pill.currentQty}/${pill.totalQty}`} {!!pill.expiryDate.length && `| 소비 기한 ${pill.expiryDate}`}
        </PillSection>
      </ListContent>
      <OpenMenu onClick={openModalHandler}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </OpenMenu>
      { isOpen &&
        <>
          <ModalMenu onClick={(e) => e.stopPropagation()}>
          <div>수정하기</div>
          <div>삭제하기</div>
          </ModalMenu>
        </>
      }

    </ListContainer>
  )
}
export default SummaryList;
