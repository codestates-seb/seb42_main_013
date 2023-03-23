import styled from "styled-components";
import { OptionTag } from "../pages/DataCreate";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { health } from "../components/Health";

const OptionBox = styled.div`
  display: block;
  flex-direction: column;
  width: 100%;
`
const OptionDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid var(--blue-100);
  gap:8px;
  border-radius: 0 0 5px 5px;
  .selected {
    background-color: var(--blue-100);
    color: #ffffff;
  }
  @media (max-width: 389px) {
    gap: 4px;
  }
`

const OptionBtn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: var(--blue-100) solid 1px;
  padding: 0 8px;
  background-color: var(--blue-100);
  color: white;
  border-radius: ${(props) => props.isOpen ? "5px 5px 0 0" : "5px"};
  font-family: ${(props) => props.bold ? "NanumBarunGothicBold" : "NanumBarunGothic"};
  gap: 8px;
  span{
    padding: 16px 0;
  }
  button{
    width: 16px;
    border: none;
    background: none;
    font-size: 20px;
    color: white;
    transform: ${(props) => props.isOpen ? "scaleY(-1)" : "null"};
    transition: .3s; 
  }
  .option-icon {
    cursor: pointer;
  }
`

const InfoOptionTag = styled(OptionTag)`
  width: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-size: 11px;
  background-color: var(--black-500);
  color: var(--black-200);
  cursor: pointer;
`

function ConcernSelector({tagClickHandler, clickedTag}) {
  const [isOpen, setIsOpen] = useState(false);
  const total = health.map(el => el.title);

  return (
    <OptionBox>
        <OptionBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <span>건강 고민 (다수 선택 가능)</span><button><FontAwesomeIcon icon={faCaretDown} className="option-icon"/></button>
        </OptionBtn>
        {isOpen &&
          <OptionDropdown>
            {total.map((ele, idx) => {
              return <InfoOptionTag key={idx} onClick={tagClickHandler} className={`${clickedTag.includes(ele) ? "selected" : ""}`}>{ele}</InfoOptionTag>
            })}
          </OptionDropdown>
        }
      </OptionBox>
  )
}

export default ConcernSelector;