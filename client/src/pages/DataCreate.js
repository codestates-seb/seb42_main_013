import styled from "styled-components";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import Swiper from "../components/Swiper";
import DataInput from "../components/DataInput";


const DataCreateContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 48px - 64px);
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px 40px;
  background-color: white;
`

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
  >h3{
    font-family: 'NanumBarunGothicBold';
    color: var(--black-200);
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    gap: 2px;
  }
  p{
    font-size: 14px;
    font-weight: 700;
    color: var(--blue-100);
    display: block;
  }
  >div{
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
    width: 100%;
    line-height: 100%;
    align-items: center;
  }
`
export const OptionTag = styled.button`
  display: flex;
  align-items: center;
  height: 32px;
  /* line-height: var(--component-height); */
  border-width: 0;
  border-radius: 30px;
  padding: 0 10px;
  text-align: center;
  color : ${(props) => props.selected ? "white" : "var(--black-200)"};
  background-color: ${(props) => props.selected ? "var(--blue-100)" : "#D9D9D9"};
  font-size: 14px;
  button{
    margin-left: 7px;
    margin-right: 2px;
    height: 25px;
    width: auto;
    background-color: transparent;
    border: none;
    color: ${(props) => props.selected ? "white" : "var(--black-200)"};
  }
`
const Box=styled.div`
  display: inline-block;
`


export const AddBtn = styled.button`
  color: white;
  background-color: var(--blue-100);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`


function DataCrete() {
  const [isOpen, setIsoOpen] = useState(false)
  const openContainsModalHandler = () => {
    setIsoOpen(!isOpen)
  }

  const [data, setData] = useState(
    {
      dataID: null,
      type: "supplement",
      img: null,
      name: "",
      ingredients: [{
        ingredientId: null,
        ingredientName: '',
        ingredientAmount: ''
      }],
      expiryDate: "",
      currentQty: "",
      totalQty: "",
      startDate: new Date().toISOString().substring(0,10),
      endDate: "",
      cycle: 1,
      time:[],
      dose:1,
    }
  )

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
        <Swiper />
      </InputSection>
      <InputSection>
        <h3>약 이름<p>*</p></h3>
        <div>
          <DataInput required={1} minlength={1} type="text" data={data} setData={setData} name="name"/>
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
         <DataInput type="date" data={data} setData={setData} value="expiryDate"/>
        </div>
      </InputSection>
      <InputSection>
        <h3>잔여알수 / 전체용량</h3>
        <Box>
          <DataInput placeholder="잔여알수" type="number" name="currentQty" data={data} setData={setData} />
          /
          <DataInput placeholder="전체용량" type="number" name="totalQty" data={data} setData={setData}/> 
        </Box>
      </InputSection>
      <InputSection>
        <h3>복용 기간</h3>
        <div>
          <DataInput required={1} minlength={1} placeholder="시작일" type="date" name="startDate" data={data} setData={setData}/>
          ~
          <DataInput placeholder="종료일" type="date" name="endDate" data={data} setData={setData}/>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 주기<p>*</p></h3>
        <div>
          <OptionTag selected={1}>매일</OptionTag>
          <OptionTag>N일</OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 시간</h3>
        <div>
          {/* <OptionTag selected={1}>오전 9시<button><FontAwesomeIcon icon={faTimes}/></button></OptionTag> */}
          {/* <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn> */}
        </div>
      </InputSection>
      <InputSection>
        <h3>복용량<p>*</p></h3>
        <div>
        <AddBtn><FontAwesomeIcon icon={faMinus}/></AddBtn>
        <DataInput required={1} placeholder="1회 복용량" type="number" name="dose" data={data} setData={setData} />
        <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      {isOpen &&  <CreateModal isOpen={isOpen} openContainsModalHandler={openContainsModalHandler} data={data} setData={setData}/>}
    </DataCreateContainer >    
  )
}

export default DataCrete;
