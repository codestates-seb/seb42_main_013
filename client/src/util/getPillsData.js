import axios from "axios";
import loginExpire from "./loginExpire";


function getPillsData (navigate) {
  const config = {
    headers: {
      "Authorization":  sessionStorage.getItem("Authorization")
    }
  }
  return axios
  .get(`${process.env.REACT_APP_API_URL}/detailSupplements`, config)
  .then(res=> {
    return res.data.data
    })
    .catch((err)=>{
      console.log(err)
      // 에러 코드 완성되면 auth 만료시 로그인으로 리다이렉트
      loginExpire()
      // !!sessionStorage.Authorization && alert("로그인 기간이 만료되었습니다.")
      // !!sessionStorage.Authorization && navigate('/login')
    })
}

export default getPillsData;