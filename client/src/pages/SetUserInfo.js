import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import DataInput from "../components/DataInput";
import { useState } from "react";
import { OptionTag } from "./DataCreate";
import { health } from "../components/Health";
import { CurrentBtn } from "../styles/Buttons";


const SetUserInfoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  position: relative;
  top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 36px;
  background-color: #ffffff;
  gap: 32px;
  h1 {
    font-size: 28px;
    color: var(--black-100);
  }
  @media (max-width: 389px) {
    gap: var(--gap-md);
    h1 {
      font-size: 24px;
    }
  }
`

const SelectSexBox = styled.div`
  display: flex;
  color: ${(props) => props.selected ? "var(--blue-100)" : "var(--black-400)"};
  >div{
    display: flex;
    flex-direction: column;
  }
`

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 var(--gap-md);
  cursor: pointer;
  img {
    margin-bottom: var(--gap-sm);
    width: 60px;
  }
  .selected {
    color: var(--blue-100);
    font-weight: 600;
  }
`

const FlexBox = styled.div`
  width: 100%;
  div{
    padding: 8px
  }
`

export const OptionBtn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: var(--blue-100) solid 1px;
  padding: 0 8px;
  background-color: var(--blue-100);
  color: white;
  border-radius: ${(props) => props.isOpen ? "5px 5px 0 0" : "5px"};
  font-family: ${(props) => props.bold ? "NanumBarunGothicBold" : "NanumBarunGothic"};
  gap: 8px;
  span{
    padding: 16px 0;
  }
  button{
    width: 16px;
    border: none;
    background: none;
    font-size: 20px;
    color: white;
    transform: ${(props) => props.isOpen ? "scaleY(-1)" : "null"};
    transition: .3s; 
  }
`
const OptionBox = styled.div`
  display: block;
  flex-direction: column;
  width: 100%;
`
const OptionDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid var(--blue-100);
  gap:8px;
  border-radius: 0 0 5px 5px;
  .selected {
    background-color: var(--blue-100);
    color: #ffffff;
  }
  @media (max-width: 389px) {
    gap: 4px;
  }
`

const InfoOptionTag = styled(OptionTag)`
  width: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-size: 12px;
  background-color: "var(--black-500)";
  color: "var(--black-200)";
  @media (max-width: 389px) {
    font-size: 11px;
  }
`

function SetUserInfo() {
  // 상태 설정
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ birthday: "" });
  const [isClickedSex, setIsClickedSex] = useState("");
  const [isClickedTag, setIsClickedTag] = useState([]);
  // 필요한 요소 설정
  const total = health.map(el => el.title);

  const manClickHandler = () => {
    setIsClickedSex("남성");
  }
  const womanClickHandler = () => {
    setIsClickedSex("여성");
  }

  const tagClickHandler = (e) => {
    console.log(e.target.textContent);
    const clickedTag = [...isClickedTag, e.target.textContent];
    setIsClickedTag(clickedTag);
  }

  const submitBtnHandler = (e) => {
    e.preventDefault();
    const birthDate = data.birthday;
    const submitData = {birthDate, gender: isClickedSex};
    console.log(submitData);
  }
  return (
    <SetUserInfoContainer>
      <h1>필수 정보 입력</h1>
      <SelectSexBox>
        <IconDiv onClick={manClickHandler}>
          {isClickedSex === "남성"
            ? <img src={`${process.env.PUBLIC_URL}/images/user_man_selected.png`} alt="logo" />
            : <img src={`${process.env.PUBLIC_URL}/images/user_man.png`} alt="logo" />}
          <span className={`${isClickedSex === "남성" ? "selected" : ""}`}>남성</span>
        </IconDiv>
        <IconDiv onClick={womanClickHandler}>
          {isClickedSex === "여성"
            ? <img src={`${process.env.PUBLIC_URL}/images/user_woman_selected.png`} alt="logo" />
            : <img src={`${process.env.PUBLIC_URL}/images/user_woman.png`} alt="logo" />}
          <span className={`${isClickedSex === "여성" ? "selected" : ""}`}>여성</span>
        </IconDiv>
      </SelectSexBox>
      <FlexBox><DataInput type="date" placeholder="생년월일" value="birthday" data={data} setData={setData} /></FlexBox>
      {/* <OptionBox>
        <OptionBtn isOpen={isOpen}>
          <span>건강 고민</span><button onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faCaretDown} /></button>
        </OptionBtn>
        {isOpen &&
          <OptionDropdown>
            {total.map((ele, idx) => {
              return <InfoOptionTag key={idx} onClick={tagClickHandler} className={`${isClickedTag.includes(ele) ? "selected" : ""}`}>{ele}</InfoOptionTag>
            })}
          </OptionDropdown>
        }
      </OptionBox> */}
      <CurrentBtn onClick={submitBtnHandler}>입력 완료</CurrentBtn>
    </SetUserInfoContainer>
  )

}

export default SetUserInfo;