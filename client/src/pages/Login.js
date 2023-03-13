import { useState } from "react";
import styled from "styled-components";
import DataInput, { FakeInput } from "../components/DataInput";
import { CurrentBtn } from "../styles/Buttons";
import { MypageConatiner } from "./MyPage";


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
  const [data, setData] = useState({id:'' ,passward:''});
  // DataInput 컴포넌트 보시구 사용할 수 있는 props 확인해주세요
  // 1. input 의 e.target.value 를 data 객체에서 valu를 키 값으로 활용해 조회하게 설계하였습니다. e.g. data[id]
  // 2. type 도 props로 내려주시면 input 에 적용 됩니다.
  // 3. required 는 required={1} 이렇게 내려주시면 됩니다. CSS 는 구현하던 중이었는데 빨간색 테두리 뜨게 하려고 했습니다.
  // 추가로 필요한 css 있으시면, LoginBox styled속성안에 >div에서 입력하시면 적용됩니다. 위에 여기가 인풋이에요 라고 기재했습니다.
  // 혹시 invalid 속성 때문에 props 추가가 필요하시면 말씀해주세요 !

  return (
    <MypageConatiner>
      <h1>Welcome !</h1>
      <LoginBox>
        <DataInput type="text" data={data} setData={setData} value="id" placeholder="이메일" />
        <DataInput type="text" data={data} setData={setData} value="passward" placeholder="비밀번호" />
        <CurrentBtn>로그인</CurrentBtn>
        <div>계정이 없으신가요 ?<span>회원가입</span></div>
      </LoginBox>
      
      <OtherWayBox>
        <Divider>OR</Divider>
        <FakeInput>구글로 로그인</FakeInput>
        <FakeInput>카카오로 로그인</FakeInput>
      </OtherWayBox>

    </MypageConatiner>
  )
}

export default Login;