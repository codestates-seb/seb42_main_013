import styled from "styled-components";
import { BasicBtn, MypageConatiner } from "./MyPage";
import { faCircleUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataInput from "../components/DataInput";
import { useState } from "react";
import { OptionTag } from "./DataCreate";


const SelectSexBox = styled.div`
  display: flex;
  color: ${(props) => props.selected ? "var(--blue-100)" : "var(--black-400)"};
  >div{
    display: flex;
    flex-direction: column;
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
  padding: 16px 8px;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid var(--blue-100);
  gap:4px;
  border-radius: 0 0 5px 5px;
`

function SetUserInfo () {
  const [isOpen, setIsOpen] = useState(false);
  const total = ['영양보충', '눈건강', '면역력','간겅강','피로회복','장건강','체지방 감소','혈행개선','피부건강','위건강','관절/뼈건강','갱년기','기억력개선','긴장완화','성장발육','혈당조절','혈압조절','항산화','전립선','콜레스테롤']

  return(
    <MypageConatiner>
      <h1>필수 정보 입력</h1>
      <SelectSexBox>
        <div>
          <FontAwesomeIcon icon={faCircleUser}/>
          <span>남성</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCircleUser}/>
          <span>여성</span>
        </div>
      </SelectSexBox>
      <FlexBox><DataInput type="date" placeholder="생년월일"/></FlexBox>
      <OptionBox>
        <OptionBtn isOpen={isOpen}>
          <span>건강 고민</span><button onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={faCaretDown}/></button>
        </OptionBtn>
        {isOpen &&
          <OptionDropdown>
          {total.map((ele,idx)=>{
            return <OptionTag key={idx}>{ele}</OptionTag>
          })}
          </OptionDropdown>
        }

      </OptionBox>
      <BasicBtn>입력 완료</BasicBtn>
    </MypageConatiner>
  )

}

export default SetUserInfo;