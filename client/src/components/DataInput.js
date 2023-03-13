import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { clear } from "@testing-library/user-event/dist/clear";


export const SocialBtn = ({ name, href, bgcolor, color }) => {
  return (
    <SocialBtnCss bgcolor={bgcolor} color={color} name={name}>
      <img src={href} alt="아이콘" width="15px" />
      <BtnSpan>
        <BtnDiv>{name}로 시작하기</BtnDiv>
      </BtnSpan>
    </SocialBtnCss>
  )
}
export const BtnSpan = styled.span`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const BtnDiv =styled.div`
  margin:0 !important;
  padding:0 !important;
  font-family: 'NanumBarunGothic';
  color: black !important;
`;

export const SocialBtnCss = styled.button`
  cursor:pointer;
  padding: 5px 20px !important;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0 8px;
  border: ${(props) => props.name==="구글" ? "1px solid #b4b4b4" : "none"};
  font-size: 16px;
  height: 40px;
  padding: var(--gap-md) 0;
  width: 100%;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : "white"};
  :hover{
    background-color: ${(props) => props.name==="구글" ? "#F7F9FA":"#fada0a" };
  }
  :invalid{
    border-color: rgb(240, 86, 86);
  }
`;

export const FakeInput = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border: ${(props) => props.isFocus ? "1px solid var(--blue-100)" : "var(--black-400) solid 1px"};
  border-radius: 5px;
  /* 1줄 꽉채우게 */
  padding: 0 8px;
  :hover{
    background-color: #F7F9FA;
  }
  :invalid{
    border-color: rgb(240, 86, 86);
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
    display: ${(props) => (!!props.value) ? "inline-block" : "none"};
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



function DataInput({ value, minlength, required, placeholder, data, setData, type }) {
  const [isFocus, setIsFocus] = useState(false)
  const changeHandler = (e) => {
    setData({ ...data, [value]: e.target.value })
  }

  const clear = () => {
    setData({ ...data, [value]: "" })
  }
  return (
    <FakeInput isFocus={isFocus}>
      <RealInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        type={type}
        value={data[value]}
        onChange={changeHandler}
        placeholder={placeholder}
        required={required}
        minlength={minlength}
      />
      {type !== "date" &&
        <>
          <DeleteBtn value={!!data[value]} >
            <button onClick={() => clear()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </DeleteBtn>
        </>
      }
    </FakeInput>
  )
}

export default DataInput;