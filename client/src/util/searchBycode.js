import axios from "axios";

//! 13자리 코드 앞자리가 880이면 국내제품

function searchByCode (code, setData) {
  const config = {
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_X_Api_Key}`
    }
  }

  const splitCode = (!code.includes(" ") && (code.length===12 || code.length===11)) ? `"${code.slice(0,1)} ${code.slice(1,6)} ${code.slice(6,11)} ${code.slice(11)}"` : `"${code}"`
  const replacedCode = splitCode.includes(" ") && splitCode.replaceAll(" ", "%20")
  axios
    .get(`${process.env.REACT_APP_API_SEARCH_FILTER_URL}${replacedCode}`,config)
    .then((res)=>{
      return res.data.hits[0]._id
    })
    .then((id)=>{
      return axios.get(`${process.env.REACT_APP_API_ID_URL}${id}`,config)
    })
    .then((res)=>{
      if(code.replaceAll(" ","")===res.data.upcSku.replaceAll(" ","")){
        const suggestedTime = (minDailyServings) => {
          if(minDailyServings === 2){
            return ["07:00", "19:00"]
          } else if(minDailyServings === 3){
            return ["07:00", "13:00", "19:00"]
          }
        }
        const setEndDate = (servingsPerContainer) => {
          const today = new Date()
          today.setDate(today.getDate()+Number(servingsPerContainer))
          const endDate = today.toISOString().substring(0, 10)
          return endDate
        }
        const data = res.data
        const obj=
        {
          supplementId: null,
          type: "supplement",
          imageURL: null,
          supplementName: data.fullName,
          nutrients: data.ingredientRows.map((ele)=> ele.ingredientGroup),
          expirationDate: "",
          pillsLeft: data.netContents[0].quantity,
          totalCapacity: data.netContents[0].quantity,
          startDate: new Date().toISOString().substring(0, 10),
          endDate: data.servingsPerContainer ?setEndDate(data.servingsPerContainer) :"",
          dosageInterval: "1",
          takingTime: suggestedTime(data.servingSizes[0].minDailyServings),
          dosagePerServing: data.servingSizes[0].minQuantity,
        }
        setData(obj)
      } else {
        alert("데이터베이스에 존재하지 않는 코드입니다.")
      }

    })
    .catch((err)=>{
      console.log(err)
    })

  // const getId = async (code) => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}${code}`,config)
  //     // return response.data
  //     const id = response.data.hits[0]._id
  //     console.log(id)
  //     const info = getInfo(id)
  //     console.log(info)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}



export default searchByCode;