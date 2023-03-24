import axios from "axios";


function getPillsData () {
  const config = {
    headers: {
      "Authorization":  sessionStorage.getItem("Authorization")
    }
  }
  return axios
    .get('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/detailSupplements', config)
    .then(res=> {
      return res.data.data
    })
    .catch((err)=>{
      console.log(err)
    })
}

export default getPillsData;