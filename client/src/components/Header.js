import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 48px;
  position: fixed;
  top: 0;
  border: 1px solid #000000;
  padding: 0 20px;
`

function Header() {
  return (
    <HeaderContainer>
      나 Header임
    </HeaderContainer>
  )
}

export default Header;