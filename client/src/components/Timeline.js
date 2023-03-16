import React from "react";
import styled from "styled-components";

const Date = styled.div`
display: flex;
justify-content: center;
font-size: 20px;
margin-top: 20px;
/* font-family: ; */
`;
const TimeSpot = styled.span`
/* left:0;
top:0; */
position: absolute;
left: 50px;
width: 10px;
height: 10px;
background-color: #5B85EB;
bottom: '4px';
border-radius: 50%;
`;

const Span =styled.span `

`;

const TimeWrap = ({ time }) => {
  return (
    <>
    <TimeSpot/>
    <Span>{time}</Span>
    </>
  )
}
const TimeWrapCss = styled.div`

`;

function Timeline({ nowYear, nowMonth, nowDay, setNowYear, setNowMonth, setNowDay }) {
  console.log(nowYear)
  return (
    <>
      <Date>{`${nowYear}.${nowMonth < 10 ? `0${nowMonth}` : nowMonth}.${nowDay < 10 ? `0${nowDay}` : nowDay}.`}</Date>
      <TimeWrap time={"09:00"} />
    </>
  )
}
export default Timeline;