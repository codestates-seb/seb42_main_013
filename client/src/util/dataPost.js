import axios from "axios";

function login (writtenData) {
  let supplement = { 
    "supplementName": writtenData.supplementName,
    "nutrients": writtenData.nutrients,
    "imageURL": writtenData.imageURL,
    "supplementType": writtenData.supplementType,
    "concernId": null
  } 
  let detailSupplement = { 
      "expirationDate": writtenData.expirationDate,
      "startDate": writtenData.startDate,
      "endDate": writtenData.endDate,
      "takingTime": writtenData.takingTime,
      "pillsLeft": writtenData.pillsLeft,
      "totalCapacity":writtenData.totalCapacity,
      "dosagePerServing": writtenData.totalCapacity,
      "dosageInterval": writtenData.dosageInterval
  }

  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  console.log(supplement)
  axios
    .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/supplements', supplement, config)
    .then(res=>{
      detailSupplement = {...detailSupplement, supplementId: res.data.data.supplementId}
      axios.post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/detailSupplements', detailSupplement, config)
      .then(res=> console.log("성공"))
  })
    .catch((err)=>{
      console.log(err)
    })
}

export default login;