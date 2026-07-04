import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import {logout} from "../store/authSlice"
import {useDispatch} from "react-redux"
import axios from "axios"
const NavBar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleOnLogout=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/logout").then((res=>{
      console.log(res)
      dispatch(logout())
      navigate("/")
      
    })).catch(err=>{
      console.log(err)
    })
  }
  const {isLoggedIn,user}=useSelector((store)=>store.auth)

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "0.95rem",
    opacity: 0.95,
    transition: "opacity 0.2s ease"
  }

  const pillButtonStyle = {
    color: "#ff385c",
    backgroundColor: "white",
    padding: "10px 24px",
    borderRadius: "24px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.95rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  }

  return (
    <nav style={{
      backgroundColor: "#ff385c",
      padding: "16px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 16px rgba(255, 56, 92, 0.35)",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>

      <Link to="/" style={{ color: "white", fontWeight: "800", fontSize: "1.7rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", letterSpacing: "-0.5px", textShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
        🏠 airbnb
      </Link>

      {isLoggedIn ? (
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {user?.userType === "guest" && (
            <>
              
              <Link to="/favourites" style={linkStyle}>Favourites</Link>
            </>
          )}
          {user?.userType === "host" && (
            <>
              <Link to="/host/add-home" style={linkStyle}>Add Home</Link>
              <Link to="/host/myhomes" style={linkStyle}>My Homes</Link>
            </>
          )}
          <Link to="/mybookings" style={linkStyle}>Bookings</Link>

          <button type="button" onClick={handleOnLogout} style={pillButtonStyle}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/signup" style={linkStyle}>Register</Link>
          <Link to="/login" style={pillButtonStyle}>Login</Link>
        </div>
      )}

    </nav>
  )
}

export default NavBar