import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const ProtectedRoute=({children,allowedType})=>{
  const {isLoggedIn, user,isChecking}=useSelector((store)=>store.auth)
if(isChecking){return <div style={{ textAlign: "center", marginTop: "3rem" }}>Loading... 🏠</div>}
  if(!isLoggedIn){
    return <Navigate to= "/login" replace/> 
  }
  if(allowedType&&user?.userType!==allowedType){
    return <Navigate to="/" replace/>
  }
  return children
}
export default ProtectedRoute