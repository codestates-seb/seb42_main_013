import styled from "styled-components";

export const CurrentBtn = styled.button`
  width: 100%;
  border-style: none;
  border-radius: 5px;
  background-color: var(--blue-100);
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  padding: var(--gap-md) 0;
  :hover {background-color: #6b91ed} :active {background-color: #6b91ed}
`

export const SmallBtn = styled(CurrentBtn)`
  width: 70%;
`