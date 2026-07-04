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