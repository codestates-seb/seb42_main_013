export function filteringPills (data, filter){
  const filteredData = data.filter((data)=>{
    let filtering = true;
    if(filter === "drug"){
      filtering = data.supplementResponse.supplementType === "drug"
    }
    if(filter === "supplement"){
     filtering = data.supplementResponse.supplementType === "supplement"
    }
    return filtering
  })  
  return filteredData
}
