import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { clear } from "@testing-library/user-event/dist/clear";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  >div:last-child{
    color: rgb(240, 86, 86);
    font-size: 12px;
    margin-top: 4px;
    margin-left: 2px;
  }
`
export const FakeInput = styled.div`
  display: flex;
  border: ${(props) => props.isFocus ? "1px solid var(--blue-100)" : "var(--black-400) solid 1px"};
  border-radius: 5px;
  flex: 1 0 40%;
  /* 1줄 꽉채우게 */
  padding: 0 8px;
  :hover{
    background-color: #F7F9FA;
  }
`

export const RealInput = styled.input`
  border: none;
  background-color: transparent;
  box-shadow: none ;
  outline: 0;
  font-size: 16px;
  height: 32px;
  width: 100%;
  ::-webkit-outer-spin-button, ::-webkit-inner-spin-button{
    -webkit-appearance: none;
  }
  ::placeholder{
    color : var(--black-300)
  }
`
const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  >button{
    opacity : ${(props) => props.value ? "1" : "0"};
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    border: 0;
    width: 20px;
    height: 20px;
  }
  svg{
    color: var(--black-200);
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`



function DataInput ({value, key, placeholder, data, setData, isRequired, type}) {
  const [isFocus, setIsFocus] = useState(false)
  const onBlurHandler = (e) => {
    setIsFocus(false)
  }
  const changeHandler = (e) => {
    const copiedData = data
    copiedData[key]=e.target.value
    setData(copiedData)
    console.log(value)
  }
  const clear = () => {
    const copiedData = data
    copiedData[key]=null
    setData(copiedData)
  }
 
  return (
    <InputContainer>
      <FakeInput isFocus={isFocus}>
        <RealInput
          onFocus={()=>setIsFocus(true)}
          onBlur={()=>setIsFocus(false)}
          type={type} 
          value={value}
          onChange={changeHandler} 
          width={value && value.length+1}
          placeholder={placeholder}
        />
        {
        <>
          <DeleteBtn value={value} onClick={clear}>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </DeleteBtn>
        </>
        }
      </FakeInput>
      {isRequired && <div> !! 필수 입력 항목입니다.</div>}
    </InputContainer>

  )
}

export default DataInput;