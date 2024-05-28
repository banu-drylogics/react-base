import React, { useState } from 'react';
import './Calendar.scss';
import _ from 'lodash';
import DateSelector from './DateSeletor';
import DatePicker from './DatePicker';
import utils from './dateUtils';

interface MonthSelectorProps {
  handleMonth: () => void;
  disabled: boolean;
  label: string;
  className: string;
}

const MonthSelector = ({ handleMonth, disabled, label, className }: MonthSelectorProps) => {
  return (
    <button onClick={handleMonth} disabled={disabled} className={className}>
      {label}
    </button>
  )
};

const Calendar = () => {
  const [thisMonth, setThisMonth] = useState<number>(utils.CMonths);
  const [selectedStartDate, setSelectedStartDate] = useState<number>(utils.startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<number>(utils.endDate);
  const [selectedStartMonth, setSelectedStartMonth] = useState<number>(utils.startMonth);
  const [selectedEndMonth, setSelectedEndMonth] = useState<number>(utils.endMonth);
  const [selectedStartYear, setSelectedStartYear] = useState<number>(utils.startYear);
  const [selectedEndYear, setSelectedEndYear] = useState<number>(utils.endYear);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const handlePrevMonth = () => {
    if (thisMonth === 0) return;
    setThisMonth(thisMonth - 1);
  };

  const handleNextMonth = () => {
    if (thisMonth === utils.MONTHS.length - 1) return;
    setThisMonth(thisMonth + 1);
  };

  const handleDateClick = (date: number) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedStartMonth(thisMonth);
      setSelectedStartYear(utils.YEAR);
      setSelectedEndDate(0);
      setSelectedEndMonth(0);
      setSelectedEndYear(0);
    } else if (selectedStartDate && !selectedEndDate) {
      const clickedDate = new Date(utils.YEAR, thisMonth, date);
      const startDate = new Date(selectedStartYear, selectedStartMonth, selectedStartDate);
      if (clickedDate >= startDate) {
        setSelectedEndDate(date);
        setSelectedEndMonth(thisMonth);
        setSelectedEndYear(utils.YEAR);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedEndMonth(selectedStartMonth);
        setSelectedEndYear(selectedStartYear);
        setSelectedStartDate(date);
        setSelectedStartMonth(thisMonth);
        setSelectedStartYear(utils.YEAR);
      }
    }
  };

  const getCalendarData = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    let calendarData = [];
    let date = 1;
    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          week.push(null);
        } else {
          week.push(date);
          date++;
        }
      }
      calendarData.push(week);
    }
    return calendarData;
  };

  const calendarData = getCalendarData(thisMonth, utils.YEAR);

  return (
    <div className='calendar'>
      <DatePicker
        calendarVisible={calendarVisible}
        setCalendarVisible={setCalendarVisible}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedStartMonth={selectedStartMonth}
        selectedStartYear={selectedStartYear}
        selectedEndMonth={selectedEndMonth}
        selectedEndYear={selectedEndYear}
      />
      {calendarVisible &&
        <div className='calendar-popup'>
          <div className="calendar-toolbar">
            <MonthSelector handleMonth={handlePrevMonth} disabled={thisMonth === 0} label={'<<'}
              className={"calendar-toolbar__prev-button".concat(thisMonth === 0 ? ' calendar-toolbar__prev-button--disabled' : '')} />
            <h3 className="calendar-toolbar__month">{`${utils.MONTHS[thisMonth]}, ${utils.YEAR}`}</h3>
            <MonthSelector handleMonth={handleNextMonth} disabled={thisMonth === utils.MONTHS.length - 1} label={'>>'}
              className={"calendar-toolbar__next-button".concat(thisMonth === utils.MONTHS.length - 1 ? ' calendar-toolbar__next-button--disabled' : '')} />
          </div>
          <DateSelector calendarData={calendarData} selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            handleDateClick={(date: number) => handleDateClick(date)} />
        </div>
      }
    </div>
  );
};

export default Calendar;
