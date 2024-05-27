import React, { useState } from 'react';
import './styles.scss';
import _ from 'lodash';
import { WEEKS, endDate, startDate } from './calendar';

interface DateSelectorProps {
  handleDateClick: (date: number) => void;
  calendarData: (number | null)[][];
  selectedStartDate: number;
  selectedEndDate: number;
}

const DateSelector = ({ calendarData, handleDateClick, selectedEndDate, selectedStartDate }: DateSelectorProps) => {
  const getClassName = (date: number) => {
    let className = 'date-selector__day';

    if (selectedEndDate === 0 && selectedStartDate === 0) {
      if (startDate === date || endDate === date) {
        className += ' date-selector__day--selected';
      }
    } else {
      if (selectedStartDate === date || selectedEndDate === date) {
        className += ' date-selector__day--selected';
      }
    }

    return className;
  };

  return (
    <div className='date-selector'>
      <table>
        <thead>
          <tr>
            {WEEKS.map((week: string, idx: number) => (
              <th key={idx}>{week}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(calendarData, (week, weekIdx) => (
            <tr key={weekIdx}>
              {_.map(week, (date: number, dateIdx: number) => (
                <td
                  key={dateIdx}
                  className={getClassName(date)}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DateSelector;
