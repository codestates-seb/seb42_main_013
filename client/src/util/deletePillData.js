import axios from "axios"
import loginExpire from "./loginExpire"



async function deletePillData(id,data, setData,openDeleteHanlder) {
  const config = { 
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/detailSupplements/${id}`, config)
    .then((res)=>{
      console.log(data)
      let deletedData = data.filter((ele)=>ele.detailSupplementId !== id)
      setData(deletedData)
      openDeleteHanlder()
    })
    .catch((err)=>{
      console.log(err)
      // !!sessionStorage.Authorization && alert("로그인 기간이 만료되었습니다.")
      // !!sessionStorage.Authorization && navigate('/login')
      // loginExpire();
    })    
}

export default deletePillData;