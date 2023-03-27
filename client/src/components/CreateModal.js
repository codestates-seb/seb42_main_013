import styled from "styled-components";
import { AddBtn } from "../pages/DataCreate";
import DataInput, { FakeInput, RealInput } from "./DataInput";
import { useState } from "react";
import { CurrentBtn } from "../styles/Buttons";
import searchByCode from "../util/searchBycode";
import ImageToBarcode from "./ImageToBarcode";
import { Player, Controls } from "@lottiefiles/react-lottie-player";



//!form 대신 disable 속성 적용
export const ModalBackdrop = styled.div`
  /* top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
  /* 위 대신 아래로 하면 기존 컴포넌트도 안밀리고 좋음 */
  inset: 0px;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  z-index: -1;
  @media (min-width: 1024px){
    padding-left: 460px;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1200;
`;



export const ModalView = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: #ffffff;
  margin: auto;
  padding: 16px 20px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 14px;
  gap: 4px;
  >div:nth-last-child(3){
    margin-top: 4px;
  }
  .closebtn{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: -8px;
    margin-bottom: -8px;
    color:white-space;
    >button{
      width: 20px;
      height: 20px;
    }
    svg{
      fill: currentColor;
    }
  }
`
const Title = styled.div`
  font-family: "NanumBarunGothicBold";
  color: var(--black-200);
  font-size: 16px;
`

const Buttons = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 4px;
  >button:first-child{
    background-color: transparent;
    border: 1px solid var(--black-400);
    color: var(--black-100);
  }
  >button{
    padding: 8px 0;
    flex: 1; 
  }
`
const LoadingImgBox = styled.div`
 position: fixed;
 top: 30%;
`


function CreateModal ({isOpen, openModalHandler, data, name, setData}) {
  const [ele, setEle] = useState({key:""})
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = () => {
    setEle({key:""})
    openModalHandler()
  }
  const addEleHandler = () => {
    // let id = data.ingredients.length===0 ?0 :data.ingredients.at(-1).ingredientId+1
    // setData({...data, ingredients:[...data.ingredients, { ...ingredient,ingredientId: id}]})
    // 함량은 표기 안하기로 함
    const sortedNewArr = [...data[name],ele.key].sort()
    setData({...data,[name]:sortedNewArr})
    setEle({key:""})
    openModalHandler();
  }
  const [barcode, setBarcode] = useState({barcode:""})
  const [isDetectorAvailable,setIsDetectorAvailable] = useState(false)
  const searchHandler = () => {
    setIsLoading(true)
    setBarcode("")
    !!barcode.barcode && searchByCode(barcode.barcode, setData, setIsLoading)
      .then(res=>{
        setIsLoading(false)
        openModalHandler()
      })
  }

  return (
    <ModalContainer>
      {/* 로딩되는 동안은 백드롭 안꺼지게 */}
       <ModalBackdrop onClick={()=> !isLoading && openModalHandler()}>
      {
      isLoading 
      ?
        <LoadingImgBox><Player autoplay loop src="https://assets8.lottiefiles.com/packages/lf20_aNSztVN7Us.json" /></LoadingImgBox>
      :
        <ModalView onClick={(e) => e.stopPropagation()} >
          {/* <div className="closebtn">
            <AddBtn onClick={openContainsModalHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </AddBtn>
          </div> */}
          { name==="takingTime" && 
            <>
              <Title>복용 시간</Title>
              <DataInput type="time" data={ele} required={1} setData={setEle} name="key" /> 
            </>}
          { name==="nutrients" && 
          <>
            <Title>성분명</Title>
            <DataInput data={ele} required={1} setData={setEle} name="key"/>
          </>
          }
          { name==="barcode" && <>
            <Title>바코드</Title>
            <ImageToBarcode setBarcode={setBarcode} barcode={barcode} isDetectorAvailable={isDetectorAvailable} setIsDetectorAvailable={setIsDetectorAvailable} />
            <DataInput data={barcode} setData={setBarcode} placeholder="숫자 직접 입력하기" name="barcode" onKeyPress={(e)=>{e.key==="Enter" && searchHandler()}}/>
          </>}
          {/* <div>함량</div> */}
          {/* <DataInput type="number" data={ingredient} required={1} setData={setIngredient} name="ingredientAmount" /> */}
          <Buttons>
            <CurrentBtn type="button" onClick={closeModalHandler}>취소</CurrentBtn>
            {name === "barcode"
            ? <CurrentBtn type="button" disabled={!barcode.barcode} onClick={searchHandler}>조회하기</CurrentBtn>
            : <CurrentBtn type="button" disabled={!ele.key} onClick={addEleHandler}>추가하기</CurrentBtn>
            }
          </Buttons>
        </ModalView>
      }
      </ModalBackdrop>
    </ModalContainer>
  )

}

export default CreateModal;