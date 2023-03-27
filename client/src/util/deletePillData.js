import axios from "axios"
import getPillsData from "./getPillsData"



function deletePillData(writtenData, deleteDataHandler,navigate) {
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  axios
    .delete(`${process.env.REACT_APP_API_URL}/detailSupplements/${writtenData.detailSupplementId}`, config)
    .then(res=>{
      console.log("삭제 성공")
      deleteDataHandler()
    })
    .catch((err)=>{
      console.log(err)
      !!sessionStorage.Authorization && alert("로그인 기간이 만료되었습니다.")
      !!sessionStorage.Authorization && navigate('/login')
    })    
}

export default deletePillData;