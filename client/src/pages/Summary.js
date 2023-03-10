import styled from "styled-components";

const SummaryContainer = styled.div`
  display: flex;
  padding: 24px 20px;
`
const Headfilter = styled.div`
  padding: 2px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: var(--black-400);
  border-radius: 30px;
  gap: 16px;
`
const FilterBtn = styled.div`
  text-align: center;
  background-color: var(--black-500);
  border-radius: 30px;
  flex: 1;
`

function Summary (){
  return (
    <SummaryContainer>
      <Headfilter>
        <FilterBtn>종합</FilterBtn>
        <FilterBtn>종합</FilterBtn>
        <FilterBtn>종합</FilterBtn>
      </Headfilter>
    </SummaryContainer>
  )
}

export default Summary;