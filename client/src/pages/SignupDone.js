import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { SmallBtn } from "../styles/Buttons";
import { useNavigate } from "react-router";
import { Player} from "@lottiefiles/react-lottie-player";


const DoneContainer = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  .icon-check {
    width: 40px;
    height: 40px;
    margin: var(--gap-lg);
    color: #2EBA4D;
  }
`

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  p {
    font-size: 20px;
    color: var(--black-200);
    margin: 4px 0;
  }
  strong {
    color: var(--blue-100);
  }
`
const AnimationBox = styled.div`
  margin-top: -200px;
  margin-bottom: -70px;
  @media (max-width: 270px){
    margin-bottom: -30px;
  }
`

function SignupDone () {
  const navigate = useNavigate();

  const doneBtnHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return(
    <DoneContainer>
      <AnimationBox>
        <Player autoplay keepLastFrame={1} src="https://assets3.lottiefiles.com/packages/lf20_vvtkpxel.json" />
      </AnimationBox>
      <MessageDiv>
        <p><strong>회원 가입</strong>이</p>
        <p>완료되었습니다.</p>
      </MessageDiv>
      <SmallBtn onClick={doneBtnHandler}>로그인</SmallBtn>
    </DoneContainer>
  )

}

export default SignupDone;