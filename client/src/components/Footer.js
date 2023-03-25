import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchActions } from "../reducer/searchReducer";

const FooterContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 64px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid var(--black-500);
  padding: 8px;
  display: flex;
  justify-content: space-around;
  .category {
    padding: 4px;
    color: var(--black-100);
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
  }
  .selected {
    color: var(--blue-100);
  }
`

const FooterBtn = styled.button`
  background-color: transparent;
  border-style: none;
`

function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryArr = [
    { name: '영양제달력', src: faCalendarCheck, link: ["/calendar"] },
    { name: '추천/검색', src: faMagnifyingGlass, link: ["/suggest", "/search"] },
    { name: '알약관리', src: faPills, link: ["/summary", "/datacreate"] },
    { name: '마이페이지', src: faUser, link: ["/mypage"] }
  ]

  return (
    <FooterContainer>
      {categoryArr.map((el, idx) => {
        return (
          <FooterBtn className={el.link.includes(pathname) ? "category selected" : "category"} key={idx} onClick={() => {navigate(el.link[0]); dispatch(searchActions.removeSearchValue())}}>
            <FontAwesomeIcon icon={el.src} className="footer-icon" />
            <div>{el.name}</div>
          </FooterBtn>
        )
      })}
    </FooterContainer>
  )
}

export default Footer;