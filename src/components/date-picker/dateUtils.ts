import _ from 'lodash';

const date: Date = new Date(2022, 2, 31); // March 31, 2022
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April'];
const years = _.range(date.getFullYear(), new Date().getFullYear() + 1);

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


const calculateLast7Days = (date: Date) => {
  const end = new Date(date);
  const start = new Date(date);
  start.setDate(start.getDate() - 6);

  return {
    startDate: start.getDate(),
    endDate: end.getDate(),
    startMonth: start.getMonth(),
    endMonth: end.getMonth(),
    startYear: start.getFullYear(),
    endYear: end.getFullYear(),
  };
};

const result = calculateLast7Days(date);

const utils = {
  date,
  weeks,
  months,
  years,
  calculateLast7Days,
  getCalendarData,
  ...result,
};

export default utils;
