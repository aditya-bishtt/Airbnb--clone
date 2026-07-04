// import {useState,useEffect} from "react"
import axios from "axios"
import {useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import { fetchHomeStart, fetchmyHomeSuccess, fetchHomeFaliure } from "../store/homeSlice"
import {Link,useNavigate} from "react-router-dom"

const  HostHome =()=>{

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {myOwnHomes, loading} = useSelector(store=>store.homes)
  
  // ⛔ Tumhaara original handler logic (Bilkul haath nahi lagaya)
  const handleOnDelete=((e,id)=>{
    e.preventDefault();
    axios.post(`http://localhost:8080/host/delete-home/${id}`,{}).then(res=>{
      console.log(res.data.message);
      navigate("/")
    }).catch(err=>{
      console.log(err.response.data.message)
      navigate("/host/myhomes")
    })
  })

  useEffect(()=>{
    dispatch(fetchHomeStart())
    axios.get("http://localhost:8080/host/myhomes").then(res=>{
      console.log(res.data.registeredHomes)
      dispatch(fetchmyHomeSuccess(res.data.registeredHomes||[]))
    }).catch(err=>{
      console.log(err.response.data.message||err.message)
      dispatch(fetchHomeFaliure())
    })
  },[dispatch])

  if(loading){
    return <div style={{ textAlign: "center", marginTop: "5rem", fontSize: "18px" }}>Loading...</div>
  }

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "2.5rem auto", padding: "0 2rem", fontFamily: "sans-serif", boxSizing: "border-box" }}>

      <h2 style={{ fontSize: "26px", fontWeight: "700", color: "#222222", margin: "0 0 28px 0" }}>
        My Homes
      </h2>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "28px", 
        width: "100%",
        justifyContent: "start"
      }}>
        
        {myOwnHomes.length === 0 ? (
          <p style={{ gridColumn: "span 4", textAlign: "center", color: "#717171", fontSize: "16px", marginTop: "2rem" }}>no home</p>
        ) : (
          myOwnHomes.map(home => (
            <div 
              key={home._id} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                width: "100%",
                borderRadius: "18px",
                overflow: "hidden",
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
              
              {/* Image Container */}
              <div style={{ width: "100%", height: "200px", borderRadius: "14px", overflow: "hidden", marginBottom: "14px" }}>
                <img 
                  src={`http://localhost:8080${home.photo}`} 
                  alt={home.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              
              {/* Info & Beautiful Buttons */}
              <div style={{ padding: "0 6px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "600", color: "#222222", textTransform: "capitalize" }}>{home.title}</h3>
                <p style={{ margin: "0 0 8px 0", color: "#717171", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>📍 {home.place}</p>
                <p style={{ margin: "0 0 18px 0", fontWeight: "700", fontSize: "16px", color: "#222222" }}>₹{home.price} <span style={{ fontWeight: "400", color: "#717171", fontSize: "14px" }}>/ night</span></p>
                
                {/* ✨ Dashing Airbnb Style Buttons Row */}
                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  
                  {/* Premium Edit Button */}
                  <Link 
                    to={`/host/edit-home/${home._id}`} 
                    style={{ 
                      flex: 1,
                      textAlign: "center",
                      backgroundColor: "#222222",
                      color: "#ffffff", 
                      fontSize: "14px", 
                      fontWeight: "600", 
                      textDecoration: "none",
                      padding: "11px 0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "block",
                      border: "1px solid #222222",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#000000" }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#222222" }}
                  >
                    ✏️ Edit
                  </Link>
                  
                  {/* Premium Delete Button */}
                  <button 
                    type="button"  
                    onClick={(e)=>handleOnDelete(e,home._id)}
                    style={{
                      flex: 1,
                      backgroundColor: "#ffffff",
                      border: "1px solid #ff385c",
                      color: "#ff385c", 
                      fontSize: "14px", 
                      fontWeight: "600", 
                      padding: "11px 0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#ff385c"; e.currentTarget.style.color = "#ffffff" }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#ff385c" }}
                  >
                    🗑️ Delete
                  </button>
                  
                </div>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default HostHome;