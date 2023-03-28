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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--gap-sm) 0;
  font-family: 'NanumBarunGothicBold';
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 27px;
  div:last-child{
    background-color: #5b85eb;
    border-radius: 50px;
    padding: 0 15px;
    font-family: 'NanumBarunGothicLight';
    font-weight: 500;
    letter-spacing: 0px;
    font-size: 14px;
    color: #ffffff;
  }
`;

// 스크롤
const TimeContentContainer = styled.div`
  /* background-color: green; */
  height: 500px;
  padding:10px 0;
  margin-top: var(--gap-lg);
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`;
const TimeWrap = ({ idx, time, hours, minutes, supplements, selectedDayFormat }) => {
  hours = String(hours).length <= 1 ? `0${hours}` : hours;
  const isSameHours = time.split(":")[0] === String(hours);
  return (
    <Container>
      <TimeDivider>
        {Array.from({ length: 60 }, (v, i) => {
          return <div name={`divider${isSameHours && i === minutes ? "_now" : ""}`} key={i} style={{ minHeight: "1px", backgroundColor: isSameHours && i === minutes ? "#EB4233" : "unset" }}>
            {(isSameHours && i === minutes) && <div style={{ position: "absolute", width: "11px", height: "11px", backgroundColor: "#EB4233", left: "-5.5px", top: "-4.5px", borderRadius: "50%", zIndex: 2 }} />}
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
          supplements && supplements.map((e, idx) => {
            // const DIVIDE = 1000 / 60 / 60 / 24;
            // const MULTIPLY = 1000 * 60 * 60 * 24;

            const calc = Math.floor((new Date(e.endDate).getTime() - new Date(selectedDayFormat).getTime()) / 1000 / 60 / 60 / 24)
            const period = Math.floor((new Date(e.endDate).getTime() - new Date(e.startDate).getTime()) / 1000 / 60 / 60 / 24)

            const intakeDate = Math.floor(period / e.dosageInterval) + 1
            const intakeDateArr = Array.from({ length: intakeDate }, (v, i) => { return new Date(e.startDate).getTime() + (1000 * 60 * 60 * 24 * (i * e.dosageInterval)) })
            const isOn = intakeDateArr.indexOf(new Date(selectedDayFormat).getTime()) !== -1

            if (isOn && calc <= period && calc >= 0 && (e.takingTime.map((e) => e.split(":")[0]).indexOf(time.split(":")[0]) !== -1)) {
              return <CardWrap key={idx}>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '120px' }}>{e.supplementName}</div>
                <div>{e.dosagePerServing > 1 ? `take ${e.dosagePerServing} pills` : `take ${e.dosagePerServing} pill`}</div>
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
  min-height:60px;
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
    width: 83.5%;
    height: 1px;
    min-height: 1px;
    position: relative;
  }
`;
const TimeWrapCss = styled.div`
  display: flex;
  justify-content: flex-end;
  position:absolute;
  height: 100%;
  flex: 1;
`;
const TimeDiv = styled.div`
  flex: .3;
  color: #5B85EB;
  font-size: 15px;
  margin-top:-7px;
`;
const TimeSpot = styled.div`
  width: 11px;
  height: 11px;
  margin: -5px 0 0 5.5px;
  background-color: #5B85EB;
  border-radius: 50%;
  z-index: 1;
`;
const HorizontalLine = styled.div`
  position: absolute;
  right:5px;
  width: 1px;
  height: 100%;
  background-color: #959595;
`;

const InfoDiv = styled.div`
/* background-color: skyblue; */
  flex: 3;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:flex-end;
`;
const CardWrap = styled.div`
  width: 85%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px .5px rgba(0, 0, 0, 7%);
  margin: 10px 0;
  margin-right:-20px;
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


function Timeline({ supplements, nowYear, nowMonth, nowDay, nowDate, testData, setNowYear, setNowMonth, setNowDay }) {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSpots = Array.from({ length: 24 }, (v, i) => String(i).length > 1 ? `${i}:00` : `0${i}:00`);
  const scrollRef = useRef();
  let time = new Date();
  const [count, setCount] = useState(`${time.getHours()}시 ${time.getMinutes()}분 ${time.getSeconds()}초`);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(-1);
  const selectedDayFormat = `${nowYear}-${nowMonth < 10 ? `0${nowMonth}` : nowMonth}-${nowDate < 10 ? `0${nowDate}` : nowDate}`;
  const [isLoading, setIsLoading] = useState(false)
  // console.log(supplements)
  // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  const newDay = new Date(nowDate).getDay();
  // console.log(newDay)
  // console.log(nowDay)
  useEffect(() => {
    const getTime = () => {
      let time = new Date();
      setHours(time.getHours())
      setMinutes(time.getMinutes())
      setCount(`${time.getHours()}시 ${time.getMinutes()}분 ${time.getSeconds()}초`);
    }
    getTime();

    // let id = setInterval(() => getTime(), 1000);
    let id = setInterval(getTime, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (minutes !== -1 && !isLoading) {
      const target = document.getElementsByName('divider_now')[0]
      // console.log(target)
      const nowY = target.getBoundingClientRect().top - 543.5546875

      // console.log(nowY)
      scrollRef.current.scrollTo(0, nowY)
      setIsLoading(true)
    }
  }, [minutes])

  return (
    <TimelineContainer>
      <TitleContent>
        <div>{`${nowDate < 10 ? `0${nowDate}` : nowDate}`}</div>
        <div>{`${nowDay&&nowDay}`}</div>
      </TitleContent>
      <TimeContentContainer ref={scrollRef}>
        {timeSpots.map((e, idx) => {
          // hours, minutes가 변경될 때마다 rerendering
          return <TimeWrap key={e} idx={e} time={e} hours={hours} minutes={minutes} supplements={supplements} selectedDayFormat={selectedDayFormat}></TimeWrap>
        })}
      </TimeContentContainer>
    </TimelineContainer>
  )
}
export default Timeline;