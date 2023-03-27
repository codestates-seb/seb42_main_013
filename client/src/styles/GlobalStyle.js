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
    /* a 태그 관련 설정 */
    a {text-decoration: none;color: inherit;}a:visited {background: none;}a:active {background: none;};
    ::-webkit-scrollbar {
      display: none;
    }
  }
  :root {
    /* color */
    --blue-100: #5B85EB;
    --black-100: #464646;
    --black-200: #646464;
    --black-300: #999999;
    --black-400: #b4b4b4;
    --black-500: #eaeaea;
    --black-600: #f0f0f0;
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
    min-height: calc(var(--vh, 1vh) * 100);
  }
  .web-description {
    width: 380px;
    @media (max-width: 1023px){
    display: none;
    }
  }
  .app-wrap {
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    max-width: 428px;
    box-shadow: 0px 0px 16px rgb(50 50 50 / 12%);
  }
  .container {
    position: relative;
    top: 48px;
    height: calc(100vh - 112px);
    height: calc((var(--vh, 1vh) * 100) - 112px);
    overflow: scroll;
  }
  .other {
    position: relative;
    top: 48px;
    height: calc(100vh - 48px);
    height: calc((var(--vh, 1vh) * 100) - 112px);
    overflow: scroll;
  }
`

export default GlobalStyle;