const DATE: Date = new Date(2024, 2, 31); // March 31, 2024
const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April'];
const CMonths = DATE.getMonth();
const YEAR = DATE.getFullYear()

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

const result = calculateLast7Days(DATE);

const utils = {
  DATE,
  WEEKS,
  MONTHS,
  CMonths,
  YEAR,
  calculateLast7Days,
  ...result,
};

export default utils;
