import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"

import api from "../api/axios"

const Login = () => {
  const emailUseRef = useRef()
  const navigate = useNavigate();
  const passwordUseRef = useRef()
  const [errors, setErrors] = useState([])
  const [oldInput, setOldInput] = useState({})
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailUseRef.current.value,
      password: passwordUseRef.current.value
    }


    api.post("/login", data)
      .then(result => {
        dispatch(login({
          userId: result.data.userId,
          userType: result.data.userType
        }))
        navigate("/")
      })
      .catch(err => {
       
        setErrors(err.response?.data?.errors || [err.message]);
        setOldInput(err.response?.data?.oldInput || {})
      })
  }

  return (
    <>
      <style>{`
        .login-card {
          max-width: 480px;
          margin: 2rem auto;
          background: white;
          border: 0.5px solid #e0e0e0;
          border-radius: 12px;
          padding: 2rem 2.5rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          box-sizing: border-box;
        }

        @media (max-width: 500px) {
          .login-card {
            margin: 1.25rem auto;
            padding: 1.5rem 1.25rem;
            width: 92%;
            border-radius: 10px;
          }
        }
      `}</style>

      <div className="login-card">
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
          <div style={{ width: "32px", height: "32px", background: "#ff385c", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            🏠
          </div>
          <span style={{ fontSize: "18px", fontWeight: "500", color: "#ff385c" }}>airbnb</span>
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: "600", margin: "0 0 0.25rem" }}>Welcome back</h2>
        <p style={{ fontSize: "14px", color: "#717171", margin: "0 0 1.5rem" }}>Log in to your account</p>
        
        <div>
          {errors.length > 0 && (
            <ul style={{ background: "#fff5f5", border: "1px solid #ffcccc", borderRadius: "8px", padding: "0.75rem 1rem 0.75rem 1.5rem", marginBottom: "1rem", color: "#cc0000", fontSize: "13px" }}>
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Email address</label>
            <input type="email" placeholder="123@example.com" key={oldInput.email} defaultValue={oldInput.email || ""} className="form-control" ref={emailUseRef}/>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Password</label>
            <input type="password" placeholder="Enter your password" key={oldInput.password} defaultValue={oldInput.password || ""} className="form-control" ref={passwordUseRef} />
          </div>

          <button type="submit" style={{ width: "100%", marginTop: "1.25rem", padding: "12px", background: "#ff385c", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
            Log in
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#717171", marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#ff385c", fontWeight: "500", textDecoration: "none" }}>Sign up</Link>
        </p>
      </div>
    </>
  )
}

export default Login;