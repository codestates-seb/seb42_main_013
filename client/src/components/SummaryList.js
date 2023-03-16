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
  z-index:100;
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
  gap: 8px;

`
const PillSection = styled.div`
  display: flex;
  align-items: center;
  color: var(--black-200);
  font-size: 14px;
  gap: 4px;
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
export const ModalMenu = styled.ul`
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background-color: white;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  list-style: none;
`
export const ModalMenuLi = styled.li`
  padding: 4px 16px;
  background-color: white;
  color: ${(props) => (props.selected ?"var(--blue-100)" :"var(--black-200)")};
  &.delete{
    color: rgb(240, 86, 86);
  }
  :hover{
    background-color: #F7F9FA;
  }
  &:first-child{
    padding-top: 8px;
  }
  &:last-child{
    padding-bottom: 8px
  }
`



function SummaryList ({pill}){
const [isOpen, setIsOpen] = useState(false)
const openModalHandler = () => {
  setIsOpen(!isOpen)
}

  return(
    <ListContainer>
      {isOpen && <ModalBackdrop className="backdrop" onClick={openModalHandler} />}
      <ListImgBox img={pill.imageURL}></ListImgBox>
      <ListContent>
        <PillSection>
          <PillName>{pill.supplementName}</PillName>
          <PillContains>{pill.nutrients[0]}</PillContains>
        </PillSection>
        <PillSummary>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
          {pill.dosageInterval===1 ? "매일" :`${pill.dosageInterval}일 마다`} 
          {!!pill.takingTime.length && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
          {pill.takingTime.map((ele)=>{
            return <span>{ele}</span>
          })} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
          {`${pill.dosagePerServing}알`}
        </PillSummary>
        <PillSection>
          {`남은 알 수 ${pill.pillsLeft}/${pill.totalCapacity}`} {!!pill.expirationDate.length && `| 소비 기한 ${pill.expirationDate}`}
        </PillSection>
      </ListContent>
      <OpenMenu onClick={openModalHandler}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </OpenMenu>
      { isOpen &&
        <>
          <ModalMenu onClick={(e) => e.stopPropagation()}>
          <ModalMenuLi>수정하기</ModalMenuLi>
          <ModalMenuLi className="delete">삭제하기</ModalMenuLi>
          </ModalMenu>
        </>
      }

    </ListContainer>
  )
}
export default SummaryList;
