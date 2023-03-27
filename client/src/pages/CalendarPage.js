import Calendar from "../components/Calendar";
import Timeline from "../components/Timeline";
import React, { useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useAuthCheck from "../util/useAuthCheck";
import axios from "axios";

function CalendarPage() {
  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [nowMonth, setNowMonth] = useState(new Date().getMonth() + 1);
  const [nowDate, setNowDate] = useState(new Date().getDate());
  const [nowDay, setNowDay] = useState(new Date().getDay());
  const [testData, setTestData] = useState();
  const [calendarLoaded, setCalendarLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/detailSupplements`,
        params: {},
        headers: { Authorization: sessionStorage.getItem('Authorization') }
      })

        .then((res) => {
          // window.location.href = '/login'
          // console.log(res)
          setTestData(res.data.data)
        })
        .catch((err) => { console.log(err) })
    })()
  }, [])


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {testData && <Calendar setCalendarLoaded={setCalendarLoaded} testData={testData} supplements={testData} nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} />}
        {(testData  && calendarLoaded) && <Timeline supplements={testData} nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} nowDay={nowDay} />}
      </DndProvider>
    </>
  )
}
export default CalendarPage;

