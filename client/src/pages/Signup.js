import { useState } from "react";
import styled from "styled-components";
import DataInput, { FakeInput, RealInput, SocialBtn } from "../components/DataInput";
import { useForm } from "react-hook-form";
import { CurrentBtn } from "../styles/Buttons";
import { MypageConatiner } from "./MyPage";
import axios from "axios";

export const LoginBox = styled.form`
  width: 100%;
  >div{
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    /* 여기가 인풋 css에요 */
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
  const URI = " ";
  const [isFocus, setIsFocus] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState({ email: '', passward: '' });
  const onSubmit = async (data) => {
    console.log(data);
    await axios({
      method: 'post',
      // url: `/users`,
      url: `${URI}/users`,
      params: {},
      data: data,
    }, { withCredentials: true })

      .then((res) => {
        alert('회원가입 완료')
        window.location.href = '/login'
        // console.log(res)
      })
      .catch((err) => { console.log(err) })
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <MypageConatiner>
      <h1>I Pill U</h1>
      <LoginBox onSubmit={handleSubmit(onSubmit, onError)}>
        <Errorspan>{errors.email && errors.email.message}</Errorspan>
        <FakeInput isFocus={isFocus}>
          <RealInput onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} type="text" data={data} setData={setData} autoComplete="off" id="email" placeholder="이메일" name="email"
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                message: "이메일 형식이 아닙니다."
              }
            })} />
        </FakeInput>
        <Errorspan>{errors.displayName && errors.displayName.message}</Errorspan>
        <FakeInput isFocus={isFocus}>
          <RealInput onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} type="text" data={data} setData={setData} autoComplete="off" id="displayName" placeholder="닉네임" minlength="4"
            {...register("displayName", {
              required: "닉네임을 입력해 주세요.",
              minLength: {
                value: 4,
                message: "닉네임은 최소 4글자 이상이어야 합니다."
              }
            })}
          />
        </FakeInput>
        <Errorspan>{errors.password && errors.password.message}</Errorspan>
        <FakeInput isFocus={isFocus}>
          <RealInput onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} type="password" data={data} setData={setData} autoComplete="off" id="password" placeholder="비밀번호" minlength="6"
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 6,
                message: "password must be longer than 6 characters."
              }
            })}
          />
        </FakeInput>
        <CurrentBtn>회원가입</CurrentBtn>
        <div>계정이 있으신가요 ?<span onClick={onClick} style={{cursor:"pointer"}}>로그인</span></div>
      </LoginBox>
    </MypageConatiner>
  )
}

export default Signup;