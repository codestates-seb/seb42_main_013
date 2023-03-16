export function filteringPills (data, filter){
  const filteredData = data.filter((data)=>{
    let filtering = true;
    if(filter === "drug"){
      filtering = data.type === "drug"
    }
    if(filter === "supplement"){
     filtering = data.type === "supplement"
    }
    return filtering
  })  
  return filteredData
}
