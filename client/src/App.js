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
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { setOneVh } from "./styles/setOneVh";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    setOneVh();
      window.addEventListener('resize', setOneVh);
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <div className="web-description">
          <WebAside />
        </div>
        <div className="app-wrap">
          {(pathname === "/") ? null : <Header />}
          <div className={(pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/setuserinfo" || pathname === "/signupDone")
            ? (pathname === "/") ? "" : "other" : (pathname === "/datacreate") ?"nofooter" :"container"}>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/search" element={<Search />} />
              <Route path="/suggest" element={<Suggest />} />
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
          {(pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/setuserinfo" || pathname === "/datacreate" || pathname === "/signupDone") ? null : <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
