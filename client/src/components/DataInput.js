import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
`

export const FakeInput = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border : ${(props) => props.isFocus ?"1px solid var(--blue-100)" : "1px solid var(--black-400)"};
  border-color: ${(props) => !props.isValid && "rgb(240, 86, 86)"};
  border-radius: 5px;
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
  font-size: 16px;
  height: 32px;
  width: 100%;
  outline: none;
  position:relative;
  color: var(--black-100);
  ::-webkit-outer-spin-button, ::-webkit-inner-spin-button{
    -webkit-appearance: none;
  }
  ::-webkit-calendar-picker-indicator{
    position:absolute;
      /* 부모 relative - 자식 absolute */
      /* 부모 relative 지정 안해주면 전체 화면 cover된다 */
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
  ::placeholder{
    color: var(--black-300)
  }
  &[type='date']::-webkit-datetime-edit {
    display: ${(props) => (!!props.value) ?"inline-block"  :"none"};
  }
  &[type='date']::before{
    position: absolute;
    left: 0px;
    color: var(--black-300);
    content: "${(props) => props.placeholder}";
    width: 100%;
    display: ${(props) => !!props.value && "none"};
  }
`
const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: var(--black-200);
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
const ValidityMsg = styled.div`
  color: rgb(240, 86, 86);
  font-size: 12px;
  opacity : ${(props) => props.isValid ? "0" : "1"};
`


function DataInput ({name, minlength, required, placeholder, data, setData, type}) {
  const [isFocus, setIsFocus] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const changeHandler = (e) => {
    setData({...data,[name]:e.target.value})
    // !isValid && setIsValid(e.target.checkValidity())
    !isValid && setIsValid(e.target.validity.valid)
  }
  const clear = () => {
    setData({...data,[name]:""})
  }
  const blurHandler = (e) => {
    setIsValid(e.target.validity.valid)
    setIsFocus(false)
  }
  return (
    <InputContainer>
      <FakeInput isFocus={isFocus} isValid={isValid}>
        <RealInput
          onFocus={()=>setIsFocus(true)}
          onBlur={blurHandler}
          type={type} 
          value={data[name]}
          onChange={changeHandler} 
          placeholder={placeholder}
          required={required}
        />
        { name === "ingredientAmount" &&
          <DeleteBtn>mg</DeleteBtn>
        }
        { type!=="date" &&
        <>
          <DeleteBtn value={!!data[name]} >
            <button onClick={()=>clear()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </DeleteBtn>
        </>
        }
      </FakeInput>
      <ValidityMsg isValid={isValid}>내용을 입력해주세요.</ValidityMsg>
    </InputContainer>
  )
}

export default DataInput;