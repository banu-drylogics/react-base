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
  const [thisMonth, setThisMonth] = useState<number>(utils.date.getMonth());
  const [thisYear, setThisYear] = useState<number>(utils.date.getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState<number>(utils.startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<number>(utils.endDate);
  const [selectedStartMonth, setSelectedStartMonth] = useState<number>(utils.startMonth);
  const [selectedEndMonth, setSelectedEndMonth] = useState<number>(utils.endMonth);
  const [selectedStartYear, setSelectedStartYear] = useState<number>(utils.startYear);
  const [selectedEndYear, setSelectedEndYear] = useState<number>(utils.endYear);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const isPrevClicked = thisYear === utils.years[0] && thisMonth === 0;
  const isNextClicked = thisMonth === utils.months.length - 1 && thisYear === _.findLast(utils.years);

  const handlePrevMonth = () => {
    if (isPrevClicked) return;
    if (thisMonth === 0) {
      setThisMonth(utils.months.length - 1);
      setThisYear(thisYear - 1);
    } else {
      setThisMonth(thisMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (isNextClicked) return;
    if (thisMonth === utils.months.length - 1) {
      setThisMonth(0);
      setThisYear(thisYear + 1);
    } else {
      setThisMonth(thisMonth + 1);
    }
  };

  const handleDateClick = (date: number) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedStartMonth(thisMonth);
      setSelectedStartYear(thisYear);
      setSelectedEndDate(0);
      setSelectedEndMonth(0);
      setSelectedEndYear(0);
    } else if (selectedStartDate && !selectedEndDate) {
      const clickedDate = new Date(thisYear, thisMonth, date);
      const startDate = new Date(selectedStartYear, selectedStartMonth, selectedStartDate);
      if (clickedDate >= startDate) {
        setSelectedEndDate(date);
        setSelectedEndMonth(thisMonth);
        setSelectedEndYear(thisYear);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedEndMonth(selectedStartMonth);
        setSelectedEndYear(selectedStartYear);
        setSelectedStartDate(date);
        setSelectedStartMonth(thisMonth);
        setSelectedStartYear(thisYear);
      }
    }
  };

  const calendarData = utils.getCalendarData(thisMonth, thisYear);

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
            <MonthSelector handleMonth={handlePrevMonth} disabled={isPrevClicked} label={'<<'}
              className={"calendar-toolbar__prev-button".concat(isPrevClicked ? ' calendar-toolbar__prev-button--disabled' : '')} />
            <h3 className="calendar-toolbar__month">{`${utils.months[thisMonth]}, ${thisYear}`}</h3>
            <MonthSelector handleMonth={handleNextMonth} disabled={isNextClicked} label={'>>'}
              className={"calendar-toolbar__next-button".concat(isNextClicked ? ' calendar-toolbar__next-button--disabled' : '')} />
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
