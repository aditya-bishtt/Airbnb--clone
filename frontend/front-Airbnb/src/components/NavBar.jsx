import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import {logout} from "../store/authSlice"
import {useDispatch} from "react-redux"
import api from "../api/axios"

const NavBar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleOnLogout=(e)=>{
    e.preventDefault()
    api.post("/logout").then((res=>{
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
    opacity: 0.95,
    transition: "opacity 0.2s ease"
  }

  const pillButtonStyle = {
    color: "#ff385c",
    backgroundColor: "white",
    borderRadius: "24px",
    textDecoration: "none",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  }

  return (
    <>
      <style>{`
  .nav-container {
    background-color: #ff385c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 16px rgba(255, 56, 92, 0.35);
    border-bottom: 1px solid rgba(255,255,255,0.15);
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 16px 48px;
    flex-wrap: wrap;
  }
  .nav-brand {
    font-size: 1.7rem;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
  }
  .nav-link {
    font-size: 0.95rem;
    white-space: nowrap;
  }
  .nav-pill {
    padding: 10px 24px;
    font-size: 0.95rem;
    white-space: nowrap;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 12px 20px;
      gap: 10px;
    }
    .nav-brand {
      font-size: 1.4rem;
    }
    .nav-links {
      gap: 14px;
    }
    .nav-link {
      font-size: 0.85rem;
    }
    .nav-pill {
      padding: 8px 18px;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    .nav-container {
      padding: 10px 14px;
    }
    .nav-brand {
      font-size: 1.2rem;
    }
    .nav-links {
      gap: 10px;
      justify-content: center;
    }
    .nav-link {
      font-size: 0.78rem;
    }
    .nav-pill {
      padding: 7px 16px;
      font-size: 0.78rem;
      border-radius: 20px;
    }
  }
`}</style>

      <nav className="nav-container">

        <Link to="/" className="nav-brand" style={{ color: "white", fontWeight: "800", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", letterSpacing: "-0.5px", textShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
          🏠 airbnb
        </Link>

        {isLoggedIn ? (
          <div className="nav-links">
            {user?.userType === "guest" && (
              <>
                <Link to="/favourites" className="nav-link" style={linkStyle}>Favourites</Link>
              </>
            )}
            {user?.userType === "host" && (
              <>
                <Link to="/host/add-home" className="nav-link" style={linkStyle}>Add Home</Link>
                <Link to="/host/myhomes" className="nav-link" style={linkStyle}>My Homes</Link>
              </>
            )}
            <Link to="/mybookings" className="nav-link" style={linkStyle}>Bookings</Link>

            <button type="button" onClick={handleOnLogout} className="nav-pill" style={pillButtonStyle}>
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/signup" className="nav-link" style={linkStyle}>Register</Link>
            <Link to="/login" className="nav-pill" style={pillButtonStyle}>Login</Link>
          </div>
        )}

      </nav>
    </>
  )
}

export default NavBar