import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import Items from "../components/Items";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAuthCheck from "../util/useAuthCheck";
import { useSelector } from "react-redux";

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
  .search-no-result {
    width: 100%;
    text-align: center;
    padding: var(--gap-lg) 0;
    p {
      margin: var(--gap-sm) 0;
    }
  }
`

const ResultTitleDiv = styled.div`
  margin: var(--gap-lg) 0;
  .search-result {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .search-description {
    font-size: 14px;
  }
`

const PriceFilterDiv = styled.div`
  border: 1px solid #999999;
  border-radius: 30px;
  width: 100%;
  height: 50px;
  padding: var(--gap-sm) var(--gap-lg);
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
  border-radius: 5px;
  cursor: pointer;
`

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
  const [searchData, setSearchData] = useState([]);
  const [isClicked, setIsClicked] = useState(1);
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { login } = useSelector(state => state.loginInfoReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if(!login) {
      navigate("/intro");
    }
  }, [login])

  useAuthCheck();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/open/naver/shopping`, {
      params: {
        query,
      },
    })
      .then((res) => {
        setSearchData(res.data.items)
      })
      .catch(err => console.log(err))
  }, [query])

  console.log(query);

    // 페이지네이션
    const newNum = searchData.length;
    const newNumbers = Array.from({length: Math.ceil(newNum / 10)}, (v, i) => i + 1);
    let curPage = searchData.slice((isClicked - 1) * 10, isClicked * 10);

  const paginationHandler = (e) => {
    setIsClicked(Number(e.target.textContent));
  }

  const prevBtnHandler = () => {
    if (isClicked !== 1) {
      setIsClicked(isClicked - 1);
    }
  }

  const nextBtnHandler = () => {
    if (isClicked !== 5) {
      setIsClicked(isClicked + 1);
    }
  }

  const lowPriceChange = (e) => {
    setLowPrice(e.target.value);
  }

  const highPriceChange = (e) => {
    setHighPrice(e.target.value);
  }

  const priceFilterHandler = (e) => {
    // TODO: 상태 말고 그냥 정적인 값으로 관리할 수 없을지 생각해보기
    e.preventDefault();
    let filteredData = searchData.slice();
    if(lowPrice.length !== 0) {
      filteredData = filteredData.filter(el => Number(el.lprice) >= Number(lowPrice));
    }
    if(highPrice.length !== 0) {
      filteredData = filteredData.filter(el => Number(el.lprice) <= Number(highPrice));
    }
    setSearchData(filteredData);
  }

  // console.log(data);

  return (
    <SearchContainer>
      <SearchBar setData={setSearchData} />
      <ResultContainer>
        <PriceFilterDiv>
          <div className="not-price-area">가격</div>
          <div className="price-area">
            <div><PriceFilterInput type="text" value={lowPrice} onChange={lowPriceChange}/>원</div>
            <div>~</div>
            <div><PriceFilterInput type="text" value={highPrice} onChange={highPriceChange}/>원</div>
          </div>
          <PriceFilterBtn className="not-price-area" onClick={priceFilterHandler}>적용</PriceFilterBtn>
        </PriceFilterDiv>
        <ResultTitleDiv>
          <div className="search-result">'{query}' 검색 결과</div>
          <div className="search-description">(검색 결과는 최대 50건까지 확인할 수 있습니다.)</div>
        </ResultTitleDiv>
        {searchData.length === 0 ? <div className="search-no-result">
          <p><strong>'{query}'</strong>에 대한 검색 결과가 없습니다.</p>
          <p>검색어를 확인해 주세요.</p>
        </div>
          : curPage.map((el, idx) => {
            return (
              <Items key={idx} title={el.title} img={el.image} link={el.link} price={el.lprice} />
            )
          })}
      </ResultContainer>
      {searchData.length === 0 ? null
        : <PaginationDiv>
          <FontAwesomeIcon icon={faChevronLeft} className="pagination-arrow" onClick={prevBtnHandler} />
          {newNumbers.map(el => {
            return (
              <PaginationBtn key={el} onClick={paginationHandler} clicked={el === isClicked}>{el}</PaginationBtn>
            )
          })}
          <FontAwesomeIcon icon={faChevronRight} className="pagination-arrow" onClick={nextBtnHandler} />
        </PaginationDiv>
      }

    </SearchContainer>
  )
}

export default Search;