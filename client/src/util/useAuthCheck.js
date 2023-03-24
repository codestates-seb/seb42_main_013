import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getUserInfo from "./getUserInfo";

function useAuthCheck() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res.response?.status === 500) {
          console.log("로그인 만료!");
          // alert("로그인 기간이 만료되었습니다.");
          sessionStorage.removeItem("login");
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("Authorization");
          window.location.href = '/';
        } else {
          console.log("로그인 유지!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [pathname])
}

export default useAuthCheck;