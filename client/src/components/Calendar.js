import { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/Calendar.css";


const Container = styled.div`
display: flex;
flex-direction: row;
justify-content:center;
margin-top: 20px;
`;


function Calendar() {
    const [datas, setDatas] = useState()
    const [yearMonth, setYearMonth] = useState({ year: 2023, month: 3 })
    const [selected, setSelected] = useState("")

    // const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const days = ["월", "화", "수", "목", "금", "토", "일"]

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
        renderCalendar(date, yearMonth.year, yearMonth.month);
    }, [yearMonth])

    const renderCalendar = (date, year, month) => {
        const nowDay = new Date().getDate()
        const nowMonth = new Date().getMonth() + 1
        const nowYear = new Date().getFullYear()

        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();

        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate(); //일
        var prevDay = startDay.getDay() + 1 == 7 ? 0 : startDay.getDay() + 1; //요일

        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        const total = [
            ...Array.from({ length: prevDay }, (v, i) => i + prevDate - prevDay + 1),
            ...Array.from({ length: nextDate }, (v, i) => i + 1),
            ...Array.from({ length: 6 - nextDay }, (v, i) => i + 1)
        ].map((e, index) => {
            const prev = index < prevDay
            const next = index > nextDate + prevDay - 1
            const date = year + "-" + (prev ? month - 1 : next ? month + 1 : month) + "-" + ((e + "").length === 1 ? "0" + e : e)
            const weekend = index % 7 === 0 || index % 7 === 6

            const onDuration = !prev && !next

            const monWedFri = index % 7 === 1 || index % 7 === 3 || index % 7 === 5
            console.log(nowYear, year)

            const passed = onDuration && ((e < nowDay && month === nowMonth && year === nowYear) || ((month < nowMonth && year === nowYear) || year < nowYear))
            console.log(e, nowDay, (prev ? month - 1 : next ? month + 1 : month), nowMonth, year, nowYear)

            const todayFlag = e === nowDay && (prev ? month - 1 : next ? month + 1 : month) === nowMonth && year === nowYear

            const obj = {
                date,
                name: e,
                prevNext: prev || next,
                weekend,
                onDuration,
                monWedFri,
                passed,
                todayFlag
            }
            return obj
        })
        console.log(total)
        setDatas(total)
        // setCopied(total)
    }
    return (
        <Container>

            <div className="comp_calendar">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <div onClick={() => changeCalendar(yearMonth.month - 1)} style={{ fontSize: '16px', color: "#505050", marginRight: '20px', cursor: 'pointer' }}>{"<"}</div>
                    <span>{yearMonth.year}</span>
                    <span>. </span>
                    <span>{yearMonth.month}</span>
                    <div onClick={() => changeCalendar(yearMonth.month + 1)} style={{ fontSize: '16px', color: "#505050", marginLeft: '20px', cursor: 'pointer' }}>{">"}</div>
                </div>

                <div className="sec_cal">

                    <div className="cal_wrap">

                        <div className="days">
                            {days.map((e, index) => <div key={index} className="week">{e}</div>)}
                        </div>

                        <div className="dates" >
                            {datas && datas.map((e, index) =>
                                <div onClick={() => setSelected(e.date)} key={index} className={`day${e.prevNext || !e.onDuration ? " disable" :e.todayFlag?" today": ""}`} style={{ fontSize: '12px', border: selected === e.date ? '2px solid #5b85eb' : '1px solid #eaeaea' }}>
                                    <span style={{ margin: '5px', fontFamily: 'NanumBarunGothic', color: e.passed ? "#ccc" : 'unset' }} >{e.name}</span>
                                    {(e.monWedFri && e.onDuration) && <div style={{ position: 'absolute', width: '4px', height: '4px', backgroundColor: "orange", bottom: '4px', borderRadius: '99px' }}></div>}
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
