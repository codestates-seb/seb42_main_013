import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import { useDrag } from 'react-dnd';
import { current } from "@reduxjs/toolkit";

const TimelineContainer = styled.div`
  width: 100%; max-width: 428px;
  /* height: 100%; */
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
const TimeWrap = ({ time, hours, minutes, supplements, selectedDayFormat }) => {
  const isSameHours = time.split(":")[0] === String(hours);


// console.log(supplements[0].startDate)
  // console.log(typeof supplements[0].startDate) //string
  // console.log(typeof selectedDayFormat)
  return (
    <Container>
      <TimeDivider>
        {Array.from({ length: 60 }, (v, i) => {
          return <div key={i} style={{ backgroundColor: isSameHours && i === minutes ? "#EB4233" : "unset" }}>
            {(isSameHours && i === minutes) && <div style={{ position: "absolute", width: "10px", height: "10px", backgroundColor: "#EB4233", left: "-5.5px", top: "-4.5px", borderRadius: "50%", zIndex: 1 }} />}
          </div>
        })}
      </TimeDivider>
      <TimeWrapCss>
        <div style={{ display: "flex" }}>
          <TimeDiv>{time}</TimeDiv>
          <TimeSpot />
        </div>
        <HorizontalLine></HorizontalLine>
      </TimeWrapCss>
      <InfoDiv>
        {
        supplements.map((e) => {
          if((e.startDate === selectedDayFormat) && (e.takingTime.map((e) => e.split(":")[0]).indexOf(time.split(":")[0]) !== -1)) {
            return <CardWrap>
              <div>{e.supplementName}</div>
              <div>take {e.take} pill</div>
            </CardWrap>
          }else{
            <CardWrap>
              <div style={{height:"100px", width: "100%"}}>{`d`}</div>
            </CardWrap>
          }
        })}
      </InfoDiv>
    </Container>
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

const TimeDivider = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  div{
    width: 76%;
    height: 1px;
    position: relative;
  }
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
const HorizontalLine = styled.div`
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

const VerticalLine = styled.div`
  position: absolute;
  top: 75%;
  right: 13%;
  width: 55%;
  height: 1px;
  background-color: #EB4233;
`;


function Timeline({ supplements, nowYear, nowMonth, nowDay, nowDate, setNowYear, setNowMonth, setNowDay }) {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSpots = Array.from({ length: 25 }, (v, i) => String(i).length > 1 ? `${i}:00` : `0${i}:00`);
  const scrollRef = useRef();
  let time = new Date();
  const [count, setCount] = useState(`${time.getHours()}시 ${time.getMinutes()}분 ${time.getSeconds()}초`);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const selectedDayFormat=`${nowYear}-${nowMonth < 10 ? `0${nowMonth}` : nowMonth}-${nowDate < 10 ? `0${nowDate}` : nowDate}`;
  // console.log(supplements)
  // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  useEffect(() => {
    const getTime = () => {
      let time = new Date();
      // console.log(time)
      // scrollRef.current.scrollTop = time.getHours() * 135;
      setHours(time.getHours())
      setMinutes(time.getMinutes())
      setCount(`${time.getHours()}시 ${time.getMinutes()}분 ${time.getSeconds()}초`);
    }
    getTime();
    // let id = setInterval(() => getTime(), 1000);
    let id = setInterval(getTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <TimelineContainer>
      <TitleContent>{`${nowMonth < 10 ? `0${nowMonth}` : nowMonth}.${nowDate < 10 ? `0${nowDate}` : nowDate}.${weeks[nowDay]}.`}
      </TitleContent>
      <TimeContentContainer ref={scrollRef}>
        {/* <VerticalLine /> */}
        {timeSpots.map((e, idx) => {
          // hours, minutes가 변경될 떄마다 rerendering
          return <TimeWrap key={e} time={e} hours={hours} minutes={minutes} supplements={supplements} selectedDayFormat={selectedDayFormat}></TimeWrap>
        })}
      </TimeContentContainer>
    </TimelineContainer>
  )
}
export default Timeline;