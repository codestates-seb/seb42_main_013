import styled from "styled-components";

const ItemsContainer = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid rgba(153, 153, 153, 0.7);
  display: flex;
  align-items: center;
`

const ItemImageDiv = styled.div`
  width: 75px;
  height: 75px;
  border: 1px solid var(--black-300);
  border-radius: 10px;
`

const ItemContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  margin-left: var(--gap-lg);
`

const ItemTitleDiv = styled.div`
  font-weight: 600;
  color: var(--black-100);
  margin-bottom: var(--gap-md);
`

const ItemPriceDiv = styled.div`
  font-size: 14px;
`

function Items() {
  return (
    <ItemsContainer>
      <ItemImageDiv />
      <ItemContentDiv>
        <ItemTitleDiv>맛 좋은 오메가3</ItemTitleDiv>
        <ItemPriceDiv>30,000원</ItemPriceDiv>
      </ItemContentDiv>
    </ItemsContainer>
  )
}

export default Items;