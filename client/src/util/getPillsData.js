import axios from "axios";


function getPillsData () {
  const config = {
    headers: {
      "Authorization":  JSON.parse(sessionStorage.getItem("accessToken"))
    }
  }
  axios
    .get('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/detailSupplements', config)
    .then(res=> console.log(res))
    .catch((err)=>{
      console.log(err)
    })
}

export default getPillsData;