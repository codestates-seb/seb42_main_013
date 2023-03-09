import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: 'NanumBarunGothicExtraLight'; */
    /* font-family: 'NanumBarunGothicLight'; */
    font-family: 'NanumBarunGothic';
    /* font-family: 'NanumBarunGothicBold'; */
    }
  :root {
    /* color */
    --blue-100: #5B85EB;
    /* gap */
    --gap-sm: 8px;
    --gap-md: 16px;
    --gap-lg: 24px;
  }
  .app-container {
    display: flex;
    justify-content: center;
    gap: 80px;
    min-height: 100vh;
  }
  .web-description {
    width: 380px;
    background-color: #5B85EB;
    @media (max-width: 1023px){
    display: none;
    }
  }
  .app-wrap {
    width: 100%;
    max-width: 428px;
    background-color: aquamarine;
  }
  .container {
    padding-top: 48px;
  }
`

export default GlobalStyle;