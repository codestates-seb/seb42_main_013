import GlobalStyle from "./styles/GlobalStyle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Suggest from "./pages/Suggest";
import Search from "./pages/Search";
import Intro from "./pages/Intro";
import DataCreate from "./pages/DataCreate"
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SetUserInfo from "./pages/SetUserInfo";
import Summary from "./pages/Summary";
import Calendar from "./pages/CalendarPage";
import SignupDone from "./pages/SignupDone";
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="web-description">
          test - 웹 화면
        </div>
        <div className="app-wrap">
          {(pathname === "/intro") ? null : <Header />}
          <div className={(pathname === "/intro" || pathname === "/login" || pathname === "/signupdone") ? "" : "container"}>
            <Routes>
              <Route path="/" element={<Suggest />} />
              <Route path="/search" element={<Search />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/datacreate" element={<DataCreate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/setuserinfo" element={<SetUserInfo />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/calendar" element={<Calendar />} />
              {/*추후 모달 형식으로 바꿀 경우 삭제할 예정*/}
              <Route path="/signupdone" element={<SignupDone />} />
            </Routes>
          </div>
          {(pathname === "/intro" || pathname === "/login" || pathname === "/datacreate" || pathname === "/signupdone") ? null : <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
