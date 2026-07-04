import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchHomeStart, fetchmyFavouriteHomesSucess, fetchHomeFaliure } from "../store/homeSlice"
import { useNavigate } from "react-router-dom"

import api from "../api/axios"

const FavouriteHomes = () => {
  const { favouriteHomes, loading } = useSelector(store => store.homes)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromFav = ((e, HomeId) => {
    e.preventDefault();
    
    api.post(`/remove-favourites/${HomeId}`, {}).then(res => {
      console.log(res.data.message);
      dispatch(fetchmyFavouriteHomesSucess(res.data.favHome));
    }).catch(err => {
      console.log(err.response?.data?.message || err.message)
      navigate("/favourites")
    })
  })

  useEffect(() => {
    dispatch(fetchHomeStart());

    api.get("/favourites").then(res => {
      console.log(res.data.favHome)
      dispatch(fetchmyFavouriteHomesSucess(res.data.favHome || []))
    }).catch(err => {
      console.log(err.response?.data?.message || err.message)
      dispatch(fetchHomeFaliure());
    })
  }, [dispatch])

  console.log("Current State in Render:", favouriteHomes, "Loading:", loading);
  
  if (loading) {
    return <div>Loading......</div>
  }
  
  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "2.5rem auto", padding: "0 2rem", fontFamily: "sans-serif", boxSizing: "border-box" }}>
      <h2 style={{ marginBottom: "28px", color: "#222222", fontSize: "26px", fontWeight: "700" }}>Your Favourite Homes ❤️</h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "28px", 
        width: "100%",
        justifyContent: "start"
      }}>
        
        {favouriteHomes.length === 0 ? (
          <p style={{ color: "#717171", fontSize: "16px" }}>No favourites added yet.</p>
        ) : (
          favouriteHomes.map(home => (
            <div 
              key={home._id} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                borderRadius: "18px",
                border: "1px solid #ededed",
                padding: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)"
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.12)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"
              }}
            >
            
              <div style={{ width: "100%", height: "200px", borderRadius: "14px", overflow: "hidden", marginBottom: "14px" }}>
                <img 
                 
                  src={`${import.meta.env.VITE_API_URL}${home.photo}`} 
                  alt={home.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              
          
              <div style={{ padding: "0 6px", marginBottom: "14px" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "600", color: "#222222", textTransform: "capitalize" }}>{home.title}</h3>
                <p style={{ margin: "0 0 8px 0", color: "#717171", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>📍 {home.place}</p>
                <p style={{ margin: "0", fontWeight: "700", fontSize: "16px", color: "#222222" }}>₹{home.price} <span style={{ fontWeight: "400", color: "#717171", fontSize: "14px" }}>/ night</span></p>
              </div>

              <button 
                type="button" 
                onClick={(e)=> handleRemoveFromFav(e,home._id)}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ff385c",
                  color: "#ff385c",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "11px 0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  width: "100%",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#ff385c"; e.currentTarget.style.color = "#ffffff" }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#ff385c" }}
              >
                🗑️ Remove
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default FavouriteHomes;