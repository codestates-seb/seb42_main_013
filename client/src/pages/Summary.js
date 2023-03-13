import styled from "styled-components";
import SummaryList from "../components/SummaryList.js";


const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`
const Headfilter = styled.div`
  display: flex;
  padding: 2px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: var(--black-500);
  border-radius: 30px;
  gap: 16px;
`
const FilterBtn = styled.div`
  text-align: center;
  background-color: white;
  border-radius: 30px;
  padding: 2px;
  flex: 1;
`
const SummartLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

function Summary (){
  const dummy = [
    {
      type: "supplement",
      img: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      name: "오메가3",
      contains: [{
        ingredientId: 0,
        ingredientName: "오메가3",
        amount: "250mg"
      }],
      expiryDate: "",
      currentQty: "10",
      totalQty: "150",
      startDate: new Date().toISOString().substring(0,10),
      endDate: "",
      cycle: 1,
      time:["09:00"],
      dose:1,
    },
    {
      type: "supplement",
      img: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      name: "오메가3",
      contains: [{
        ingredientId: 0,
        ingredientName: "오메가3",
        amount: "250mg"
      }],
      expiryDate: "2025-12-20",
      currentQty: "1",
      totalQty: "30",
      startDate: new Date().toISOString().substring(0,10),
      endDate: "",
      cycle: 2,
      time:[],
      dose:1,
    },
    {
      type: "supplement",
      img: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      name: "오메가3",
      contains: [{
        ingredientId: 0,
        ingredientName: "오메가3",
        amount: "250mg"
      }],
      expiryDate: "",
      currentQty: "200",
      totalQty: "500",
      startDate: new Date().toISOString().substring(0,10),
      endDate: "",
      cycle: 3,
      time:[],
      dose:1,
    },
  ]

  return (
    <SummaryContainer>
      <Headfilter>
        <FilterBtn>종합</FilterBtn>
        <FilterBtn>종합</FilterBtn>
        <FilterBtn>종합</FilterBtn>
      </Headfilter>
      <SummartLists>
        {dummy.map((ele,idx)=>{
          return <SummaryList key={idx} pill={ele}/>
        })}
        
      </SummartLists>
    </SummaryContainer>
  )
}

export default Summary;