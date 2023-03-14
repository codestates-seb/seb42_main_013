import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import Items from "../components/Items";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const PriceFilterDiv = styled.div`
  border: 1px solid #999999;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: var(--gap-md);
  margin-bottom: var(--gap-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price-area {
    width: 220px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .not-price-area {
    font-weight: 600;
  }
`

const PriceFilterInput = styled.input`
  width: 70px;
  height: 20px;
  margin-right: 4px;
  :focus {
    outline: none;
  }
`

const PriceFilterBtn = styled.button`
  width: 45px;
  height: 30px;
  background-color: var(--blue-100);
  color: #ffffff;
  border-style: none;
  border-radius: 10px;
`

function Search() {
  const [data, setData] = useState([]);
  const { search_item } = useParams();

  useEffect(() => {
    const url = "/v1/search/shop.json";
    axios.get(url, {
      params: {
        query: search_item.slice(1),
        display: 15,
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    })
      .then((res) => setData(res.data.items))
  }, [search_item])


  return (
    <SearchContainer>
      <SearchBar setData={setData} />
      <ResultContainer>
        <PriceFilterDiv>
          <div className="not-price-area">가격</div>
          <div className="price-area">
            <div><PriceFilterInput type="text" />원</div>
            <div>~</div>
            <div><PriceFilterInput type="text" />원</div>
          </div>
          <PriceFilterBtn className="not-price-area">적용</PriceFilterBtn>
        </PriceFilterDiv>
        <div className="search-result">검색 결과</div>
        {data.map((el, idx) => {
          return (
            <Items key={idx} title={el.title} img={el.image} link={el.link} price={el.lprice} />
          )
        })}
      </ResultContainer>
    </SearchContainer>
  )
}

export default Search;