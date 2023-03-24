import styled from "styled-components";
import { OptionTag } from "./DataCreate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentBtn } from "../styles/Buttons";
// import ImageEditor from "../components/ImageEditor";
import ConcernSelector from "../components/ConcernSelector";
import { useSelector } from "react-redux";

export const MypageConatiner = styled.div`
  display: flex;
  padding: 0 36px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 32px;
  h1 {
    color: var(--black-100);
    font-size: 28px;
  }
`

const NewMyContainer = styled(MypageConatiner)`
  height: max-content;
  min-height: calc(100vh - 112px);
  padding: 36px;
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
  width: 100px;
  height: 100px;
  background-color: var(--black-500);
  border-radius: 50%;
`
const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var( --black-200);
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
  font-weight: 600;
  color: var(--black-100);
  >div:first-child{
    color: var(--blue-100);
    flex: 1 0 50%;
  }
  >div:nth-child(2){
    flex: 1 0 50%;
  }
  .userinfo-title {
    display: flex;
    align-items: center;
  }
`

const TagBox = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
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
  font-family: ${(props) => props.bold ? "NanumBarunGothicBold" : "NanumBarunGothic"};
  gap: 8px;
`

const NameInput = styled.input`
  width: 50%;
  padding: 4px;
  padding-left: var(--gap-sm);
  border: 1px solid var(--black-400);
`

const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  color: var(--black-400);
  .selected {
    color: var(--blue-100);
  }
`

const SelectIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 40px;
  }
`

export const BirthDateInput = styled.input`
  flex: 1 0 50%;
  color: var(--black-100);
  padding: 4px;
`

const NewOptionTag = styled(OptionTag)`
  width: 100px;
`

function MyPage() {
  const [isEditMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("JOAAA");
  const [clickedSex, setClickedSex] = useState("여성");
  const [clickedTag, setClickedTag] = useState(["영양보충", "관절/뼈건강", "피부건강"]);
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const { userInfo, login } = useSelector(state => state.loginInfoReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if(!login) {
      navigate("/intro");
    }
  }, [login])

  const editBtnHandler = () => {
    if (isEditMode) {
      const userInfo = {
        displayname: username,
        birthDate,
        gender: clickedSex,
        concerns: clickedTag
      }
      console.log(userInfo);
      alert("수정이 완료되었습니다.");
    }
    setEditMode(!isEditMode);
  }

  const editNameHandler = (e) => {
    setUsername(e.target.value);
  }

  const manClickHandler = () => {
    setClickedSex("남성");
  }
  const womanClickHandler = () => {
    setClickedSex("여성");
  }

  const tagClickHandler = (e) => {
    console.log(e.target.id);
    const clickedId = Number(e.target.id)
    if(clickedTag.includes(clickedId)) {
      const taglist = clickedTag.filter(el => el !== clickedId);
      setClickedTag(taglist);
    } else {
      const tagList = [...clickedTag, clickedId];
      setClickedTag(tagList);
    }
  }

  const birthDateHandler = (e) => {
    console.log(e.target.value);
    setBirthDate(e.target.value);
  }

  return (
    <NewMyContainer>
      {isEditMode ? <h1>수정하기</h1> : <h1>마이페이지</h1>}
      <MypageBox>
        <div className="top"></div>
        <ProfileAvartar />
        <ProfileName>
          {isEditMode ? <NameInput type="text" value={username} onChange={editNameHandler} /> : <div>{userInfo?.displayName}</div>}
          <div>{userInfo?.email}</div>
        </ProfileName>
        <UserInfo>
          <div className="userinfo-title"><span>생년 월일</span></div>
          {isEditMode ? <BirthDateInput type="date" value={birthDate} onChange={birthDateHandler} /> : <div>{userInfo?.detail.birthDate.replaceAll("-", ".")}.</div>}
        </UserInfo>
        <UserInfo>
          <div className="userinfo-title"><span>성별</span></div>
          {isEditMode ?
            <SelectContainer>
              <SelectIconDiv onClick={manClickHandler}>
                {clickedSex === "남성"
                  ? <img src={`${process.env.PUBLIC_URL}/images/user_man_selected.png`} alt="logo" />
                  : <img src={`${process.env.PUBLIC_URL}/images/user_man.png`} alt="logo" />}
                <span className={`${clickedSex === "남성" ? "selected" : ""}`}>남성</span>
              </SelectIconDiv>
              <SelectIconDiv onClick={womanClickHandler}>
                {clickedSex === "여성"
                  ? <img src={`${process.env.PUBLIC_URL}/images/user_woman_selected.png`} alt="logo" />
                  : <img src={`${process.env.PUBLIC_URL}/images/user_woman.png`} alt="logo" />}
                <span className={`${clickedSex === "여성" ? "selected" : ""}`}>여성</span>
              </SelectIconDiv>
            </SelectContainer>
            : <div>{userInfo?.detail.gender}</div>}
        </UserInfo>
        {isEditMode
          ? <ConcernSelector tagClickHandler={tagClickHandler} clickedTag={clickedTag} />
          :
          <>
            <UserInfo>
              <div className="withtag">건강 고민</div>
            </UserInfo>
            <TagBox>
              {userInfo?.concerns.map(el => {
                return (
                  <NewOptionTag key={el.concernId}>{el.title}</NewOptionTag>
                )
              })}
            </TagBox>
          </>}
      </MypageBox>
      <CurrentBtn onClick={editBtnHandler}>{isEditMode ? "수정 완료" : "프로필 수정하기"}</CurrentBtn>
    </NewMyContainer>
  )
}

export default MyPage;