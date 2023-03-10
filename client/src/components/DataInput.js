import { useState } from "react";
import styled from "styled-components";


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
    color : red
  }
`
const FakeInput = styled.div`
  border: ${(props) => props.isFocus ? "1px solid var(--blue-100)" : "var(--black-400) solid 1px"};
  border-radius: 5px;
  flex: 1 0 40%;
  /* 1줄 꽉채우게 */
  padding: 0 var(--gap-sm);
  :hover{
    background-color: #F7F9FA;
  }
`


function DataInput ({value, handler, type, placeholder}) {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <FakeInput isFocus={isFocus}>
      <RealInput
        onFocus={()=>setIsFocus(true)}
        onBlur={()=>setIsFocus(false)}
        type={type} 
        value={value}
        onChange={handler} 
        width={value && value.length+1}
        placeholder={placeholder}
      />
    </FakeInput> 
  )
}

export default DataInput;