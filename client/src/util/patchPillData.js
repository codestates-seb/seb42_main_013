import axios from "axios"



function patchPillData(writtenData, navigate) {
  let supplement = { 
    "supplementName": writtenData.supplementName,
    "nutrients": writtenData.nutrients,
    "imageURL": writtenData.imageURL,
    "supplementType": writtenData.supplementType,
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
  console.log(writtenData)
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  }
  // console.log(sessionStorage.getItem("Authorization"))
  axios
    .patch(`${process.env.REACT_APP_API_URL}/supplements/${writtenData.supplementId}`, supplement, config)
    .then(res=>{
      console.log("patch1차")
      axios.post(`${process.env.REACT_APP_API_URL}/detailSupplements/${writtenData.detailSupplementId}`, detailSupplement, config)
      .then(res=> {
        console.log("수정 성공")
        // navigate('/summary')
    })})
    .catch((err)=>{
      console.log(err)
    })
    
}

export default patchPillData;