import styled from "styled-components";

export const RealInput = styled.input`
  border-color: transparent;
  border: none;
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
  border: var(--border);
  border-radius: var(--border-radius);
  height: auto;
  flex: 1 0 40%;
  /* 1줄 꽉채우게 */
  padding: 0 var(--gap-sm);
`


function DataInput ({value, handler, type}) {
  return (
    <FakeInput>
      <RealInput
        type={type} 
        value={value}
        onChange={handler} 
        width={value && value.length+1}
      />
    </FakeInput> 
  )
}

export default DataInput;