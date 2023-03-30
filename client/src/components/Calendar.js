import { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/Calendar.css";


const Container = styled.div`
    margin: 30px 30px 0 30px;
    border-radius: 40px;
    display: flex;
    flex-direction: row;
    justify-content:center;
    background-color: #EFEFEF;
    padding: 10px;
`;

function Calendar({ setCalendarLoaded, testData, supplements, nowYear, nowMonth, nowDate, setNowYear, setNowMonth, setNowDate, setNowDay }) {
    const [datas, setDatas] = useState()
    const [yearMonth, setYearMonth] = useState({ year: 2023, month: 3 })
    const [selected, setSelected] = useState("")
    const days = ["일", "월", "화", "수", "목", "금", "토"]

    const changeCalendar = (m) => {
        const over = m >= 13
        const under = m <= 0
        if (over || under) {
            setYearMonth({
                year: over ? yearMonth.year + 1 : yearMonth.year - 1,
                month: over ? 1 : 12
            })
        } else {
            setYearMonth({ ...yearMonth, month: m })
        }
    }
    useEffect(() => {
        const date = new Date(yearMonth.year, yearMonth.month - 1, 1);
        const res = renderCalendar(date, yearMonth.year, yearMonth.month);
        // if (res) setCalendarLoaded(true)
    }, [yearMonth])

    const renderCalendar = (date, year, month) => {
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();

        let cYear = new Date().getFullYear()
        let cMonth = new Date().getMonth() + 1
        let cDay = new Date().getDate()

        // console.log(cYear, cMonth, cDay)

        let startDay = new Date(currentYear, currentMonth, 0);
        let prevDate = startDay.getDate();
        let prevDay = startDay.getDay() + 1 === 7 ? 0 : startDay.getDay() + 1;
        let endDay = new Date(currentYear, currentMonth + 1, 0);
        let nextDate = endDay.getDate();
        let nextDay = endDay.getDay();
        // console.log(`pre: ${prevDay}`)
        // console.log(date.getDay())
        const total = [
            ...Array.from({ length: prevDay }, (v, i) => i + prevDate - prevDay + 1),
            ...Array.from({ length: nextDate }, (v, i) => i + 1),
            ...Array.from({ length: 6 - nextDay }, (v, i) => i + 1)
        ].map((e, index) => {
            const prev = index < prevDay;
            const next = index > nextDate + prevDay - 1;
            const date = year + "-" + (prev ? month - 1 : next ? month + 1 : month) + "-" + ((e + "").length === 1 ? "0" + e : e);
            const weekend = index % 7 === 0 || index % 7 === 6;

            const day = index % 7 === 0 ? 'Sun' : index % 7 === 1 ? 'Mon' : index % 7 === 2 ? 'Tue' : index % 7 === 3 ? 'Wed' : index % 7 === 4 ? 'Thu' : index % 7 === 5 ? 'Fri' : 'Sat'

            const onDuration = !prev && !next;

            const monWedFri = index % 7 === 1 || index % 7 === 3 || index % 7 === 5;

            let alertDate = [];
            const test = supplements ? supplements.map((e, idx) => {
                const calc = Math.floor((new Date(e.endDate).getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24)
                const period = Math.floor((new Date(e.endDate).getTime() - new Date(e.startDate).getTime()) / 1000 / 60 / 60 / 24)

                const intakeDate = Math.floor(period / e.dosageInterval) + 1
                const intakeDateArr = Array.from({ length: intakeDate }, (v, i) => { return new Date(e.startDate).getTime() + (1000 * 60 * 60 * 24 * (i * e.dosageInterval)) })

                const newDate = date.split('-')[0] + '-' + (date.split('-')[1].length === 1 ? '0' + date.split('-')[1] : date.split('-')[1]) + '-' + date.split('-')[2]
                // console.log(newDate)

                const isOn = intakeDateArr.indexOf(new Date(newDate).getTime()) !== -1

                // console.log(new Date(e.startDate).getTime(),e.startDate)
                // console.log(new Date(e.endDate).getTime(),e.endDate)
                // console.log(new Date(date).getTime(),date)
                // console.log('-'.repeat(30))

                return isOn
            }) : []
            // console.log(new Date(date), test)

            const passed = onDuration && ((e < nowDate && month === nowMonth && year === nowYear) || ((month < nowMonth && year === nowYear) || year < nowYear));
            const todayFlag = (e === cDay) && (month === cMonth) && (year === cYear);

            const obj = {
                date,
                name: e,
                prevNext: prev || next,
                weekend,
                onDuration,
                monWedFri,
                passed,
                todayFlag,
                prev,
                next,
                test,
                day
            }
            return obj
        })
        // console.log(total)
        setDatas(total);
        return total
    }
    return (
        <Container>
            <div className="comp_calendar">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <div onClick={() => changeCalendar(yearMonth.month - 1)} style={{ fontSize: '16px', color: "#505050", marginRight: '20px', cursor: 'pointer' }}>
                        <img src="../../images/icon--arrowLeft.png" />
                    </div>
                    <span>{yearMonth.year}</span>
                    <span>. </span>
                    <span>{yearMonth.month}</span>
                    <div onClick={() => changeCalendar(yearMonth.month + 1)} style={{ fontSize: '16px', color: "#505050", marginLeft: '20px', cursor: 'pointer' }}>
                        <img src="../../images/icon--arrowRight.png" />
                    </div>
                </div>
                <div className="sec_cal">
                    <div className="cal_wrap">
                        <div className="days">
                            {days.map((e, index) => <div key={index} className="week">{e}</div>)}
                        </div>
                        <div className="dates" >
                            {datas && datas.map((e, index) =>
                                <div onClick={() => {
                                    if (e.prev) { changeCalendar(yearMonth.month - 1) }
                                    else if (e.next) { changeCalendar(yearMonth.month + 1) }
                                    setSelected(e.date)
                                    console.log(e)
                                    const Dates = [...e.date.split("-").map(e => Number(e)), e.day]
                                    console.log(Dates)
                                    const setDates = [setNowYear, setNowMonth, setNowDate, setNowDay];
                                    setDates.forEach((f, idx) => f(Dates[idx]));
                                }} key={index} className={`day${e.prevNext || !e.onDuration ? " disable" : e.todayFlag ? " today" : ""}`} style={{ fontSize: '12px', border: selected === e.date ? '2px solid #5b85eb' : e.prevNext ? '2px solid #D6D6D6' : "none" }}>
                                    <span style={{ margin: '5px', fontFamily: 'NanumBarunGothic' }} >{e.name}</span>
                                    <div style={{ position: 'absolute', width: '100%', height: '4px', bottom: '4px', display: 'flex', justifyContent: 'center' }}>
                                        {/* {e.test.map((el,index)=>
                                        (e.onDuration&&el===true)? <div style={{  width: '4px', height: '4px', backgroundColor: "#FB7F0E", borderRadius: '99px',margin:'0 1px' }}></div>:<></>
                                      )}   */}
                                        {(e.onDuration && e.test.filter(e => e).length !== 0) && <div style={{ width: '4px', height: '4px', backgroundColor: "#FB7F0E", borderRadius: '99px', margin: '0 1px' }}></div>}
                                    </div>
                                    {/* {console.log(new Date(e.date).getTime())} 모든 날짜(하나씩) */}
                                    {/* {console.log(e.uniqueArr)} */} {/* 복용 날짜 */}
                                    {/* {console.log(e)} */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Calendar;