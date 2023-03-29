import { useEffect } from "react";
import getUserInfo from "./getUserInfo";

function useAuthCheck() {

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res.response?.status === 500) {
          sessionStorage.removeItem("login");
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("Authorization");
          alert("로그인 기간이 만료되었습니다.");
          window.location.href = '/';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
}

export default useAuthCheck;