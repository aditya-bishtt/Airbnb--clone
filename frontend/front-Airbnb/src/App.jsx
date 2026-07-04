import {useEffect,useState} from "react"
import {Outlet} from "react-router-dom"
import NavBar from "./components/NavBar"
import axios from "axios"
import { useDispatch ,useSelector} from "react-redux"       
import { login,stopChecking } from "./store/authSlice"

function App() {
  const {isChecking}=useSelector(store=>store.auth)
 const dispatch = useDispatch();
 useEffect(()=>{
  axios.get("http://localhost:8080/me").then(result=>{
    if(result.data.user===null){ dispatch(stopChecking()); return}
      
      dispatch(login({
        userId:result.data.userId,
        userType:result.data.userType
     
    }))
  }).catch((err)=>{
    console.log("Auth check failed:", err);
      dispatch(stopChecking());
  })
 },[])
 // 🛑 Pehle checking wala if block: Jab tak true hai tab tak baki cheezein render nahi hongi
  if (isChecking) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", fontFamily: "sans-serif" }}>
        Loading Session... 🔄
      </div>
    );
  }

  return (<>
  <NavBar/>
  <Outlet/>
  </>)
}

export default App
