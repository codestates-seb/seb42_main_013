import styled from "styled-components";
import DataInput, { FakeInput } from "../components/DataInput";
import { BasicBtn, MypageConatiner } from "./MyPage";

const LoginBox = styled.div`
  width: 100%;
  >div{
    padding: 8px 0;
    margin-bottom: 16px;
  }
  >div:nth-last-child(2){
    padding: 16px 0;
  }
  >div:last-child{
    text-align: center;
    color: var(--black-300);
    span{
      color: var(--blue-100)
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
const Divider = styled.div`
  padding: 0;
  display: flex;
  ::after, ::before{
    content: "";
    width:100%;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
    background-color: var(--black-400);
  }
`


function Login () {

  return (
    <MypageConatiner>
      <h1>Welcome !</h1>
      <LoginBox>
        <DataInput placeholder="이메일" />
        <DataInput placeholder="비밀번호" />
        <BasicBtn>로그인</BasicBtn>
        <div>계정이 없으신가요 ?<span>회원가입</span></div>
      </LoginBox>
      
      <OtherWayBox>
        <Divider>OR</Divider>
        <FakeInput>구글로 회원가입</FakeInput>
        <FakeInput>카카오로 회원가입</FakeInput>
      </OtherWayBox>

    </MypageConatiner>
  )
}

export default Login;