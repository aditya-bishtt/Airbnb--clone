import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import defaultIcon from '../leafletConfig';

import api from "../api/axios"
import GuestSelector from '../components/GuestSelector'
import Calender from '../components/calender'

const HomeDetails = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const [home, setHome] = useState({})
  const navigate = useNavigate();
  const [selectedGuests, setSelectedGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  })
  const [errors, setErrors] = useState("")

  const handleDataChange = (updatedDates) => {
    setSelectedDates(updatedDates);
    console.log("Updated Dates in Parent:", updatedDates);
  }

  const handleGuestsChange = (updatedGuests) => {
    setSelectedGuests(updatedGuests);
    console.log("Updated Guests in Parent:", updatedGuests); 
  };

  useEffect(() => {
    setLoading(true)
    
    
    api.get(`/details/${id}`).then((res) => {
      console.log(res.data.home)
      setHome(res.data.home)
      setLoading(false)
    }).catch(err => {
      console.log(err.response?.data?.message || err.message)
      setLoading(false)
      navigate("/")
    })
  }, [id, navigate])

  const handleonReserve = (e, homeId, newCheckIn, newCheckOut, guests) => {
    e.preventDefault()
    if (!newCheckIn || !newCheckOut) {
      setErrors("Kripya check-in aur check-out date select karein");
      return;
    }
    
    const data = {
      homeId: homeId,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      guests: guests
    }


    api.post("/addbookings", data).then(res => {
      console.log(res.data.message);
      setErrors("")
      navigate("/mybookings")
    }).catch(err => {
      const message = err.response?.data?.message || err.message;
      setErrors(message);
    })
  }

  if (loading) {
    return <div>Loading....</div>
  }

  const lat = parseFloat(home.lat) || 28.6139;
  const long = parseFloat(home.long) || 77.2090;

  return (
    <>
      <style>{`
        .details-container {
          width: 100%;
          max-width: 1100px;
          margin: 3rem auto;
          padding: 0 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-sizing: border-box;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .details-left {
          border-radius: 24px;
          border: 1px solid #e7e7e7;
          padding: 28px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          background-color: #ffffff;
          box-sizing: border-box;
        }
        .details-photo {
          width: 100%;
          height: 420px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .details-title {
          margin: 0 0 8px 0;
          font-size: 30px;
          font-weight: 700;
          color: #222222;
          text-transform: capitalize;
          letter-spacing: -0.5px;
        }
        .details-map-wrap {
          height: 340px;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e7e7e7;
        }
        .details-sidebar {
          position: sticky;
          top: 24px;
          border: 1px solid #e7e7e7;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .details-container {
            padding: 0 1.25rem;
            margin: 1.75rem auto;
          }
          .details-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .details-left {
            padding: 18px;
          }
          .details-photo {
            height: 260px;
            margin-bottom: 18px;
          }
          .details-title {
            font-size: 24px;
          }
          .details-map-wrap {
            height: 240px;
          }
          .details-sidebar {
            position: static;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .details-container {
            padding: 0 0.9rem;
          }
          .details-photo {
            height: 200px;
          }
          .details-title {
            font-size: 20px;
          }
          .details-map-wrap {
            height: 200px;
          }
        }
      `}</style>

      <div className="details-container">
        
        <div className="details-grid">

          {/* Left column — home details */}
          <div className="details-left">
            <div className="details-photo">
              <img 
                
                src={home.photo} 
                alt={home.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "0 4px" }}>
              <h1 className="details-title">
                {home.title}
              </h1>
              <p style={{ margin: "0 0 16px 0", color: "#717171", fontSize: "16px" }}>📍 {home.place}</p>
              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "20px" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#484848", lineHeight: "1.7" }}>{home.description}</p>
                <p style={{ margin: "20px 0 0 0", fontWeight: "700", fontSize: "24px", color: "#222222" }}>
                  ₹{home.price} <span style={{ fontWeight: "400", color: "#717171", fontSize: "16px" }}>/ night</span>
                </p>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "14px", color: "#222222" }}>
                  Where you'll be
                </h3>
                <div className="details-map-wrap">
                  <MapContainer center={[lat, long]} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Marker position={[lat, long]} icon={defaultIcon}>
                      <Popup>{home.place}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>

        
          <div className="details-sidebar">
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", borderBottom: "1px solid #eee", paddingBottom: "16px" }}>
              <span style={{ fontSize: "26px", fontWeight: "700", color: "#222222" }}>₹{home.price}</span>
              <span style={{ fontSize: "15px", color: "#717171" }}>/ night</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "4px" }}>
                <Calender onDateChange={handleDataChange} />
              </div>
              <div style={{ border: "1px solid #ddd", borderRadius: "12px" }}>
                <GuestSelector onGuestsChange={handleGuestsChange} />
              </div>
            </div>

            <button
              type="button"
              onClick={(e)=>handleonReserve(e,home._id,selectedDates.checkIn,selectedDates.checkOut,selectedGuests)}
              style={{
                width: "100%",
                padding: "16px",
                background: "linear-gradient(90deg, #e61e4d, #e31c5f, #d70466)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(230,30,77,0.35)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(230,30,77,0.45)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(230,30,77,0.35)"; }}
            >
              Reserve
            </button>
            
            {errors && (
              <p style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#e61e4d",
                background: "#fff0f2",
                padding: "10px 12px",
                borderRadius: "8px",
                margin: 0,
                fontWeight: "500"
              }}>
                ⚠️ {errors}
              </p>
            )}

            <p style={{ textAlign: "center", fontSize: "13px", color: "#717171", margin: 0 }}>
              You won't be charged yet
            </p>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#484848" }}>
                <span>Guests</span>
                <span>{selectedGuests.adults + selectedGuests.children} guest(s)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#484848" }}>
                <span>Dates</span>
                <span>
                  {selectedDates.checkIn && selectedDates.checkOut
                    ? "Selected"
                    : "Not selected"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default HomeDetails;