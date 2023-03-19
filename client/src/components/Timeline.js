import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDrag } from 'react-dnd';

const TimelineContainer = styled.div`
  width: 100%; max-width: 428px;
  height: 100%;
  /* background-color: #ffffff; */
  /* background-color: gray; */
  padding: var(--gap-lg); //24px
`;

const TitleContent = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  padding: var(--gap-sm) 0;
  font-family: 'NanumBarunGothicBold';
  font-size: 20px;
`;

// 스크롤
const TimeContentContainer = styled.div`
  /* background-color: green; */
  height: 500px;
  margin-top: var(--gap-lg);
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`;

const TimeWrap = ({ time, data }) => {

  return (
    <>
      <Container>
        <TimeWrapCss>
          <div style={{ display: "flex" }}>
            <TimeDiv>{time}</TimeDiv>
            <TimeSpot />
          </div>
          <Line></Line>
        </TimeWrapCss>
        <InfoDiv>
          <CardWrap>
            <div>오메가 3</div>
            <div>take 1 pill</div>
          </CardWrap>
          <CardWrap>
            <div>비타민</div>
            <div>take 1 pill</div>
          </CardWrap>
        </InfoDiv>
      </Container>
    </>
  )
}
const Container = styled.div`
  display: flex;
  /* border: 1px solid red; */
  margin: 0px 40px 0 40px;
  padding: 5px;
  /* height: 100px; */
  position: relative;
  flex: 1;
`;

const TimeWrapCss = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  height: 100%;
  flex: 1;
`;
const TimeDiv = styled.div`
  flex: .3;
  color: #5B85EB;
  font-size: 15px;
`;
const TimeSpot = styled.div`
  width: 10px;
  height: 10px;
  margin: 3px 0 0 5.5px;
  background-color: #5B85EB;
  border-radius: 50%;
  z-index: 1;
`;
const Line = styled.div`
  position: absolute;
  left: 25%;
  width: 1px;
  height: 100%;
  background-color: #959595;
`;

const InfoDiv = styled.div`
/* background-color: skyblue; */
  flex: 3;
  height: 100%;
`;
const CardWrap = styled.div`
  width: 90%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px .5px rgba(0, 0, 0, 7%);
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items:center;
  font-size: 12px;
  font-family: 'NanumBarunGothicLight';
  color:#D9D9D9;
  div:first-child {
    font-size: 18px;
    font-family: 'NanumBarunGothicBold';
    color: #000000;
  }
`;



function Timeline({ nowYear, nowMonth, nowDay, nowDate, setNowYear, setNowMonth, setNowDay }) {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const time = Array.from({ length: 26 }, (v, i) => String(i).length > 1 ? `${i}:00` : `0${i}:00`);
  const scrollRef = useRef();
  let hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  useEffect(() => {
    // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    scrollRef.current.scrollTop = hours * 100;
  }, [])
  return (
    <TimelineContainer>
      <TitleContent>{`${nowMonth < 10 ? `0${nowMonth}` : nowMonth}.${nowDate < 10 ? `0${nowDate}` : nowDate}.${weeks[nowDay]}.`}</TitleContent>
      <TimeContentContainer ref={scrollRef}>
        {time.map((e) => {
          return <TimeWrap key={e} time={e}></TimeWrap>
        })}
      </TimeContentContainer>
    </TimelineContainer>
  )
}
export default Timeline;