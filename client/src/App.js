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
import Signup from "./pages/Signup";
import WebAside from "./components/WebAside";
import SignupDone from "./pages/SignupDone";
import { useEffect } from "react";
import getUserInfo from "./util/getUserInfo";
import { useNavigate } from "react-router-dom";


import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo()
    .then((res) => {
      console.log("로그인 유지!");
    })
    .catch(err => {
      alert("로그인 기간이 만료되었습니다.");
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("Authorization");
      navigate("/intro");
    });
  }, [pathname])

  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="web-description">
          <WebAside />
        </div>
        <div className="app-wrap">
          {(pathname === "/intro") ? null : <Header />}
          <div className={(pathname === "/intro" || pathname === "/login" || pathname === "/signup" || pathname === "/setuserinfo" || pathname === "/datacreate")
            ? (pathname === "/intro") ? "" : "other" : "container"}>
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/signupDone" element={<SignupDone />} />
            </Routes>
          </div>
          {(pathname === "/intro" || pathname === "/login" || pathname === "/signup" || pathname === "/setuserinfo" || pathname === "/datacreate") ? null : <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
