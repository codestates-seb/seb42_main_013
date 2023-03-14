import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

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

function Footer() {
  const [currentTab, setCurrentTab] = useState(1);
  const categoryArr = [
    { name: '달력관리', src: faCalendarCheck, link: '/calendar' },
    { name: '추천/검색', src: faMagnifyingGlass, link: '/' },
    { name: '알약관리', src: faPills, link: '/summary' },
    { name: '마이페이지', src: faUser, link: '/mypage' }
  ]

  const selectCategory = (index) => {
    setCurrentTab(index);
  }

  return (
    <FooterContainer>
      {categoryArr.map((el, idx) => {
        return (
          <Link to={el.link} className={currentTab === idx ? "category selected" : "category"} key={idx} onClick={() => selectCategory(idx)}>
            <FontAwesomeIcon icon={el.src} className="footer-icon" />
            <div>{el.name}</div>
          </Link>
        )
      })}
    </FooterContainer>
  )
}

export default Footer;