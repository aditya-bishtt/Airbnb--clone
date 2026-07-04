import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { useDispatch, useSelector } from "react-redux"       
import { login, stopChecking } from "./store/authSlice"

import api from "./api/axios"

function App() {
  const { isChecking } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(() => {
 
    api.get("/me").then(result => {
      if (result.data.user === null) { 
        dispatch(stopChecking()); 
        return;
      }
        
      dispatch(login({
        userId: result.data.userId,
        userType: result.data.userType
      }))
    }).catch((err) => {
      console.log("Auth check failed:", err.response?.data?.message || err.message);
      dispatch(stopChecking());
    })
  }, [dispatch])


  if (isChecking) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", fontFamily: "sans-serif" }}>
        Loading Session... 🔄
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App;