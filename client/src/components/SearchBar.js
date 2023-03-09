import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

function SearchBar() {
  return (
    <SearchBarContainer>
      <SearchBarDiv>
        <SearchInput type="text" placeholder="새로운 영양제 탐색" />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
      </SearchBarDiv>
    </SearchBarContainer>
  )
}

export default SearchBar;