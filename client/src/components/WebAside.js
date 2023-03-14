import styled from "styled-components";
import background5 from "../images/backgrounds/background5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const WebAsideContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: var(--black-100);
  img {
    width: 180px;
    margin-bottom: var(--gap-lg);
  }
`

const BackgroundDiv = styled.div`
  width: 100%;
  height: 580px;
  background-image: url(${background5});
  background-size: 130% 130%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  .content {
    font-size: 18px;
    position: relative;
    top: 24px;
    left: 24px;
  }
  p {
    margin: var(--gap-sm) 0;
  }

  .description-main {
    font-size: 28px;
    margin: var(--gap-lg) 0;
    strong {
    color: var(--blue-100);
    padding: 0 4px;
    }
  }
`

const TeamDiv = styled.div`
  width: 100%;
  margin-top: var(--gap-lg);
`

const TeamnameDiv = styled.div`
  width: 100%;
  font-size: 15px;
  margin-bottom: var(--gap-lg);
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .team-title {
    margin-right: 24px;
  }
  .team-github {
    padding-top: 1px;
  }
  .icon-github {
    margin-right: 4px;
  }
`

const TeammateDiv = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: var(--gap-md);
  .team-position {
    font-weight: 600;
    margin-bottom: 4px;
  }
  a {
    margin-right: 36px;
  }
`

function WebAside() {

  return (
    <WebAsideContainer>
      <img src="images/logo1.png" alt="logo" />
      <BackgroundDiv>
        <div className="content">
          <p>나만의 <strong>영양제 달력</strong></p>
          <p>새로운 영양제 <strong>추천</strong> 및 <strong>검색</strong></p>
          <p>먹고 있는 <strong>영양제</strong>와 <strong>약 관리</strong>까지,</p>
          <p className="description-main">모두 <strong>I Pill U</strong>에서</p>
        </div>
      </BackgroundDiv>
      <TeamDiv>
        <TeamnameDiv>
          <div className="team-title">🍙Team. 양반김에 양조간장🥢</div>
          <a href="https://github.com/codestates-seb/seb42_main_013" className="team-github">
            <FontAwesomeIcon icon={faGithub} className="icon-github" />
            Team Github
          </a>
        </TeamnameDiv>
        <TeammateDiv>
          <div className="team-position">FE</div>
          <div className="team-member">
            <a href="https://github.com/yjyaang">양예진(팀장)</a>
            <a href="https://github.com/JOAAAAAAAAAAA">김민지</a>
            <a href="https://github.com/10xc">김태은</a>
          </div>
        </TeammateDiv>
        <TeammateDiv>
          <div className="team-position">BE</div>
          <div className="team-member">
            <a href="https://github.com/JONGHYUNVAN">반종현(부팀장)</a>
            <a href="https://github.com/SEB-BE-42-mkcho">조민기</a>
          </div>
        </TeammateDiv>
      </TeamDiv>
    </WebAsideContainer>
  )
}

export default WebAside;