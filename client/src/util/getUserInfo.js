import axios from "axios";

async function getUserInfo() {
  const config = {
    headers: {
      "Authorization": sessionStorage.getItem("Authorization")
    }
  };
  try {
    const response = await axios.get("http://ec2-3-35-105-108.ap-northeast-2.compute.amazonaws.com:8080/users", config)
    return response.data.data;
  } catch (err) {
    // console.log(err)
    return err;
  }
}

export default getUserInfo;