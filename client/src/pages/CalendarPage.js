import Calendar from "../components/Calendar";
import Timeline from "../components/Timeline";
import React, { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function CalendarPage() {
  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [nowMonth, setNowMonth] = useState(new Date().getMonth() + 1);
  const [nowDate, setNowDate] = useState(new Date().getDate());
  const [nowDay, setNowDay] = useState(new Date().getDay());


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Calendar nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} />
        <Timeline nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} nowDay={nowDay} />
      </DndProvider>
    </>
  )
}
export default CalendarPage;
// console.log( `${nowYear}. ${nowMonth}. ${nowDay}.`)

