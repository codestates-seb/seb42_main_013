import styled from "styled-components";
import DataInput from "../components/DataInput";
import { useState } from "react";
import { CurrentBtn } from "../styles/Buttons";
import ImageEditor from "../components/ImageEditor";
import ConcernSelector from "../components/ConcernSelector";


const SetUserInfoContainer = styled.div`
  width: 100%;
  height: max-content;
  min-height: calc(100vh - 48px);
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px;
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
  .option-icon {
    cursor: pointer;
  }
`

function SetUserInfo() {
  // 상태 설정
  const [data, setData] = useState({ birthday: "" });
  const [clickedSex, setClickedSex] = useState("");
  const [clickedTag, setClickedTag] = useState([]);

  const manClickHandler = () => {
    setClickedSex("남성");
  }
  const womanClickHandler = () => {
    setClickedSex("여성");
  }

  const tagClickHandler = (e) => {
    if(clickedTag.includes(e.target.textContent)) {
      const taglist = clickedTag.filter(el => el !== e.target.textContent);
      setClickedTag(taglist);
    } else {
      const tagList = [...clickedTag, e.target.textContent];
      setClickedTag(tagList);
    }
  }
  console.log(clickedTag);

  const submitBtnHandler = (e) => {
    e.preventDefault();
    const birthDate = data.birthday;
    const submitData = { birthDate, gender: clickedSex, tagList: clickedTag };
    console.log(submitData);
  }

  return (
    <SetUserInfoContainer>
      <h1>필수 정보 입력</h1>
      <ImageEditor />
      <SelectSexBox>
        <IconDiv onClick={manClickHandler}>
          {clickedSex === "남성"
            ? <img src={`${process.env.PUBLIC_URL}/images/user_man_selected.png`} alt="logo" />
            : <img src={`${process.env.PUBLIC_URL}/images/user_man.png`} alt="logo" />}
          <span className={`${clickedSex === "남성" ? "selected" : ""}`}>남성</span>
        </IconDiv>
        <IconDiv onClick={womanClickHandler}>
          {clickedSex === "여성"
            ? <img src={`${process.env.PUBLIC_URL}/images/user_woman_selected.png`} alt="logo" />
            : <img src={`${process.env.PUBLIC_URL}/images/user_woman.png`} alt="logo" />}
          <span className={`${clickedSex === "여성" ? "selected" : ""}`}>여성</span>
        </IconDiv>
      </SelectSexBox>
      <FlexBox><DataInput type="date" placeholder="생년월일" value="birthday" data={data} setData={setData} /></FlexBox>
      <ConcernSelector tagClickHandler={tagClickHandler} clickedTag={clickedTag}/>
      <CurrentBtn onClick={submitBtnHandler}>입력 완료</CurrentBtn>
    </SetUserInfoContainer>
  )

}

export default SetUserInfo;