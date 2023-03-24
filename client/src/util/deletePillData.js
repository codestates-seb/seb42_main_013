import axios from "axios"



function deletePillData(writtenData, navigate) {

  console.log(writtenData)
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  axios
    .delete(`${process.env.REACT_APP_API_URL}/supplements/${writtenData.detailSupplementId}`, config)
    .then(res=>{
      console.log(res)
      // navigate('/summary')
    })
    .catch((err)=>{
      console.log(err)
    })    
}

export default deletePillData;