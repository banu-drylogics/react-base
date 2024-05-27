import React, { useState } from 'react';
import './styles.scss';
import _ from 'lodash';
import { MONTHS } from './calendar';
import DateSelector from './DateSeletor';
import DatePicker from './DatePicker';

interface ButtonProps {
  handleMonth: () => void;
  disabled: boolean;
  label: string;
  className: string;
}

const Button = ({ handleMonth, disabled, label, className }: ButtonProps) => {
  return (
    <button onClick={handleMonth} disabled={disabled} className={className}>
      {label}
    </button>
  )
}

const Calendar = () => {
  const [thisMonth, setThisMonth] = useState<number>(2);
  const [year, setYear] = useState<number>(2024);
  const [selectedStartDate, setSelectedStartDate] = useState<number>(0);
  const [selectedEndDate, setSelectedEndDate] = useState<number>(0);
  const [selectedStartMonth, setSelectedStartMonth] = useState<number>(0);
  const [selectedEndMonth, setSelectedEndMonth] = useState<number>(0);
  const [selectedStartYear, setSelectedStartYear] = useState<number>(0);
  const [selectedEndYear, setSelectedEndYear] = useState<number>(0);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const handlePrevMonth = () => {
    if (thisMonth === 0) return;
    setThisMonth(thisMonth - 1);
  };

  const handleNextMonth = () => {
    if (thisMonth === 2) return;
    setThisMonth(thisMonth + 1);
  };

  const handleDateClick = (date: number) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedStartMonth(thisMonth);
      setSelectedStartYear(year);
      setSelectedEndDate(0);
      setSelectedEndMonth(0);
      setSelectedEndYear(0);
    } else if (selectedStartDate && !selectedEndDate) {
      const clickedDate = new Date(year, thisMonth, date);
      const startDate = new Date(selectedStartYear, selectedStartMonth, selectedStartDate);
      if (clickedDate >= startDate) {
        setSelectedEndDate(date);
        setSelectedEndMonth(thisMonth);
        setSelectedEndYear(year);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedEndMonth(selectedStartMonth);
        setSelectedEndYear(selectedStartYear);
        setSelectedStartDate(date);
        setSelectedStartMonth(thisMonth);
        setSelectedStartYear(year);
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

  const calendarData = getCalendarData(thisMonth, year);

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
            <Button handleMonth={handlePrevMonth} disabled={thisMonth === 0} label={'<<'}
              className={"calendar-toolbar__prev-button".concat(thisMonth === 0 ? ' calendar-toolbar__prev-button--disabled' : '')} />
            <h3 className="calendar-toolbar__month">{`${MONTHS[thisMonth]}, ${year}`}</h3>
            <Button handleMonth={handleNextMonth} disabled={thisMonth === 2} label={'>>'}
              className={"calendar-toolbar__next-button".concat(thisMonth === 2 ? ' calendar-toolbar__next-button--disabled' : '')} />
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
