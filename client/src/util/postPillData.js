import axios from "axios";


function postPillData (writtenData, navigate) {
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
  console.log(sessionStorage.getItem("Authorization"))
  axios
    .post(`${process.env.REACT_APP_API_URL}/supplements`, supplement, config)
    .then(res=>{
      detailSupplement = {...detailSupplement, supplementId: res.data.data.supplementId}
      axios.post(`${process.env.REACT_APP_API_URL}/detailSupplements`, detailSupplement, config)
      .then(res=> {
        console.log("성공")
      }
      )
    })
    .catch((err)=>{
      console.log(err)
      !!sessionStorage.Authorization && alert("로그인 기간이 만료되었습니다.")
      !!sessionStorage.Authorization && navigate('/login')
    })
}

export default postPillData;