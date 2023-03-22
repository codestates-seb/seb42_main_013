export function sortingPills (data, sortby){
  let sortedData = []
  switch(sortby){
    case "AtoZ" :
      sortedData=data.sort((a,b)=>{
        const A = a.supplementName.toUpperCase()
        const B = b.supplementName.toUpperCase()
        if(A<B) return -1
        if(B>A) return 1
        return 0      
      })
    break;
    case "pillsLeftAscending":
      sortedData=data.sort((a,b)=>a.pillsLeft-b.pillsLeft)
    break;
    case "pillsLeftDescending":
      sortedData=data.sort((b,a)=>a.pillsLeft-b.pillsLeft)
    break;
    case "expiryDate":
      sortedData=data.sort((a,b)=>new Date(a.expirationDate)-new Date(b.expirationDate))
    break;
    default:
      sortedData=data
  }
  return sortedData
}