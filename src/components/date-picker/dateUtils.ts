// export const DATE: Date = new Date(2024, 2, 31); // March 31, 2024
// export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// export const MONTHS = ['January', 'February', 'March', 'Dec'];

// const calculateLast7Days = () => {
//   const end = new Date(DATE);
//   const start = new Date(DATE);
//   start.setDate(start.getDate() - 6);

//   return {
//     startDate: start.getDate(),
//     endDate: end.getDate(),
//     startMonth: start.getMonth(),
//     endMonth: end.getMonth(),
//     startYear: start.getFullYear(),
//     endYear: end.getFullYear(),
//   };
// };

// export const { startDate, endDate, startMonth, endMonth, startYear, endYear } = calculateLast7Days();



const DATE: Date = new Date(2024, 2, 31); // March 31, 2024
const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April'];

/**
 * Calculate the last 7 days from the given date.
 * @param {Date} date - The end date.
 * @returns {object} An object containing start and end dates, months, and years.
 */
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
  calculateLast7Days,
  ...result,
};

export default utils;
