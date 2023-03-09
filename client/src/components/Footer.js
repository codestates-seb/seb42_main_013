import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const FooterContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 64px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999999;
  padding: 8px;
  display: flex;
  justify-content: space-around;
`

const FooterCatDiv = styled.div`
  padding: 4px;
  color: #464646;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  .footer-icon {
    width: 25px;
    height: 25px;
    margin: 4px 0;
  }
`

function Footer() {
  return (
    <FooterContainer>
      <FooterCatDiv>
        <FontAwesomeIcon icon={faCalendarCheck} className="footer-icon" />
        <div className="footer-text">달력관리</div>
      </FooterCatDiv>
      <FooterCatDiv>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="footer-icon" />
        <div className="footer-text">추천/검색</div>
      </FooterCatDiv>
      <FooterCatDiv>
        <FontAwesomeIcon icon={faPills} className="footer-icon" />
        <div className="footer-text">알약관리</div>
      </FooterCatDiv>
      <FooterCatDiv>
        <FontAwesomeIcon icon={faUser} className="footer-icon" />
        <div className="footer-text">마이페이지</div>
      </FooterCatDiv>
    </FooterContainer>
  )
}

export default Footer;