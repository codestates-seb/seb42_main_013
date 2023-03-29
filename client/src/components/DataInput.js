import { useState } from "react";
import styled from "styled-components";


export const FakeInput = styled.div`
  display: flex;
  flex: 1;
  border : ${(props) => props.isFocus ?"1px solid var(--blue-100)" : "1px solid var(--black-400)"};
  border-color: ${(props) => !props.isValid && "rgb(240, 86, 86)"};
  box-shadow: ${(props) => ((props.isValid&&props.isFocus) && "0 0 2px 2px rgba(5, 145,255, .1)")};
  border-radius: 5px;
  /* 1줄 꽉채우게 */
  padding: 0 8px;
  position: relative;
  transform: all .2s cubic-bezier(.645,.045,.355,1);
  :hover{
    background-color: #F7F9FA;
  }
  ::after{
    position: absolute;
    left:0;
    bottom: -18px;
    font-size: 12px;
    color: rgb(240, 86, 86);
    content: "${(props) => props.validationMessage}";
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
    color: var(--black-400)
  }
  &[type='date']::-webkit-datetime-edit {
    display: ${(props) => (!!props.value) ? "inline-block" : "none"};
  }
  &[type='date']::before{
    position: absolute;
    left: 0px;
    color: var(--black-400);
    content: "${(props) => props.placeholder}";
    width: 100%;
    display: ${(props) => !!props.value && "none"};
  }
  &[type='time']{
    min-width: 100px;
  }
`
export const DeleteBtn = styled.div`
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
    color: var(--black-400);
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`
// const ValidityMsg = styled.div`
//   color: rgb(240, 86, 86);
//   font-size: 12px;
//   opacity : ${(props) => props.isValid ? "0" : "1"};
// `


function DataInput ({name, min, max, required, placeholder, data, setData, type}) {
  const [isFocus, setIsFocus] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [validityState, setValidityState] = useState("")
  
  const getValidtyState = (e) => {
    if(!e.target.validity.valid){
      let validity = ''
      for(let key in e.target.validity){
        if(e.target.validity[key]) validity = key
      }
      return validity
    }
  }
  const validationMessage = (validityState) => {
    let message = ''
    switch(validityState) {
      case "rangeOverflow" :
        message = "전체 용량보다 적어야 합니다."
      break;
      case "valueMissing" :
        message = "필수 입력 항목입니다."
      break;
      case "rangeUnderflow" :
        message = "0 이상의 숫자를 입력해주세요."
      break;
      case "customError" :
        message = "잔여 알 수 보다 많아야 합니다."
      break;
      case "badInput" :
        message = "유효한 값을 입력해주세요."
      break;
      default:
        message = ""
    }
    return message
  }


  const changeHandler = (e) => {
    setData({...data,[name]:e.target.value})
    // !isValid && setIsValid(e.target.checkValidity())
    // 한번 blur 후에 유효성 체크 되도록
    if(name==="totalCapacity" && Number(e.target.value)<Number(data.pillsLeft)){
      e.target.setCustomValidity("lessThanCurrent")
    } else {
      e.target.setCustomValidity("")
    }
    !isValid && setIsValid(e.target.validity.valid)
    !isValid && setValidityState(getValidtyState(e))//message 출력을 위한 state 설정
  }
  const clear = () => {
    setData({...data,[name]:""})
  }
  const blurHandler = (e) => {
    setIsValid(e.target.validity.valid)
    setValidityState(getValidtyState(e))
    setIsFocus(false)
  }
  const messageStopper = (e) => {
    //브라우저 Invalid 메세지 hide를 위해
    e.preventDefault();
    //custom message showing
    setIsValid(false)
    setValidityState(getValidtyState(e))
  }
  return (
      <FakeInput isFocus={isFocus} isValid={isValid} validationMessage={validationMessage(validityState)}>
        <RealInput
          onFocus={()=>setIsFocus(true)}
          onBlur={blurHandler}
          type={type} 
          value={data[name]}
          onChange={changeHandler} 
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          name={name}
          onInvalid={messageStopper}
        />
        {/* { name === "ingredientAmount" &&
          <DeleteBtn>mg</DeleteBtn>
        } */}
        { name === "dose" &&
          <DeleteBtn>알</DeleteBtn>
        }
        { type!=="date" &&
        <>
          <DeleteBtn value={!!data[name]} >
            <button type="button" onClick={()=>clear()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </DeleteBtn>
        </>
        }
      </FakeInput>
  )
}

export default DataInput;