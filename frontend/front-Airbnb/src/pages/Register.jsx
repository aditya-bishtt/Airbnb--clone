import { useRef,useState} from "react"
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
const Register = () => {
const userNameRef = useRef()
const lastNameRef = useRef()
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()

const[userType,setUserType]=useState("guest")


const navigate=useNavigate();
const [errors,setErrors]=useState([])
const [oldInput,setOldInput]=useState({})

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const data={
      userName:userNameRef.current.value,
      lastName:lastNameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      passwordConfirm:passwordConfirmRef.current.value,
      userType:userType,
      

    }
    axios.post("http://localhost:8080/signup",data).then(result=>{
      console.log(result)
      navigate("/login")
    }).catch(err=>{
      setErrors(err.response.data.errors)
      setOldInput(err.response.data.oldInput)
      setUserType(err.response.data.oldInput.userType)
    })
    
    
    }

  return (
    <div style={{ maxWidth: "560px", margin: "2rem auto", background: "white", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "2rem 2.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      
      <h2 style={{ fontSize: "22px", fontWeight: "600", margin: "0 0 0.25rem" }}>Create your account</h2>
      <p style={{ fontSize: "14px", color: "#717171", margin: "0 0 1.75rem" }}>Join Airbnb — it's free</p>
      <div>

        {errors.length > 0 && (
  <ul style={{ background: "#fff5f5", border: "1px solid #ffcccc", borderRadius: "8px", padding: "0.75rem 1rem 0.75rem 1.5rem", marginBottom: "1rem", color: "#cc0000", fontSize: "13px" }}>
    {errors.map((err, i) => <li key={i}>{err}</li>)}
  </ul>
)}
      </div>

      <form onSubmit={handleOnSubmit}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>First name</label>
            <input type="text" key={oldInput.userName} ref={userNameRef} placeholder="Aditya" className="form-control" defaultValue={oldInput.userName|| ""}/>
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Last name</label>
            <input type="text" ref={lastNameRef} key={oldInput.lastName} placeholder="Bisht" className="form-control" defaultValue={oldInput.lastName|| ""} />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Email address</label>
          <input type="email" ref={emailRef}  key={oldInput.email} placeholder="123@example.com" className="form-control" defaultValue={oldInput.email|| ""}/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Password</label>
            <input type="password" ref={passwordRef} placeholder="Min 8 characters" className="form-control" />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Confirm password</label>
            <input type="password" ref={passwordConfirmRef} placeholder="Re-enter" className="form-control" />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "8px" }}>I am a</label>
          <div style={{ display: "flex", gap: "12px" }}>
            <label style={{ flex: 1, border: "1.5px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <input type="radio" onChange={()=>{setUserType("guest")}} value="guest" checked={userType==="guest"}  style={{ accentColor: "#ff385c" }} />
              🧳 Guest
            </label>
            <label style={{ flex: 1, border: "1.5px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <input type="radio"  onChange={()=>{setUserType("host")}} value="host"checked={userType==="host"} style={{ accentColor: "#ff385c" }} />
              🏠 Host
            </label>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "1.25rem 0" }} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <input type="checkbox"   required name="terms" id="terms" style={{ marginTop: "3px", accentColor: "#ff385c", width: "16px", height: "16px", flexShrink: 0 }} />
          <label htmlFor="terms"   style={{ fontSize: "13px", color: "#717171", lineHeight: "1.5", cursor: "pointer" }}>
            I agree to the{" "}
            <text style={{ color: "#ff385c", textDecoration: "underline" }}>Terms & Conditions</text>
            {" "}and{" "}
            <text href="#" style={{ color: "#ff385c", textDecoration: "underline" }}>Privacy Policy</text>
          </label>
        </div> 

        <button type="submit" style={{ width: "100%", marginTop: "1.25rem", padding: "12px", background: "#ff385c", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
          Create account
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#717171", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff385c", fontWeight: "500", textDecoration: "none" }}>Log in</Link>
        </p>

      </form>
    </div>
  )
}

export default Register