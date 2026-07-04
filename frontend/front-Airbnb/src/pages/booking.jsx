import { useState, useEffect } from "react"
import api from "../api/axios"

const Mybookings = () => {
  const [bookingHomes, setBookingHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/mybookings")
      .then(res => {
        console.log(res.data);
        setBookingHomes(res.data.bookings || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleOnCancelBooking=(bookingId)=>{
    api.delete(`/deleteBooking/${bookingId}`) .then(res => {
        console.log(res.data);
        return api.get("/mybookings");
      
      }).then(res=>{
        setBookingHomes(res.data.bookings || []);
      })
      .catch(err => {
        console.log(err);
       
      });
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: "4rem", fontFamily: "sans-serif", color: "#717171" }}>Loading....</div>;
  }

  return (
    <div style={{
      maxWidth: "1100px",
      margin: "3rem auto",
      padding: "0 2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <h2 style={{
        fontSize: "36px",
        fontWeight: "700",
        color: "#222222",
        letterSpacing: "-0.5px",
        marginBottom: "32px"
      }}>
        My Bookings
      </h2>

      {bookingHomes.length !== 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {bookingHomes.map(booking => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #e7e7e7",
                borderRadius: "24px",
                padding: "28px",
                display: "flex",
                gap: "32px",
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${booking.home?.photo}`}
                alt={booking.home?.title}
                style={{
                  width: "280px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  flexShrink: 0
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#222222",
                  textTransform: "capitalize"
                }}>
                  {booking.home?.title}
                </h3>

                <p style={{
                  margin: "0 0 18px 0",
                  color: "#717171",
                  fontSize: "16px",
                  lineHeight: "1.6"
                }}>
                  📍 {booking.home?.place}
                </p>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  color: "#484848",
                  background: "#f7f7f7",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  width: "fit-content",
                  marginBottom: "18px"
                }}>
                  🗓️ {new Date(booking.checkIn).toDateString()} <span style={{ color: "#b0b0b0" }}>→</span> {new Date(booking.checkOut).toDateString()}
                </div>

                <p style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: "24px",
                  color: "#222222"
                }}>
                  ₹{booking.totalPrice}
                  <span style={{ fontWeight: "400", fontSize: "15px", color: "#717171", marginLeft: "8px" }}>
                    total
                  </span>
                </p>
             <button
  onClick={() => handleOnCancelBooking(booking._id)}
  style={{
    marginTop: "12px",
    padding: "8px 16px",
    background: "#ffffff",
    color: "#e61e4d",
    border: "1px solid #e61e4d",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    width: "fit-content"
  }}
>
  Cancel Booking
</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "5rem 2rem",
          border: "1px dashed #e0e0e0",
          borderRadius: "20px",
          color: "#717171"
        }}>
          <p style={{ fontSize: "18px", margin: 0 }}>No Home found yet  🏡</p>
        </div>
      )}
    </div>
  );
};

export default Mybookings;