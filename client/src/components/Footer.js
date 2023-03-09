import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 64px;
  position: fixed;
  bottom: 0;
  border: 1px solid #000000;
`

function Footer() {
  return (
    <FooterContainer>
      나 Footer임
    </FooterContainer>
  )
}

export default Footer;