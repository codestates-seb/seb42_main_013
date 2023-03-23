import axios from "axios";

async function getUserInfo() {
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  };
  try {
    const response = await axios.get("http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080/users", config)
    return response
  } catch (err) {
    console.log(err)
  }
}

export default getUserInfo;