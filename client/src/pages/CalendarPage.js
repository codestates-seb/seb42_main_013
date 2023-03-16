import Calendar from "../components/Calendar";
import Timeline from "../components/Timeline";
import React, {useState} from "react";

function CalendarPage() {
  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [nowMonth, setNowMonth] = useState(new Date().getMonth() + 1);
  const [nowDay, setNowDay] = useState(new Date().getDate());


  return (
    <>
      <Calendar nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDay={nowDay} setNowDay={setNowDay}/>
      <Timeline nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDay={nowDay} setNowDay={setNowDay}/>
    </>
  )
}
export default CalendarPage;
// console.log( `${nowYear}. ${nowMonth}. ${nowDay}.`)

