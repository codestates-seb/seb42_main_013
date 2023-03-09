import styled from "styled-components";
import { OptionTag } from "./dataCreate";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MypageConatiner = styled.div`
  display: flex;
  padding: 0 36px 80px;
  min-height: calc(100vh - 48px - 64px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 32px;

  --black-100: #d0d0d0;
  --black-300: #666666;
`

const MypageBox = styled.div`
  padding: 20px;
  display:flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 100%;
  gap: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
  .top{
    width: 100%;
    display: flex;
    justify-content: end;
    color: var(--black-300);
  }
`

const ProfileAvartar = styled.div`
  width: 90px;
  height: 90px;
  background-color: var(--black-100);
  border-radius: 50%;
`
const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var( --black-300);
  margin-bottom: 8px;
  >div:first-child{
    font-size: 16px;
  }
  >div:nth-child(2){
    font-size: 12px;
  }
`
const UserInfo = styled.div`
  display: flex;
  font-size: 14px;
  width: 100%;
  text-align: start;
  >div:first-child{
    color: var(--blue-100);
    font-family: "NanumBarunGothicBold";
    flex: 1 0 50%;
  }
  >div:nth-child(2){
    flex: 1 0 50%;

  }
`

const TagBox = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: start;
  flex-wrap: wrap;
  margin-bottom: 30px;
  >div{
    flex-grow: 1;
  }
`

export const BasicBtn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-100);
  color: white;
  padding: 16px 0;
  border-radius: 5px;
  font-family: "NanumBarunGothicBold";
`



function Mypage(){


  return (
    <MypageConatiner>
      <h1>마이페이지</h1>
      <MypageBox>
        <div className="top"><FontAwesomeIcon icon={faGear}/></div>
        <ProfileAvartar />
        <ProfileName>
          <div>JOAAA</div>
          <div>blueseablueskyblueme@gmail.com</div>
        </ProfileName>
        <UserInfo>
          <div>생년 월일</div>
          <div>1990.01.01</div>
        </UserInfo>
        <UserInfo>
          <div>성별</div>
          <div>여성</div>
        </UserInfo>
        <UserInfo>
          <div className="withtag">건강 고민</div>
        </UserInfo>
        <TagBox>
            <OptionTag selected={1}>영양보충</OptionTag>
            <OptionTag selected={1}>관절/뼈건강</OptionTag>
            <OptionTag selected={1}>피부건강</OptionTag>
        </TagBox>
      </MypageBox>
      <BasicBtn>프로필 수정</BasicBtn>
    </MypageConatiner>
  )
}

export default Mypage;