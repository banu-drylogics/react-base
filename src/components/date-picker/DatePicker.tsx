import { MONTHS, startDate, endDate, startMonth, endMonth, startYear, endYear } from './calendar';

interface DatePickerProps {
  calendarVisible: boolean;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStartDate: number;
  selectedEndDate: number;
  selectedStartMonth: number;
  selectedStartYear: number;
  selectedEndMonth: number;
  selectedEndYear: number;
}

const DatePicker = ({
  calendarVisible,
  setCalendarVisible,
  selectedStartDate,
  selectedEndDate,
  selectedStartMonth,
  selectedStartYear,
  selectedEndMonth,
  selectedEndYear }: DatePickerProps) => {

  const formatPickedDate = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${selectedStartDate} ${MONTHS[selectedStartMonth]} ${selectedStartYear} - 
      ${selectedEndDate} ${MONTHS[selectedEndMonth]} ${selectedEndYear}`;
    }
    if (selectedStartDate) {
      return `${selectedStartDate} ${MONTHS[selectedStartMonth]} ${selectedStartYear}`;
    }
    return `${startDate} ${MONTHS[startMonth]} ${startYear} - ${endDate} ${MONTHS[endMonth]} ${endYear}`;
  };
  return (
    <div className='calendar__date-picker'>
      <p className="calendar__date-picker__date-range">Date Range:</p>
      <button className="calendar__date-picker__label" onClick={() => setCalendarVisible(!calendarVisible)}>{formatPickedDate()}</button>
    </div>
  )
}

export default DatePicker;
