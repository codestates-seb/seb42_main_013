export function filteringPills (data, filter){
  const filteredData = data.filter((data)=>{
    let filtering = true;
    if(filter === "drug"){
      filtering = data.supplementType === "drug"
    }
    if(filter === "supplement"){
     filtering = data.supplementType === "supplement"
    }
    return filtering
  })  
  return filteredData
}
