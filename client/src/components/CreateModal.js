import styled from "styled-components";
import { AddBtn } from "../pages/DataCreate";
import DataInput from "./DataInput";
import { useState } from "react";
import { CurrentBtn } from "../styles/Buttons";



const ModalBackdrop = styled.div`
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
  border-radius: 5px;
  background-color: #ffffff;
  margin: auto;
  padding: 16px 20px;
  max-width: 428px;
  width: calc(100% - 20px);
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


function CreateModal ({isOpen, openContainsModalHandler, data, setData}) {
  const [ingredient, setIngredient] = useState({
    ingredientId: null,
    ingredientName: '',
    ingredientAmount: ''
  })
  return (
    <ModalContainer>
      {isOpen === true ? <ModalBackdrop onClick={openContainsModalHandler}>
        <div></div>
        <ModalView onClick={(e) => e.stopPropagation()}>
          {/* <div className="closebtn">
            <AddBtn onClick={openContainsModalHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </AddBtn>
          </div> */}
          <div>성분명</div>
          <DataInput data={ingredient} setData={setIngredient} name="ingredientName" />
          <div>함량</div>
          <DataInput data={ingredient} setData={setIngredient} name="ingredientAmount" />
          <Buttons><CurrentBtn>취소</CurrentBtn><CurrentBtn>추가하기</CurrentBtn></Buttons>
        </ModalView>
      </ModalBackdrop> : null}
    </ModalContainer>
  )

}

export default CreateModal;