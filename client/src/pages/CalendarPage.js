import Calendar from "../components/Calendar";
import Timeline from "../components/Timeline";
import React, { useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import supplements from "../components/supplements.json";
import axios from "axios";

function CalendarPage() {
  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [nowMonth, setNowMonth] = useState(new Date().getMonth() + 1);
  const [nowDate, setNowDate] = useState(new Date().getDate());
  const [nowDay, setNowDay] = useState(new Date().getDay());
  const [testData, setTestData]=useState();

  // const URI = "http://ec2-13-125-253-248.ap-northeast-2.compute.amazonaws.com:8080";
  // useEffect(()=>{
  //   (async () => {
  //     await axios({
  //       method: 'get',
  //       url: `${URI}/detailSupplements`,
  //       params: {},
  //       headers:{Authorization:sessionStorage.getItem('Authorization')}
  //     })
  
  //       .then((res) => {
  //         // window.location.href = '/login'
  //         console.log(res)
  //         setTestData(res.data)
  //       })
  //       .catch((err) => { console.log(err) })
  //   })()
  // },[])


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Calendar testData={testData} supplements={supplements} nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} />
        <Timeline testData={testData} supplements={supplements} nowYear={nowYear} setNowYear={setNowYear} nowMonth={nowMonth} setNowMonth={setNowMonth} nowDate={nowDate} setNowDate={setNowDate} nowDay={nowDay} />
      </DndProvider>
    </>
  )
}
export default CalendarPage;

