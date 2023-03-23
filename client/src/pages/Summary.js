import { useEffect, useState } from "react";
import styled from "styled-components";
import SummaryList, { ModalMenu, ModalMenuLi } from "../components/SummaryList.js";
import { filteringPills } from "../util/filteringPills.js";
import getPillsData from "../util/getPillsData.js";
import { sortingPills } from "../util/sortingPills.js";


const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`;
const Headfilter = styled.div`
  display: flex;
  padding: 3px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: var(--black-500);
  border-radius: 30px;
  gap: 16px;
`;
const FilterBtn = styled.div`
  text-align: center;
  background-color: ${(props) => (props.selected ? "white" : "var(--black-500)")};
  border-radius: 30px;
  padding: 4px;
  flex: 1;
  box-shadow: ${(props) => (props.selected ? "0px 1px 3px rgba(47, 43, 67, 0.1), inset 0px -1px 0px rgba(47, 43, 67, 0.1)" : "none")};
  color: ${(props) => (props.selected ? "var(--black-200)" : "var(--black-300)")};
  cursor: pointer;
`;
const SummartLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 4px 0;
  position: relative;
  div{
    outline: none;
  }
  button {
    font-size: 14px;
    color: var(--black-100);
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  }
`;

const Sort = styled.div` 
  >button >svg {
    width: 20px;
    height: 20px;
    fill: none;
    transform: ${(props) => (props.isSortOpen && "rotate(180deg)")};
  }
  path {
    stroke: var(--black-100);
    stroke-width: 1;
  }
  >ul {
    position: absolute;
    z-index: 1000;
    right: 45px;
    top: 20px;
  }
`;
const Filter = styled.div`
  svg {
    height: 18px;
    width: 18px;
    fill: none;
  }
  path {
    stroke: var(--black-100);
  }
  circle {
    stroke: var(--black-100);
  }
  > ul {
    position: absolute;
    z-index: 1000;
    right: 0px;
    top: 20px;
  }
`;

function Summary() {
  const dummy = [
    {
      supplementId: 0,
      type: "supplement",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "오메가3",
      nutrients: ["SAT"],
      expirationDate: "2025-01-23",
      pillsLeft: "10",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["09:00"],
      dosagePerServing: 1,
    },
    {
      supplementId: 1,
      type: "supplement",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "오메가3",
      nutrients: ["SAT"],
      expirationDate: "2023-12-25",
      pillsLeft: "98",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["09:00"],
      dosagePerServing: 1,
    },
    {
      supplementId: 2,
      type: "supplement",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "오메가3",
      nutrients: ["SAT"],
      expirationDate: "2023-03-15",
      pillsLeft: "120",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["8:00","11:00","5:30"],
      dosagePerServing: 1,
    },
    {
      supplementId: 3,
      type: "drug",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "항생제",
      nutrients: ["SAT"],
      expirationDate: "2023-04-12",
      pillsLeft: "3",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["11:00","5:30"],
      dosagePerServing: 1,
    },
    {
      supplementId: 4,
      type: "supplement",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "오메가3",
      nutrients: ["SAT"],
      expirationDate: "2023-09-14",
      pillsLeft: "100",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["09:00"],
      dosagePerServing: 1,
    },
    {
      supplementId: 5,
      type: "drug",
      imageURL: "https://freepngimg.com/save/112695-picture-fish-oil-capsule-free-download-png-hd/1000x500",
      supplementName: "감기약",
      nutrients: ["SAT"],
      expirationDate: "2026-09-12",
      pillsLeft: "1",
      totalCapacity: "150",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: "",
      dosageInterval: 1,
      takingTime: ["09:00"],
      dosagePerServing: 1,
    },
  ];
  const [sort, setSort] = useState("pillsLeftAscending");
  const [tab, setTab] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [data, setData] = useState([])
  //!이렇게 해야하는 것인가.....
  const getSortName = {
    "AtoZ": "가나다순",
    "pillsLeftAscending": "남은약 적은순",
    "pillsLeftDescending": "남은약 많은순",
    "expiryDate": "소비기한 임박순"
  }

  const sortClickHandler = (sortby) => {
    setSort(sortby)
    setIsSortOpen(!isSortOpen)
  }
  const getData = () => {
    const response = getPillsData()
    let filtered = filteringPills(response, tab)
    let sorted = sortingPills(filtered, sort)
    setData(sorted)
  }
  

  useEffect(()=>{
    getData()
  },[tab, sort])
 
  return (
    <SummaryContainer>
      <Headfilter>
        <FilterBtn selected={tab === "all"} onClick={() => setTab("all")}>
          종합
        </FilterBtn>
        <FilterBtn selected={tab === "supplement"} onClick={() => setTab("supplement")}>
          영양제
        </FilterBtn>
        <FilterBtn selected={tab === "drug"} onClick={() => setTab("drug")}>
          처방약
        </FilterBtn>
      </Headfilter>
      <Options>
        <Sort onClick={() => setIsSortOpen(!isSortOpen)} isSortOpen={isSortOpen}>
          <button>
            <span>{getSortName[sort]}</span>
            <svg viewBox="0 0 18 18">
              <path d="M13 7L9 11L5 7" />
            </svg>
          </button>
          {isSortOpen && (
            <>
              <ModalMenu onClick={(e) => e.stopPropagation()}>
                <ModalMenuLi selected={sort==="AtoZ"} onClick={()=>sortClickHandler("AtoZ")}>가나다순</ModalMenuLi>
                <ModalMenuLi selected={sort==="pillsLeftAscending"} onClick={()=>sortClickHandler("pillsLeftAscending")}>남은약 적은순</ModalMenuLi>
                <ModalMenuLi selected={sort==="pillsLeftDescending"} onClick={()=>sortClickHandler("pillsLeftDescending")}>남은약 많은순</ModalMenuLi>
                <ModalMenuLi selected={sort==="expiryDate"} onClick={()=>sortClickHandler("expiryDate")}>소비기한 임박순</ModalMenuLi>
              </ModalMenu>
            </>
          )}
        </Sort>
        <Filter>
          <button>
            <span>필터</span>
            <svg viewBox="0 0 18 18">
              <path d="M2 6.5H5" />
              <path d="M7 6.5H16" />
              <circle cx="6" cy="6.5" r="1.5" />
              <path d="M2 11.5H11" />
              <path d="M13 11.5H16" />
              <circle cx="12" cy="11.5" r="1.5" />
            </svg>
          </button>
        </Filter>
      </Options>
      <SummartLists>
        {data.map((ele, idx) => {
          return <SummaryList key={idx} pill={ele} data={data} setData={setData}/>;
        })}
      </SummartLists>
    </SummaryContainer>
  );
}

export default Summary;
