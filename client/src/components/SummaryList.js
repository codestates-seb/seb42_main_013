import styled from "styled-components";
import { useState } from "react";
import { ModalBackdrop } from "../components/CreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCreateData, setIDData, setIsPatch } from "../reducer/dataCreateReducer";
import deletePillData from "../util/deletePillData";
import { SpriteImage1, SpriteImage2 } from "../styles/SpriteImage";
import { setTargetId } from "../reducer/setTargetReducer";


const ListContainer = styled.li`
  display: flex;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 16px 8px;
  position: relative;
  z-index: 100;
  .backdrop {
    background-color: transparent;
  }
`;

const ListImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 66.5px;
  padding-bottom: 5px;
  margin-right: 8px;
  >i{
    transform: rotate(90deg);
    box-shadow: 20px 0px 20px -13px #999999;
  }
  position: relative;
  svg{
    position: absolute;
    width: 13px;
    left: 6px;
    bottom: 11px;
    color: rgb(240, 86, 86);
  }
`;

const ListContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const PillSection = styled.div`
  display: flex;
  align-items: center;
  color: var(--black-200);
  font-size: 14px;
  gap: 4px;
  span{
    text-align: center;
  }
  > .pillsLeft {
    color: ${(props) => props.pillsLeft && "rgb(240, 86, 86)"};
    margin-right: -4px;
  }
  > .expirationDate {
    color: ${(props) => props.expirationDate && "rgb(240, 86, 86)"};
  }
`;
const PillName = styled.span`
  font-family: NanumBarunGothicBold;
  color: black;
  font-size: 16px;
  cursor: pointer;
`;
const PillContains = styled.span`
  color: var(--black-200);
  font-size: 14px;
`;
const PillSummary = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--black-100);
  gap: 4px;
  svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
const OpenMenu = styled.div`
  color: var(--black-100);
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
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
`;
export const ModalMenuLi = styled.li`
  padding: 4px 16px;
  background-color: white;
  cursor: pointer;
  color: ${(props) => (props.selected ? "var(--blue-100)" : "var(--black-200)")};
  &.delete {
    color: rgb(240, 86, 86);
  }
  :hover {
    background-color: #f7f9fa;
  }
  &:first-child {
    padding-top: 8px;
  }
  &:last-child {
    padding-bottom: 8px;
  }
`;

function SummaryList({ pill, data, setData, openDeleteHanlder}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const spreadPill = {
    ...pill.supplementResponse,
    detailSupplementId: pill.detailSupplementId,
    dosageInterval: pill.dosageInterval,
    dosagePerServing: pill.dosagePerServing,
    endDate: pill.endDate,
    expirationDate: pill.expirationDate,
    pillsLeft: pill.pillsLeft,
    startDate: pill.startDate,
    supplementName: pill.supplementName,
    takingTime: pill.takingTime,
    totalCapacity: pill.totalCapacity,
  }

  
  const isCloseToExpirationDate = new Date(spreadPill.expirationDate)-new Date()<=1000*60*60*24*30
  const isAlmostRunout = spreadPill.pillsLeft<=10
  const patchHandler = () => {
    dispatch(setCreateData(spreadPill))
    dispatch(setIDData(spreadPill))
    dispatch(setIsPatch())
  }
  const clickDeleteHandler = () => {
    openModalHandler()
    openDeleteHanlder()
    dispatch(setTargetId(spreadPill.detailSupplementId))
  }

  let imgGroups={group1:["capsule_plain","ellipse_half_white","rhombus_white","circle_white","omega3", "capsule_red","circle_brown","circle_yellow_1","circle_pink","omega3_2","circle_yellowgreen","capsule_brown","circle_small_yellow","circle_Mix_Pink","capsule_Orange","half_spot"],group2:["capsule_green","capsule_blue","ellipse_pink","ellipse_white","ellipse_half_yellow","rhombus_spot","ellipse_blue","capsule_black","half_circle"]}
  const findImgSource = imgGroups.group1.includes(spreadPill.imageURL) ? "group1" : "group2"
  return (
    <ListContainer>
      {isOpen && <ModalBackdrop className="backdrop" onClick={openModalHandler} />}
      <ListImgBox>
        { findImgSource === "group1"
          ? <SpriteImage1 wrappersize="85" className={spreadPill.imageURL} url={process.env.PUBLIC_URL + '/images/pillVectorImg.png'}/>
          : <SpriteImage2 wrappersize="85" className={spreadPill.imageURL} url={process.env.PUBLIC_URL + '/images/pillVectorImg2.png'}/>
        } 
        { (isCloseToExpirationDate||isAlmostRunout) &&
          <FontAwesomeIcon icon={faCircleExclamation} />}
      </ListImgBox>
      <ListContent>
        <PillSection>
          <PillName >{spreadPill.supplementName}</PillName>
          <PillContains>{spreadPill.nutrients[0]}</PillContains>
        </PillSection>
        <PillSummary>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 18h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M16 18h.01"></path>
          </svg>
          {spreadPill.dosageInterval === 1 ? "매일" : `${spreadPill.dosageInterval}일 마다`}
          {!!spreadPill.takingTime.length && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          )}
          {spreadPill.takingTime.map((ele,idx) => {
            return <span key={idx}>{ele}</span>;
          })}
          {spreadPill.supplementType === "drug" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="7" cy="7" r="5"></circle>
              <circle cx="17" cy="17" r="5"></circle>
              <path d="M12 17h10"></path>
              <path d="m3.46 10.54 7.08-7.08"></path>
            </svg>
          )}
          {spreadPill.supplementType === "supplement" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
              <path d="m8.5 8.5 7 7"></path>
            </svg>
          )}
          {`${spreadPill.dosagePerServing}알`}
        </PillSummary>
        <PillSection pillsLeft={isAlmostRunout} expirationDate={isCloseToExpirationDate}>
          <span>남은 알 수</span>
          <span className="pillsLeft">{spreadPill.pillsLeft}</span>
          <span>{`/${spreadPill.totalCapacity}`}</span>
          {!!spreadPill.expirationDate.length && 
          <>
            <span>| 소비기한</span>
            <span className="expirationDate">{spreadPill.expirationDate}</span>
          </>
          
          }
        </PillSection>
      </ListContent>
      <OpenMenu onClick={openModalHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </OpenMenu>
      {isOpen && (
        <>
          <ModalMenu onClick={(e) => e.stopPropagation()}>
            <ModalMenuLi><Link to="/datacreate" onClick={patchHandler}>수정하기</Link></ModalMenuLi>
            <ModalMenuLi onClick={clickDeleteHandler} className="delete">삭제하기</ModalMenuLi>
          </ModalMenu>
        </>
      )}
    </ListContainer>
  );
}
export default SummaryList;
