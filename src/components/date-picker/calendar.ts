export const DATE: Date = new Date(2024, 2, 31); // March 31, 2024
export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = ['January', 'February', 'March'];

const calculateLast7Days = () => {
  const end = new Date(DATE);
  const start = new Date(DATE);
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

export const { startDate, endDate, startMonth, endMonth, startYear, endYear } = calculateLast7Days();
