import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ onDateChange }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setCheckIn(start);
    setCheckOut(end);
    if (onDateChange) onDateChange({ checkIn: start, checkOut: end });
  };

  return (
    <div>
      <style>{`
        .custom-datepicker {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          font-size: 14px;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          font-size: 0.9rem;
        }

        @media (max-width: 500px) {
          .react-datepicker-popper {
            width: 100%;
            max-width: 320px;
          }
          .react-datepicker {
            font-size: 0.8rem;
            width: 100%;
          }
          .react-datepicker__month-container {
            width: 100%;
          }
          .react-datepicker__day-name,
          .react-datepicker__day {
            width: 1.8rem;
            line-height: 1.8rem;
            margin: 0.15rem;
          }
        }

        @media (max-width: 380px) {
          .react-datepicker__day-name,
          .react-datepicker__day {
            width: 1.5rem;
            line-height: 1.5rem;
            margin: 0.1rem;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <label style={{ fontSize: "11px", color: "#717171", fontWeight: "600", display: "block", marginBottom: "4px" }}>
        SELECT DATES
      </label>
      <DatePicker
        selectsRange={true}
        startDate={checkIn}
        endDate={checkOut}
        onChange={handleChange}
        minDate={new Date()}
        placeholderText="Check-in — Check-out"
        dateFormat="MMM d, yyyy"
        className="custom-datepicker"
      />
    </div>
  );
};

export default DateSelector;