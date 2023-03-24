import { useState, useEffect } from "react";
import styled from "styled-components";
import DataInput from "../components/DataInput";
import { CurrentBtn } from "../styles/Buttons";
import { MypageConatiner } from "./MyPage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginInfoActions } from "../reducer/loginInfoReducer";
import getUserInfo from "../util/getUserInfo";


const LoginBox = styled.div`
  width: 100%;
  >div{
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    /* 여기가 인풋 css에요 */
  }
  >div:nth-last-child(2){
    padding: 16px 0;
  }
  >div:last-child{
    text-align: center;
    color: var(--black-300);
    span{
      color: var(--blue-100);
    }
  }
`
const OtherWayBox = styled.div`
  width: 100%;
  div{
    margin-bottom: 16px;
    padding: 16px 8px;
    color: var(--black-300)
  }
`

// const onClick=()=>{ window.location.href = '/login'}

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        // width: "258px",
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "15px 5px 20px",
        fontSize: "13px",
        fontFamily: "NanumBarunGothicLight",
        color: "#949393",
        // fontWeight: "bold"
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

export const SocialBtn = ({ name, href, bgcolor, color }) => {
  return (
    <SocialBtnContent bgcolor={bgcolor} color={color} name={name}>
      <img src={href} alt="아이콘" width="15px" />
      <SocialBtnTitle>
        <div>{name}로 시작하기</div>
      </SocialBtnTitle>
    </SocialBtnContent>
  )
}
export const SocialBtnTitle = styled.span`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  div{
    margin:0 !important;
    padding:0 !important;
    font-family: 'NanumBarunGothic';
    color: black !important;
  }
`


export const SocialBtnContent = styled.button`
  cursor:pointer;
  padding: 5px 20px !important;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0 8px;
  border: ${(props) => props.name==="구글" ? "1px solid #b4b4b4" : "none"};
  font-size: 16px;
  height: 40px;
  padding: var(--gap-md) 0;
  width: 100%;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : "white"};
  :hover{
    background-color: ${(props) => props.name==="구글" ? "#F7F9FA":"#fada0a" };
  }
  :invalid{
    border-color: rgb(240, 86, 86);
  }
`;

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const { login } = useSelector(state => state.loginInfoReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(login) {
      navigate("/");
    }
  }, [login])

  const onSubmit = async () => {
    const URI = "http://ec2-3-35-105-108.ap-northeast-2.compute.amazonaws.com:8080";
    console.log(data);
    await axios({
      method: 'post',

      url: `${URI}/auth/login`,
      params: {},
      data: data,
    }, { withCredentials: true })

      .then(async(res) => {
        console.log(res);
        sessionStorage.setItem('Authorization', res.headers["authorization"])
        getUserInfo()
    
        .then((userInfo) => {
          const actions = {};
          if (userInfo) {
            actions.login = true;
            actions.userInfo = userInfo;
            dispatch(loginInfoActions.changeLoginInfo(actions))
            alert('로그인 성공')
            window.location.href = '/'
          }
        })
        .catch((err) => { alert('필수 정보를 입력해 주세요!');
        window.location.href = '/setuserinfo'
      })
        
      })
      .catch((err) => { console.log(err) })
  };

  return (
    <MypageConatiner>
      <div style={{ fontSize: "40px", fontFamily: "NanumBarunGothicBold", marginLeft: "10px" }}>Welcome!</div>
      <LoginBox>
        <DataInput name='email' type="text" data={data} setData={setData} value="email" placeholder="이메일" />
        <DataInput name='password' type="password" data={data} setData={setData} value="password" placeholder="비밀번호" />
        <CurrentBtn onClick={onSubmit}>로그인</CurrentBtn>
        <div>계정이 없으신가요?<Link to="/signup" style={{ color: "var(--blue-100)" }}>회원가입</Link></div>
      </LoginBox>
      <HorizonLine text="또는" />
      <OtherWayBox>
        <SocialBtn name={'구글'} href="/images/icon--google.png" color="#3b4045" />
        <SocialBtn name={'카카오'} href="/images/icon--kakao.png" bgcolor="#FEE500" color="#191919" />
      </OtherWayBox>

    </MypageConatiner>
  )
}

export default Login;