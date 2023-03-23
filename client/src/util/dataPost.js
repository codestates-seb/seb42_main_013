import axios from "axios";

function login (pilldata) {
  const data = { 
    "email": "joaaaa@gmail.com",
    "password": "1234",
    // "displayName": "JOAAA"
} 
  const pill = {
      "supplementName": "supplement",
      "expirationDate": "male",
      "startDate":"1990-01-01",
      "endDate":"1990-01-02",
      "takingTime":["8:00","11:00","5:30"],
      "pillsLeft":"50",
      "totalCapacity":"50",
      "dosagePerServing":"30",
      "dosageInterval":"6"
  }

  const supplement = {
    "supplementName": "supplement",
    "nutrients": ["nutrient1","nutrient2","nutrient3"],
    "imageURL": "https://www.imageURL.com",
    "supplementType": "medicine",
    "concernId":"1"
  }
  const userdetails ={
    "birthDate": "1990-01-01",
    "gender": "male",
    "concernIds":["1"]
  }

  const config = {
    headers: {
      "Authorization":  JSON.parse(sessionStorage.getItem("accessToken"))
    }
  }
  axios
    .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/detailSupplements', pilldata, config)
    // .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/supplements', supplement, config)
    // .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/users',data)
    // .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/auth/login',data)
    // .post('http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/details',userdetails,config)
    .then(res=> console.log(res))
    .catch((err)=>{
      console.log(err)
    })
}

export default login;