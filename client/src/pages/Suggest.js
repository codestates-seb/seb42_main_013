import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ScrollBar from "../components/ScrollBar";

const SuggestContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 428px;
  height: 100%;
  color: var(--black-100);
`

const SugContentConatiner = styled.div`
  padding: 0 20px;
  .smallcontent-area {
    display: flex;
    gap: 16px;
  }
`

const LargeContent = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  height: 180px;
  background-color: rgba(91, 133, 235, 0.8);
  border-radius: 30px;
  color: #ffffff;
  font-weight: 500;
  @media (max-width: 427px){
    height: 42vw;
    font-size: 3.7vw;
    }
`

const SmallContent = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  height: 180px;
  border: 1px solid var(--black-300);
  border-radius: 30px;
  color: var(--black-100);
  font-size: 18px;
  font-weight: 600;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 140%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: ${(props) => props.align || "left"};
  @media (max-width: 427px){
    height: 42vw;
    font-size: 4.2vw;
    }
`

function Suggest() {
  const content1 = "면역력이 걱정인 당신,\n매일 아침\n홍삼스틱 하나 어떠신가요?"
  const content2 = "눈 건강엔 오메가3 영양제도 좋지만\n등 푸른 생선도 함께 드세요!"
  return (
    <SuggestContainer>
      <SearchBar />
      <SugContentConatiner>
      <ScrollBar />
      <div className="smallcontent-area">
          <SmallContent>
            <div>
              {content1}
            </div>
          </SmallContent>
          <SmallContent align="center">
            <div>
              {content2}
            </div>
          </SmallContent>
        </div>
        <LargeContent>
          <div>눈 건강에 좋은 영양제 추천</div>
        </LargeContent>
        <div className="smallcontent-area">
          <SmallContent>
            영역1
          </SmallContent>
          <SmallContent>
            영역2
          </SmallContent>
        </div>
        <div className="smallcontent-area">
          <SmallContent>
            영역3
          </SmallContent>
          <SmallContent>
            영역4
          </SmallContent>
        </div>
      </SugContentConatiner>
    </SuggestContainer>
  )
}

export default Suggest;