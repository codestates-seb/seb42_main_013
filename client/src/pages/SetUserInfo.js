import styled from "styled-components";
import { useState, useEffect } from "react";
import { CurrentBtn } from "../styles/Buttons";
// import ImageEditor from "../components/ImageEditor";
import ConcernSelector from "../components/ConcernSelector";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getUserInfo from "../util/getUserInfo";
import { loginInfoActions } from "../reducer/loginInfoReducer";


const SetUserInfoContainer = styled.div`
  width: 100%;
  height: max-content;
  min-height: calc(100vh - 48px);
  min-height: calc((var(--vh, 1vh) * 100) - 48px);
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

const BirthDateInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid var(--black-400);
  color: var(--black-100);
  border-radius: 5px;
  padding: 8px;
  outline: none;
  position:relative;
  ::-webkit-calendar-picker-indicator{
    position:absolute;
      /* 부모 relative - 자식 absolute */
      /* 부모 relative 지정 안해주면 전체 화면 cover된다 */
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
  ::placeholder{
    color: var(--black-400)
  }
  &[type='date']::-webkit-datetime-edit {
    display: ${(props) => (!!props.value) ? "inline-block" : "none"};
  }
  &[type='date']::before{
    position: absolute;
    left: 10px;
    color: var(--black-400);
    content: "${(props) => props.placeholder}";
    display: ${(props) => !!props.value && "none"};
    width: 80%;
    font-size: 16px;
  }
`

function SetUserInfo() {
  //TODO: DB에서 자료 받아서 건강고민 탭 채우기, post 요청 보낼 때는 건강고민 이름이 아닌 id로 보내야 함(number)!!
  // 상태 설정
  const [birthDate, setBirthDate] = useState("");
  const [clickedSex, setClickedSex] = useState("");
  const [clickedTag, setClickedTag] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useSelector(state => state.loginInfoReducer);

  useEffect(() => {
    if (login) {
      navigate("/suggest");
    }
  }, [login])


  const birthDateHandler = (e) => {
    setBirthDate(e.target.value);
  }

  const manClickHandler = () => {
    setClickedSex("남성");
  }
  const womanClickHandler = () => {
    setClickedSex("여성");
  }

  const tagClickHandler = (e) => {
    const clickedId = Number(e.target.id)
    if (clickedTag.includes(clickedId)) {
      const taglist = clickedTag.filter(el => el !== clickedId);
      setClickedTag(taglist);
    } else {
      const tagList = [...clickedTag, clickedId];
      setClickedTag(tagList);
    }
  }

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    if(clickedTag.length === 0) {
      alert("건강고민은 1개 이상이어야 합니다.");
      return;
    }
    const submitData = { birthDate: birthDate, gender: clickedSex, concernIds: clickedTag };
    const config = {
      headers: {
        "Authorization": sessionStorage.getItem("Authorization")
      }
    };
    await axios.post(`${process.env.REACT_APP_API_URL}/details`, submitData, config)
    getUserInfo()
      .then((userInfo) => {
        const actions = {};
        if (userInfo) {
          actions.login = true;
          actions.userInfo = userInfo;
          dispatch(loginInfoActions.changeLoginInfo(actions))
          alert("정보 등록이 완료되었습니다!");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <SetUserInfoContainer>
      <h1>필수 정보 입력</h1>
      {/* <ImageEditor /> */}
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
      <BirthDateInput type="date" value={birthDate} onChange={birthDateHandler} placeholder="생년월일" />
      <ConcernSelector tagClickHandler={tagClickHandler} clickedTag={clickedTag} />
      <CurrentBtn onClick={submitBtnHandler}>입력 완료</CurrentBtn>
    </SetUserInfoContainer>
  )

}

export default SetUserInfo;