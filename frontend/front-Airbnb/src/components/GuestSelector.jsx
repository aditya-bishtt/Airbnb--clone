import { useState, useRef, useEffect } from "react";

const GuestSelector = ({ onGuestsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCount = (type, action) => {
    setGuests(prev => {
      const newValue = action === "increment" ? prev[type] + 1 : prev[type] - 1;
      const min = type === "adults" ? 1 : 0;
      if (newValue < min) return prev;

      const updated = { ...prev, [type]: newValue };
      if (onGuestsChange) onGuestsChange(updated);
      return updated;
    });
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <style>{`
        .guest-trigger {
          border: 1px solid #b0b0b0;
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
          font-size: 14px;
          box-sizing: border-box;
        }
        .guest-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          width: 280px;
          max-width: 90vw;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          padding: 16px;
          z-index: 100;
          box-sizing: border-box;
        }

        @media (max-width: 400px) {
          .guest-dropdown {
            width: 100%;
            left: 0;
            right: 0;
          }
        }
      `}</style>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="guest-trigger"
      >
        <div style={{ color: "#717171", fontSize: "12px" }}>Guests</div>
        <div style={{ fontWeight: "600" }}>
          {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
        </div>
      </div>

      {isOpen && (
        <div className="guest-dropdown">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Adults</div>
              <div style={{ fontSize: "12px", color: "#717171" }}>Ages 13+</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button type="button" onClick={() => updateCount("adults", "decrement")} style={counterBtnStyle}>−</button>
              <span style={{ width: "16px", textAlign: "center" }}>{guests.adults}</span>
              <button type="button" onClick={() => updateCount("adults", "increment")} style={counterBtnStyle}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Children</div>
              <div style={{ fontSize: "12px", color: "#717171" }}>Ages 2-12</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button type="button" onClick={() => updateCount("children", "decrement")} style={counterBtnStyle}>−</button>
              <span style={{ width: "16px", textAlign: "center" }}>{guests.children}</span>
              <button type="button" onClick={() => updateCount("children", "increment")} style={counterBtnStyle}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Infants</div>
              <div style={{ fontSize: "12px", color: "#717171" }}>Under 2</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button type="button" onClick={() => updateCount("infants", "decrement")} style={counterBtnStyle}>−</button>
              <span style={{ width: "16px", textAlign: "center" }}>{guests.infants}</span>
              <button type="button" onClick={() => updateCount("infants", "increment")} style={counterBtnStyle}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const counterBtnStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "1px solid #b0b0b0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export default GuestSelector;