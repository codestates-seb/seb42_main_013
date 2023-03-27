import axios from "axios"



async function deletePillData(id,navigate) {
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  console.log(id)
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/detailSupplements/${id}`, config)
    .then(res=>{
      console.log("삭제 성공")
    })
    .catch((err)=>{
      console.log(err)
      !!sessionStorage.Authorization && alert("로그인 기간이 만료되었습니다.")
      !!sessionStorage.Authorization && navigate('/login')
    })    
}

export default deletePillData;