import styled from "styled-components";

const ListContainer = styled.li`
  display: flex;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 16px  8px;

`

const ListImgBox = styled.div`
  display: flex;
  width: 100px;
  background-image: ${(props) => props.img};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const ListContent = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  div{
    margin-bottom: 8px;
  }
  >div:last-child{
    margin-bottom: 0;
  }
`
const PillSection = styled.div`
  color: var(--black-200);
  font-size: 14px;
`
const PillName = styled.span`
  font-family: NanumBarunGothicBold;
  color:black;
  font-size: 16px;
`
const PillContains = styled.span`
  color: var(--black-200);
  font-size: 14px;
`
const PillSummary = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--black-100);
  svg{
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`


function SummaryList ({pill}){
  return(
    <ListContainer>
      <ListImgBox img={pill.img}></ListImgBox>
      <ListContent>
        <PillSection>
          <PillName>{pill.name}</PillName>
          <PillContains>{` ${pill.contains[0].amount}`}</PillContains>
        </PillSection>
        <PillSummary>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
          {pill.cycle===1 ? "매일" :`${pill.cycle}일마다`} 
          {!!pill.time.length && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
          {pill.time} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
          {`${pill.dose}알`}
        </PillSummary>
        <PillSection>
          {`남은 알 수 ${pill.currentQty}/${pill.totalQty}`} {!!pill.expiryDate.length && `| 소비 기한 ${pill.expiryDate}`}
        </PillSection>
      </ListContent>
    </ListContainer>
  )
}
export default SummaryList;
