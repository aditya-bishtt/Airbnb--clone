import { Link } from "react-router-dom"

import {useSelector} from "react-redux"
const NavBar = () => {
  const {isLoggedIn,user}=useSelector((store)=>store.auth)
  return (
    <nav style={{ backgroundColor: "#ff385c", padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
      
      <Link to="/" style={{ color: "white", fontWeight: "bold", fontSize: "1.8rem", textDecoration: "none" }}>
        🏠 airbnb
      </Link>

      <input type="search" placeholder="Search destinations..." style={{ padding: "10px 20px", borderRadius: "24px", border: "none", width: "350px", outline: "none", fontSize: "0.95rem" }} />  
      {isLoggedIn ?<>
      {user?.userType==="guest"&&
      <>
      <Link to="/bookings" style={{ color: "white", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}>Bookings</Link>
      <Link to="/favourites" style={{ color: "white", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}> Favourites</Link>
      </>
      }
      {
        user?.userType==="host"&&
        <Link to="/host/add-home" style={{ color: "white", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}>Add Home</Link>
      }
      
          
       
        <Link to="/logout" style={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)", padding: "10px 20px", borderRadius: "24px", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}>Logout</Link>
      </> :
      <>
       <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
         <Link to="/signup" style={{ color: "white", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}>Register</Link>
        <Link to="/login" style={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)", padding: "10px 20px", borderRadius: "24px", textDecoration: "none", fontWeight: "500", fontSize: "1rem" }}>Login</Link>

      </div>
      </>
      
    
    }
     

    </nav>
  )
}

export default NavBar