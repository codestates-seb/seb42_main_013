import styled from "styled-components";
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import CreateModal from "../components/CreateModal";


const DataCreateContainer = styled.div`
  padding: 0px 20px;
  background-color: white;
  --border : #B0B0B0 solid 1px;
  --border-radius: 5px;
  --component-height: 25px;
`

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  >h3{
    color: #666666;
    font-size: 16px;
    margin-bottom: 8px;
  }
  >div{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    line-height: 100%;
    align-items: center;
  }
`
const OptionTag = styled.button`
  display: flex;
  align-items: center;
  height: var(--component-height);
  /* line-height: var(--component-height); */
  border-width: 0;
  border-radius: 30px;
  padding: 10px;
  text-align: center;
  color : ${(props) => props.selected ? "white" : "#666666"};
  background-color: ${(props) => props.selected ? "var(--blue-100)" : "#D9D9D9"};
  font-size: 12px;
  button{
    margin-left: 7px;
    margin-right: 2px;
    height: var(--component-height);
    width: auto;
    background-color: transparent;
    border: none;
    color: ${(props) => props.selected ? "white" : "#666666"};
  }
`

const ImgBox = styled.div`
  border: var(--border);
  border-radius: var(--border-radius);
  width: 50px;
  height: 50px;
  position: relative;
  .camera{
    position: absolute;
    inset: 0px;
    margin: auto;
    /* absolute position 에서 가운데 놓기 */
    width: 30px;
    height: 30px;
    >g{
      fill: none;
      fill-rule: evenodd;
      >g{
        transform: translate(4.779px, 6.111px);
        stroke: #666666;
        stroke-width: 1.3;
      }
    }
  } 
`
const DataInput = styled.input`
  border: var(--border);
  border-radius: var(--border-radius);
  width: auto;
  height: var(--component-height);
`

export const AddBtn = styled.button`
  color: white;
  background-color: var(--blue-100);
  border: none;
  width: var(--component-height);;
  height: var(--component-height);
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`


function DataCrete() {
  const [isOpen, setIsoOpen] = useState(true)
  const openContainsModalHandler = () => {
    setIsoOpen(!isOpen)
  }


  return(
    <DataCreateContainer>
      <InputSection>
        <h3>종류</h3>
        <div>
          <OptionTag selected={1}>영양제</OptionTag>
          <OptionTag>처방약</OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>이미지</h3>
        <div>
          <ImgBox />
          <ImgBox />
          <ImgBox />
          <ImgBox />
          <ImgBox />
          <ImgBox>
            <svg className="camera">
              <g>
                <path d="M0 0h30v30H0z" />
                <g>
                  <path d="M11.792 0c.399 0 .717.056.955.17.179.084.346.199.503.344l.153.155.631.703c.122.13.234.233.337.31a.95.95 0 0 0 .34.16c.125.031.292.047.503.047l2.906-.003c1.284 0 2.324 1.062 2.324 2.37v11.151c0 1.31-1.04 2.37-2.324 2.37H2.324c-1.283 0-2.324-1.06-2.324-2.37V4.257c0-1.31 1.04-2.37 2.324-2.37h2.983c.245-.009.432-.045.559-.108.11-.055.23-.145.36-.27l.134-.137.631-.703c.2-.22.418-.387.657-.5.19-.09.432-.144.725-.162L8.603 0h3.189z" />
                  <circle cx="10.142" cy="9.529" r="3.556" />
                </g>  
              </g>
            </svg>
          </ImgBox>
        </div>
      </InputSection>
      <InputSection>
        <h3>약 이름</h3>
        <div>
          <DataInput type="text"/>
        </div>
      </InputSection>
      <InputSection>
        <h3>주요 성분</h3>
        <div>
          <OptionTag selected={1}>아티초크 150mg</OptionTag>
          <AddBtn onClick={openContainsModalHandler}><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>소비기한</h3>
        <div>
         <DataInput type="date" />
        </div>
      </InputSection>
      <InputSection>
        <h3>잔여알수 / 전체용량</h3>
        <div>
          <DataInput /> / <DataInput />
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 기간</h3>
        <div>
          <DataInput type="date" /> ~ <DataInput type="date"/>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 주기</h3>
        <div>
          <OptionTag selected={1}>매일</OptionTag>
          <OptionTag>N일</OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 시간</h3>
        <div>
          <OptionTag selected={1}>오전 9시<button><FontAwesomeIcon icon={faTimes}/></button></OptionTag>
          <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용량</h3>
        <div>
        <AddBtn><FontAwesomeIcon icon={faMinus}/></AddBtn>
        2 알
        <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      {isOpen &&  <CreateModal isOpen={isOpen} openContainsModalHandler={openContainsModalHandler}/>}
    </DataCreateContainer>    
  )
}

export default DataCrete;
