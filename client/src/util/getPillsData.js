import axios from "axios";


function getPillsData () {
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
    })
}

export default getPillsData;