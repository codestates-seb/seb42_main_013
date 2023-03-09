import GlobalStyle from "./styles/GlobalStyle";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="web-description">
          test - 웹 화면
        </div>
        <div className="app-wrap">
          <Header />
          <div className="container">
          test - 메인 화면
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
