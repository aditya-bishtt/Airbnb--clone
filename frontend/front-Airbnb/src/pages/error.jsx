import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      textAlign: "center",
      fontFamily: "sans-serif",
      padding: "0 20px"
    }}>
      <h1 style={{ fontSize: "80px", margin: 0, color: "#FF385C" }}>404</h1>
      <h2 style={{ margin: "10px 0", color: "#222" }}>Page Not Found</h2>
      <p style={{ color: "#717171", marginBottom: "24px" }}>
        Oops! Ye page exist nahi karta ya URL galat hai.
      </p>
      <Link 
        to="/" 
        style={{
          backgroundColor: "#FF385C",
          color: "#fff",
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600"
        }}
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound