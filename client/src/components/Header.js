import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: var(--blue-100);
  width: 100%;
  max-width: 428px;
  height: 48px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .logo {
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
  }
  .icon {
    width: 20px;
    height: 20px;
    color: #ffffff;
  }
  .none {
    display: none;
  }
  .hidden {
    visibility: hidden;
  }
`

const RightDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Header() {
  const { pathname } = useLocation();

  return (
    <HeaderContainer>
      <FontAwesomeIcon icon={faChevronLeft} className={`${(pathname === "/datacreate" || pathname === "/login" || pathname === "/search") ? "icon" : "icon hidden"}`} />
      <div className="logo">I Pill U</div>
      <RightDiv>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className={`${(pathname === "/mypage" || pathname === "/setuserinfo") ? "icon" : "icon none"}`} />
        <FontAwesomeIcon icon={faPlus} className={`${pathname === "/summary" ? "icon" : "icon none"}`} />
        <div className={`${(pathname === "/summary" || pathname === "/mypage" || pathname === "/setuserinfo") ? "icon none" : "icon"}`}></div>
      </RightDiv>
    </HeaderContainer>
  )
}

export default Header;