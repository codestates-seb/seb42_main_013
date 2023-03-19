import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import Items from "../components/Items";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 100%;
  color: var(--black-100);
`

const ResultContainer = styled.div`
  padding: 0 20px;
  padding-bottom: var(--gap-md);
  .search-result {
    font-size: 18px;
    font-weight: 600;
    margin: var(--gap-lg) 0;
  }
`

// const PriceFilterDiv = styled.div`
//   border: 1px solid #999999;
//   border-radius: 10px;
//   width: 100%;
//   height: 50px;
//   padding: var(--gap-md);
//   margin-bottom: var(--gap-md);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   .price-area {
//     width: 220px;
//     display: flex;
//     justify-content: space-evenly;
//     align-items: center;
//   }
//   .not-price-area {
//     font-weight: 600;
//   }
// `

// const PriceFilterInput = styled.input`
//   width: 70px;
//   height: 20px;
//   margin-right: 4px;
//   :focus {
//     outline: none;
//   }
// `

// const PriceFilterBtn = styled.button`
//   width: 45px;
//   height: 30px;
//   background-color: var(--blue-100);
//   color: #ffffff;
//   border-style: none;
//   border-radius: 10px;
// `

const PaginationBtn = styled.button`
  border-style: none;
  margin: 0 var(--gap-sm);
  background-color: transparent;
  font-size: 16px;
  color: ${(props) => props.clicked ? "var(--blue-100)" : "var(--black-100)"};
  font-weight: ${(props) => props.clicked ? "700" : "500"};
  cursor: pointer;
`

const PaginationDiv = styled.div`
  width: 100%;
  padding: var(--gap-md) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination-arrow {
    margin: 0 var(--gap-sm);
    cursor: pointer;
  }
  .clicked {
    color: var(--blue-100);
    font-weight: 700;
  }
`

function Search() {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const numbers = [1, 2, 3, 4, 5]
  const query = searchParams.get("query");

  useEffect(() => {
    const url = "/v1/search/shop.json";
    axios.get(url, {
      params: {
        query,
        display: 10,
        start: (10 * (isClicked - 1) + 1)
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    })
      .then((res) => {
        setData(res.data.items)
      })
  }, [query, isClicked])

  const paginationHandler = (e) => {
    setIsClicked(Number(e.target.textContent));
  }

  const prevBtnHandler = () => {
    if(isClicked !== 1) {
      setIsClicked(isClicked - 1);
    }
  }

  const nextBtnHandler = () => {
    if(isClicked !== 5) {
      setIsClicked(isClicked + 1);
    }
  }

  return (
    <SearchContainer>
      <SearchBar setData={setData} />
      <ResultContainer>
        {/* <PriceFilterDiv>
          <div className="not-price-area">가격</div>
          <div className="price-area">
            <div><PriceFilterInput type="text" />원</div>
            <div>~</div>
            <div><PriceFilterInput type="text" />원</div>
          </div>
          <PriceFilterBtn className="not-price-area">적용</PriceFilterBtn>
        </PriceFilterDiv> */}
        <div className="search-result">'{query}' 검색 결과</div>
        {data.map((el, idx) => {
          return (
            <Items key={idx} title={el.title} img={el.image} link={el.link} price={el.lprice} />
          )
        })}
      </ResultContainer>
      <PaginationDiv>
        <FontAwesomeIcon icon={faChevronLeft} className="pagination-arrow" onClick={prevBtnHandler} />
        {numbers.map(el => {
          return (
            <PaginationBtn key={el} onClick={paginationHandler} clicked={el === isClicked}>{el}</PaginationBtn>
          )
        })}
        <FontAwesomeIcon icon={faChevronRight} className="pagination-arrow" onClick={nextBtnHandler}/>
      </PaginationDiv>
    </SearchContainer>
  )
}

export default Search;