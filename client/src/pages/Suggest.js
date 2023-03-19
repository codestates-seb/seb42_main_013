import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ScrollBar from "../components/ScrollBar";
import { useSelector, useDispatch } from "react-redux";
import { health } from "../components/Health";
import { useEffect } from "react";
import { concernActions } from "../reducer/concernReducer";
import { searchActions } from "../reducer/searchReducer";
import { useNavigate } from "react-router-dom";
import card1 from "../images/cards/card1.jpg";
import card2 from "../images/cards/card2.jpg";
import card3 from "../images/cards/card3.jpg";
import card4 from "../images/cards/card4.jpg";

const SuggestContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 100%;
  color: var(--black-100);
`

const UserContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 0 20px;
  margin-top: var(--gap-md);
`
const UserConcern = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid var(--blue-100);
  border-radius: 30px;
  padding: var(--gap-md);
  .user-name {
    color: var(--blue-100);
    font-weight: 600;
  }
`

const UserSupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  .supplement-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  @media (max-width: 427px){
    font-size: 3.27vw;
    }
`

const UserSupImg = styled.img`
  width: 45px;
  margin-bottom: var(--gap-sm);
  @media (max-width: 427px){
    width: 10.51vw;
    }
`

const SugContentConatiner = styled.div`
  padding: 0 20px var(--gap-md);
  .smallcontent-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
`

const LargeContent = styled.div`
  margin-bottom: var(--gap-lg);
  padding: var(--gap-md);
  width: 100%;
  height: 360px;
  background-color: rgba(91, 133, 235, 0.8);
  border-radius: 30px;
  color: #ffffff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 427px){
    height: 80vw;
    font-size: 3.5vw;
    }
`

const SupplementsArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: var(--gap-md);
  gap: 4px;
`

const SupplementDiv = styled.div`
  width: 30%;
  height: 48.5%;
  display: flex;
  flex-direction: column;
  margin: 0 var(--gap-lg);
  justify-content: flex-start;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  cursor: pointer;
  @media (max-width: 427px){
    width: 22.4vw;
  }
`

const SupplementImgDiv = styled.div`
  width: 102px;
  height: 70%;
  border-radius: 25px;
  background-color: #ffffff;
  margin-bottom: 4px;
  @media (max-width: 427px){
    width: 21.2vw;
  }
`

const SmallContent1 = styled.div`
  padding: 12px;
  width: 46.395%;
  height: 180px;
  border-style: none;
  background-image: url(${card4});
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  color: var(--black-600);
  font-size: 18px;
  font-weight: 600;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 140%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: ${(props) => props.align || "left"};
  div {
    width: 100%;
  }
  @media (max-width: 427px){
    height: 42vw;
    font-size: 4.2vw;
  }
`

const SmallContent2 = styled(SmallContent1)`
  align-items: center;  
  text-align: center;
  background-image: url(${card2});
  background-size: cover;
  background-position: center;
  border-style: none;
  color: var(--black-100);
`

const SmallContent3 = styled(SmallContent1)`
  align-items: center;
  text-align: center;
  background-image: url(${card3});
  background-size: 100%;
  background-position: center;
  border-style: none;
  color: var(--black-100);

`

const SmallContent4 = styled(SmallContent1)`
  text-align: right;
  border-style: none;
  align-items: baseline;
  background-image: url(${card1});
  background-size: cover;
  background-position: center;
  color: var(--black-100);
`

function Suggest() {
  const state = useSelector(state => state.concernReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickedConcern = health.filter(el => el.title === state.selectedConcern)[0];
  const numbers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const data = "영양보충"
    dispatch(concernActions.changeConcernClicked({ data }));
  }, [])

  const userSupClick = (e) => {
    const data = e.currentTarget.id;
    dispatch(searchActions.changeSearchValue({ data }));
    const query = JSON.parse(localStorage.getItem("searchValue"));
    navigate(`/search?query=${query}`);
  }

  const SupplementClick = (e) => {
    const data = e.currentTarget.id;
    dispatch(searchActions.changeSearchValue({ data }));
    const query = JSON.parse(localStorage.getItem("searchValue"));
    navigate(`/search?query=${query}`);
  }

  return (
    <SuggestContainer>
      <SearchBar />
      <UserContainer>
        <UserConcern>
          <div><span className="user-name">JOAAA</span>님을 위한 영양제 추천</div>
          <UserSupContainer>
            <div className="supplement-area" id="종합비타민" onClick={userSupClick}>
              <UserSupImg src="images/icon-pill1.png" alt="supplement-icon" />
              <div>종합비타민</div>
            </div>
            <div className="supplement-area" id="오메가3" onClick={userSupClick}>
              <UserSupImg src="images/icon-pill2.png" alt="supplement-icon" />
              <div>오메가3</div>
            </div>
            <div className="supplement-area" id="마그네슘" onClick={userSupClick}>
              <UserSupImg src="images/icon-pill3.png" alt="supplement-icon" />
              <div>마그네슘</div>
            </div>
          </UserSupContainer>
        </UserConcern>
      </UserContainer>
      <SugContentConatiner>
        <ScrollBar />
        <LargeContent>
          <div>{state.selectedConcern}에 좋은 영양제 추천</div>
          <SupplementsArea>
            {clickedConcern.supplementsList.map((el, idx) => {
              return (
                <SupplementDiv key={idx} id={el} onClick={SupplementClick}>
                  <SupplementImgDiv></SupplementImgDiv>
                  <div>{el}</div>
                </SupplementDiv>
              )
            })}
          </SupplementsArea>
        </LargeContent>
        <div className="smallcontent-area">
          <SmallContent1>
            <div>{clickedConcern.contents[numbers[0]]}</div>
          </SmallContent1>
          <SmallContent2>
            <div>{clickedConcern.contents[numbers[1]]}</div>
          </SmallContent2>
          <SmallContent3>
            <div>{clickedConcern.contents[numbers[2]]}</div>
          </SmallContent3>
          <SmallContent4>
            <div>{clickedConcern.contents[numbers[3]]}</div>
          </SmallContent4>
        </div>
      </SugContentConatiner>
    </SuggestContainer>
  )
}

export default Suggest;