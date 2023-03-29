import { useState, useEffect } from "react";
import styled from "styled-components";
import DataInput, { FakeInput, RealInput, SocialBtn } from "../components/DataInput";
import { useForm } from "react-hook-form";
import { CurrentBtn } from "../styles/Buttons";
import { MypageConatiner } from "./MyPage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Title=({href})=>{
return (
  <div style={{display:"flex"}}>
   <img src={href} alt="아이콘" width="40px"/>
   <div style={{fontSize:"40px", fontFamily:"NanumBarunGothicBold", letterSpacing:"1px", marginLeft:"10px"}}>I Pill U</div>
  </div>
)
}

export const LoginBox = styled.form`
  width: 100%;
  >div{
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
  >div:nth-last-child(1){
    padding: 16px 0;
  }
  >div:last-child{
    text-align: center;
    color: var(--black-300);
    span{
      color: var(--blue-100)
    }
  }
`;
const Errorspan = styled.span`
  color:red;  
  font-size: 12px;
`;

const onClick=()=>{ window.location.href = '/login'};

function Signup() {
  const { login } = useSelector(state => state.loginInfoReducer);
  const navigate = useNavigate();
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState({ email: '', password: '', displayName: '' });
  const onSubmit = async (data) => {
    // console.log(data);
    await axios({
      method: 'post',
      // url: `/users`,
      // url: `${process.env.REACT_APP_API_URL}/users`,
      url: `http://ec2-3-35-105-108.ap-northeast-2.compute.amazonaws.com:8080/users`,
      params: {},
      data: data,
    }, { withCredentials: true })

      .then((res) => {
        alert('회원가입 완료')
        window.location.href = '/signupDone'
        // console.log(res)
      })
      .catch((err) => { console.log(err) })
  };
  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if(login) {
      navigate("/suggest");
    }
  }, [login])

  return (
    <MypageConatiner>
      <Title href="/images/icon--ipu.png">I Pill U</Title>
      <LoginBox onSubmit={handleSubmit(onSubmit, onError)}>
        <Errorspan>{errors.email && errors.email.message}</Errorspan>
        <FakeInput isFocus={isFocus1} isValid={errors.email?false:true}>
          <RealInput onFocus={() => setIsFocus1(true)} type="text" data={data} setData={setData} autoComplete="off" id="email" placeholder="이메일" name="email"
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                message: "이메일 형식이 아닙니다."
              }
            })} onBlur={() => setIsFocus1(false)} />
        </FakeInput>
        <Errorspan>{errors.displayName && errors.displayName.message}</Errorspan>
        <FakeInput isFocus={isFocus2} isValid={errors.displayName?false:true}>
          <RealInput onFocus={() => setIsFocus2(true)} type="text" data={data} setData={setData} autoComplete="off" id="displayName" placeholder="닉네임" minlength="4"
            {...register("displayName", {
              required: "닉네임을 입력해 주세요.",
              minLength: {
                value: 4,
                message: "닉네임은 최소 4글자 이상이어야 합니다."
              }
            })} onBlur={() => setIsFocus2(false)}/>
        </FakeInput>
        <Errorspan>{errors.password && errors.password.message}</Errorspan>
        <FakeInput isFocus={isFocus3} isValid={errors.password?false:true}>
          <RealInput onFocus={() => setIsFocus3(true)} type="password" data={data} setData={setData} autoComplete="off" id="password" placeholder="비밀번호" minlength="6"
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 6,
                message: "password must be longer than 6 characters."
              }
            })} onBlur={() => setIsFocus3(false)}/>
        </FakeInput>
        <CurrentBtn>회원가입</CurrentBtn>
        <div>계정이 있으신가요?<Link to='/login' style={{color: "var(--blue-100)"}}>로그인</Link></div>
      </LoginBox>
    </MypageConatiner>
  )
}

export default Signup;