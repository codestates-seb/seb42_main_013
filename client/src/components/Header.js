import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { searchActions } from "../reducer/searchReducer";

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
    width: 120px;
  }
  .icon {
    width: 20px;
    height: 20px;
    color: #ffffff;
    cursor: pointer;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prevBtnHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const removeHandler = () => {
    dispatch(searchActions.removeSearchValue());
  }

  return (
    <HeaderContainer>
      <FontAwesomeIcon icon={faChevronLeft}
      className={`${(pathname === "/datacreate" || pathname === "/login" || pathname === "/search") ? "icon" : "icon hidden"}`}
      onClick={prevBtnHandler}/>
      <Link to="/" onClick={removeHandler}><img src="images/logo_header.png" alt="logo" className="logo"/></Link>
      <RightDiv>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className={`${(pathname === "/mypage" || pathname === "/setuserinfo") ? "icon" : "icon none"}`} />
        <FontAwesomeIcon icon={faPlus} className={`${pathname === "/summary" ? "icon" : "icon none"}`} />
        <div className={`${(pathname === "/summary" || pathname === "/mypage" || pathname === "/setuserinfo") ? "icon none" : "icon"}`}></div>
      </RightDiv>
    </HeaderContainer>
  )
}

export default Header;