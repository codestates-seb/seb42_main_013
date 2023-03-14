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
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
`

const ItemContentDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  margin-left: var(--gap-lg);
`

const ItemTitleDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--black-100);
  margin-bottom: var(--gap-md);
`

const ItemPriceDiv = styled.div`
  font-size: 12px;
`

function Items({title, img, link, price}) {
  // props 관련 설정
  title = title.replace("<b>", "");
  title = title.replace("</b>", "");
  let newPrice = price.split("");
  let head = newPrice.slice(0, -3);
  let tail = newPrice.slice(-3);
  newPrice = [...head, ",", ...tail].join("");
  
  return (
    <ItemsContainer>
      <ItemImageDiv img={img}/>
      <ItemContentDiv>
        <ItemTitleDiv><a href={link}>{title}</a></ItemTitleDiv>
        <ItemPriceDiv>{newPrice}원</ItemPriceDiv>
      </ItemContentDiv>
    </ItemsContainer>
  )
}

export default Items;