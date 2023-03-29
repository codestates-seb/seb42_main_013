import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../reducer/searchReducer";

const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 428px;
  padding: 16px 20px 0;
  margin-bottom: 16px;
`

const SearchBarDiv = styled.div`
  border-bottom: 1px solid #999999;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon-search {
    color: #464646;
    margin: 0 4px;
    cursor: pointer;
    :hover {
      color: #000000;
    }
  }
`

const SearchInput = styled.input`
  outline: none;
  border-style: none;
  color: #464646;
  font-size: 16px;
  ::placeholder {
    color: #999999;
  }
`

function SearchBar({ setData }) {
  // process.env.REACT_APP_NAVER_CLIENT_ID 형태로 사용
  const state = useSelector(state => state.searchReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchValueHandler = (e) => {
    const data = e.target.value;
    dispatch(searchActions.changeSearchValue({ data }));
  }


  const searchBtnHandler = () => {
    if (state.searchValue.length > 0) {
      navigate(`/search?query=${state.searchValue}`)
    }
  }

  const searchEnterHandler = (e) => {
    if (e.key === "Enter") {
      if (state.searchValue.length > 0) {
        navigate(`/search?query=${state.searchValue}`)
      }
    }
  }

  return (
    <SearchBarContainer>
      <SearchBarDiv>
        <SearchInput type="text" placeholder="새로운 영양제 탐색" value={state.searchValue} onChange={searchValueHandler} onKeyUp={searchEnterHandler} />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" onClick={searchBtnHandler} />
      </SearchBarDiv>
    </SearchBarContainer>
  )
}

export default SearchBar;