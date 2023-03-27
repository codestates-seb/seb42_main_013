import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../reducer/searchReducer";
import { loginInfoActions } from "../reducer/loginInfoReducer";
import { clearCreate } from "../reducer/dataCreateReducer";

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
    margin-top: 2px;
    cursor: pointer;
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
  const { login } = useSelector(state => state.loginInfoReducer);

  const prevBtnHandler = (e) => {
    e.preventDefault();
    if (pathname === "/search") {
      dispatch(searchActions.removeSearchValue());
      navigate("/");
    } else if(pathname === "/datacreate"){
      dispatch(clearCreate())
      navigate(-1);
    } else{
      navigate(-1);
    }
  }

  const plusHandler = () => {
    dispatch(clearCreate())
    !!sessionStorage.Authorization ?navigate("/datacreate") :alert("로그인을 해주세요.")
  }

  const logoClickHandler = () => {
    dispatch(searchActions.removeSearchValue());
    if(login) {
      navigate("/suggest")
    } else {
      navigate("/")
    }
  }

  const logoutHandler = () => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("Authorization");
      window.location.href = '/';
    }
  }

  return (
    <HeaderContainer>
      <FontAwesomeIcon icon={faChevronLeft}
        className={`${(pathname === "/datacreate" || pathname === "/login" || pathname === "/signup" || pathname === "/search") ? "icon" : "icon hidden"}`}
        onClick={prevBtnHandler} />
      {pathname === "/setuserinfo" ? <img src="images/logo_header.png" alt="logo" className="logo" />
        : <div onClick={logoClickHandler}><img src="images/logo_header.png" alt="logo" className="logo" /></div>}
      <RightDiv>
        <FontAwesomeIcon icon={faArrowRightFromBracket} 
        onClick={logoutHandler}
        className={`${(pathname === "/mypage") ? "icon" : "icon none"}`} />
        <FontAwesomeIcon icon={faPlus} onClick={plusHandler} className={`${pathname === "/summary" ? "icon" : "icon none"}`} />
        <div className={`${(pathname === "/summary" || pathname === "/mypage") ? "icon none" : "icon"}`}></div>
      </RightDiv>
    </HeaderContainer>
  )
}

export default Header;