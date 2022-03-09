import React, { useState } from "react";
import moment from "moment";
import "./calendar.css";

import { MonthList } from "./MonthList";
import { YearTable } from "./YearTable";

const weekdayShort = moment.weekdaysShort();
const allMonths = moment.months();

const Calendar = () => {
  const [ showCalendarTable, setShowCalendarTable ] = useState(true);
  const [ showMonthTable, setShowMonthTable ] = useState(false);
  const [ dateObject, setDateObject ] = useState(moment());
  const [ showYearNav, setShowYearNav ] = useState(false);
  const [ selectedDay, setSelectedDay ] = useState(null);

  const daysInMonth = () => {
    return dateObject.daysInMonth();
  };

  const getYear = (date) => {
    return Number((date || dateObject).format("Y"));
  };
  const currentDay = () => {
    return Number(dateObject.format("D"));
  };

  const firstDayOfMonth = () => {
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  const getMonth = (date) => {
    return (date || dateObject).format("MMMM");
  };

  const showMonth = (e, month) => {
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  };

  const setMonth = month => {
    let monthNo = allMonths.indexOf(month);
    // let dateObjectCopy = Object.assign({}, dateObject);
    const dateObjectCopy = moment(dateObject).set("month", monthNo);

    setDateObject(dateObjectCopy);
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  };

  const showYearEditor = () => {
    setShowYearNav(true);
    setShowCalendarTable(!showCalendarTable);
  };

  const onPrev = () => {
    let unit = "";
    if (showMonthTable === true || showYearNav === true) {
      unit = "year";
    } else {
      unit = "month";
    }
    const prevDate = moment(dateObject).subtract(1, unit);
    setDateObject(prevDate);
  };

  const onNext = () => {
    let unit = "";
    if (showMonthTable === true || showYearNav === true) {
      unit = "year";
    } else {
      unit = "month";
    }
    const nextDate = moment(dateObject).add(1, unit);
    setDateObject(nextDate);
  };

  const setYear = year => {
    // let dateObject = Object.assign({}, this.state.dateObject);
    const newDateObject = moment(dateObject).set("year", year);
    setDateObject(newDateObject);
    setShowMonthTable(!showMonthTable);
    setShowYearNav(!showYearNav);
    setShowMonthTable(!showMonthTable);
  };

  const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDateObj = moment(String(startDate));
    const stopDateObj = moment(String(stopDate));
    while (getYear(currentDateObj) <= getYear(stopDateObj)) {
      dateArray.push(currentDateObj.format("YYYY"));
      currentDateObj = moment(currentDateObj).add(1, "year");
    }
    return dateArray;
  }

  const onDayClick = (e, d) => {
    setSelectedDay(d);
  };

  const weekdayHeader = weekdayShort.map(day => {
    return <th key={day}>{day}</th>;
  });

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<td key={`empty-${i}`} className="calendar-day empty">{""}</td>);
  }

  let dayCells = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    const isThisYear = getYear(moment()) === getYear();
    const isThisMonth = getMonth(moment()) === getMonth();
    const currentDayClass = isThisYear && isThisMonth && d === currentDay() ? "today" : "";
    // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
    dayCells.push(
      <td key={d} className={`calendar-day ${currentDayClass}`}>
        <span onClick={() => onDayClick(d)}>
          {d}
        </span>
      </td>
    );
  }

  var totalSlots = [...blanks, ...dayCells];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      // let insertRow = cells.slice();
      rows.push(cells);
    }
  });

  const mappedDayCells = rows.map((d, i) => {
    return <tr key={`tr-${i}`}>{d}</tr>;
  });

  return (
    <div className="tail-datetime-calendar">
      <div className="calendar-navi">
        <span
          onClick={() => onPrev()}
          className="calendar-button button-prev"
        />
        {!showMonthTable && !showYearNav && (
          <span
            onClick={() => showMonth()}
            className="calendar-label"
          >
            {getMonth()}
          </span>
        )}
        <span
          className="calendar-label"
          onClick={() => showYearEditor()}
        >
          {getYear()}
        </span>

        <span
          onClick={() => onNext()}
          className="calendar-button button-next"
        />
      </div>
      <div className="calendar-date">
        {showYearNav && <YearTable year={getYear()} setYear={setYear} getDates={getDates} />}
        {showMonthTable && (
          <MonthList data={moment.months()} setMonth={setMonth} />
        )}
      </div>

      {showCalendarTable && (
        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdayHeader}</tr>
            </thead>
            <tbody>{mappedDayCells}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;
