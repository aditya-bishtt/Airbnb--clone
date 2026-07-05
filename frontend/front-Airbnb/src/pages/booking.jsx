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
    <>
      <style>{`
        .mybookings-container {
          max-width: 1100px;
          margin: 3rem auto;
          padding: 0 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-sizing: border-box;
        }
        .mybookings-title {
          font-size: 36px;
          font-weight: 700;
          color: #222222;
          letter-spacing: -0.5px;
          margin-bottom: 32px;
        }
        .booking-card {
          border: 1px solid #e7e7e7;
          border-radius: 24px;
          padding: 28px;
          display: flex;
          gap: 32px;
          background-color: #ffffff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
        }
        .booking-image {
          width: 280px;
          height: 220px;
          object-fit: cover;
          border-radius: 18px;
          flex-shrink: 0;
        }
        .booking-title {
          margin: 0 0 12px 0;
          font-size: 26px;
          font-weight: 700;
          color: #222222;
          text-transform: capitalize;
        }
        .booking-place {
          margin: 0 0 18px 0;
          color: #717171;
          font-size: 16px;
          line-height: 1.6;
        }
        .booking-dates {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          color: #484848;
          background: #f7f7f7;
          padding: 10px 16px;
          border-radius: 10px;
          width: fit-content;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .booking-price {
          margin: 0;
          font-weight: 700;
          font-size: 24px;
          color: #222222;
        }

        @media (max-width: 768px) {
          .mybookings-container {
            padding: 0 1.25rem;
            margin: 2rem auto;
          }
          .mybookings-title {
            font-size: 28px;
            margin-bottom: 22px;
          }
          .booking-card {
            flex-direction: column;
            gap: 18px;
            padding: 18px;
            border-radius: 18px;
          }
          .booking-image {
            width: 100%;
            height: 200px;
          }
          .booking-title {
            font-size: 22px;
          }
        }

        @media (max-width: 420px) {
          .mybookings-container {
            padding: 0 0.9rem;
          }
          .mybookings-title {
            font-size: 24px;
          }
          .booking-card {
            padding: 14px;
          }
          .booking-image {
            height: 170px;
          }
          .booking-dates {
            font-size: 14px;
            padding: 8px 12px;
          }
          .booking-price {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="mybookings-container">
        <h2 className="mybookings-title">
          My Bookings
        </h2>

        {bookingHomes.length !== 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {bookingHomes.map(booking => (
              <div
                key={booking._id}
                className="booking-card"
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
                  src={booking.home?.photo}
                  alt={booking.home?.title}
                  className="booking-image"
                />

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                  <h3 className="booking-title">
                    {booking.home?.title}
                  </h3>

                  <p className="booking-place">
                    📍 {booking.home?.place}
                  </p>

                  <div className="booking-dates">
                    🗓️ {new Date(booking.checkIn).toDateString()} <span style={{ color: "#b0b0b0" }}>→</span> {new Date(booking.checkOut).toDateString()}
                  </div>

                  <p className="booking-price">
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
    </>
  );
};

export default Mybookings;