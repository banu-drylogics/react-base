import utils from './dateUtils';

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
      return `${selectedStartDate} ${utils.months[selectedStartMonth]} ${selectedStartYear} - 
      ${selectedEndDate} ${utils.months[selectedEndMonth]} ${selectedEndYear}`;
    }
    if (selectedStartDate) {
      return `${selectedStartDate} ${utils.months[selectedStartMonth]} ${selectedStartYear}`;
    }
    return `${utils.startDate} ${utils.months[utils.startMonth]} ${utils.startYear} - ${utils.endDate} ${utils.months[utils.endMonth]} ${utils.endYear}`;
  };
  return (
    <div className='calendar__date-picker'>
      <p className="calendar__date-picker__date-range">Date Range:</p>
      <button className="calendar__date-picker__label" onClick={() => setCalendarVisible(!calendarVisible)}>{formatPickedDate()}</button>
    </div>
  )
}

export default DatePicker;
