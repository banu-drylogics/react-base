import React, { useState } from 'react';
import './Calendar.scss';
import _ from 'lodash';
import utils from './dateUtils';

interface DateSelectorProps {
  handleDateClick: (date: number) => void;
  calendarData: (number | null)[][];
  selectedStartDate: number;
  selectedEndDate: number;
}

const DateSelector = ({ calendarData, handleDateClick, selectedEndDate, selectedStartDate }: DateSelectorProps) => {
  return (
    <div className='date-selector'>
      <table>
        <thead>
          <tr>
            {utils.WEEKS.map((week: string, idx: number) => (
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
                  className="date-selector__day"
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
