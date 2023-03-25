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
  axios
    .patch(`${process.env.REACT_APP_API_URL}/supplements/${writtenData.supplementId}`, supplement, config)
    .then(res=>{
      axios.patch(`${process.env.REACT_APP_API_URL}/detailSupplements/${writtenData.detailSupplementId}`, detailSupplement, config)
      .then(res=> {
        navigate('/summary')
    })})
    .catch((err)=>{
      console.log(err)
    })    
}

export default patchPillData;