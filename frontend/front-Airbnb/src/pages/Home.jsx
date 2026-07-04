import { useEffect,useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { fetchHomeStart, fetchHomeSuccess, fetchHomeFaliure } from "../store/homeSlice"
import { Link, useNavigate } from "react-router-dom" 
import SearchBar from "../components/searchBar"

const categories = [
  { label: "All", emoji: "🌍" },
  { label: "Villa", emoji: "🏡" },
  { label: "Hotel", emoji: "🏨" },
  { label: "Beach", emoji: "🏖️" },
  { label: "Pool", emoji: "🏊" },
  { label: "Room", emoji: "🛏️" },
  { label: "Mountain", emoji: "⛰️" },
]


const Home = () => {
  const dispatch = useDispatch();
  const { registeredHomes, loading } = useSelector(store => store.homes)
  const { isLoggedIn, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
const [selectedCategory,setSelectedCategory]=useState("All")
  useEffect(() => {
    dispatch(fetchHomeStart())
    axios.get("http://localhost:8080/").then(res => {
      console.log(res.data.registeredHomes)
      dispatch(fetchHomeSuccess(res.data.registeredHomes || []))
    }).catch(err => {
      console.log(err.response.data.message || err.message)
      dispatch(fetchHomeFaliure())
    })
  }, [dispatch])

  const handleToAddFavourite = (e, HomeId) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/favourites/${HomeId}`, {}).then((res) => {
      console.log(res.data.message)
      navigate("/favourites")
    }).catch(err => {
      console.log(err.response.data.message || err.message)
    })    
  }
  // const  filteredHomes=useState([]);
  const   filteredHomes=selectedCategory==="All"?registeredHomes:registeredHomes.filter(home=>home.category===selectedCategory);
  

  return (
    <div style={{ fontFamily: "sans-serif" }}>


      <div style={{
        position: "relative",
        width: "100%",
        height: "460px",
        overflow: "hidden",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: 0
      }}>


        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "28px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)",
          pointerEvents: "none"
        }} />

      
        <div style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px"
        }}>
          <h1 style={{ fontSize: "44px", fontWeight: "800", margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
            Find your next stay
          </h1>
          <p style={{ fontSize: "16px", marginTop: "10px", opacity: 0.95, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
            Discover unique homes and unforgettable experiences
          </p>

       
        <SearchBar registredHomes={registeredHomes}></SearchBar>
            
          
          {/* </div> */}
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "36px",
        flexWrap: "wrap",
        padding: "18px 0 28px 0",
        borderBottom: "1px solid #eee"
      }}>
        {categories.map((cat, i) => (
        
          <div key={cat.label}  onClick={()=>setSelectedCategory(cat.label)}style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            color: i === 0 ? "#222" : "#717171",
            borderBottom: i === 0 ? "2px solid #222" : "2px solid transparent",
            paddingBottom: "6px",
            fontSize: "13px"
          }}>
            <span style={{ fontSize: "20px" }}>{cat.emoji}</span>
            {cat.label}
          </div>
        ))}
      </div>

  
      <div style={{ width: "100%", maxWidth: "1280px", margin: "2rem auto", padding: "0 2rem", boxSizing: "border-box" }}>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
          gap: "28px", 
          width: "100%",
          justifyContent: "start"
        }}>
          
          {loading&&filteredHomes.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>no home</p>
          ) : (
            filteredHomes.map(home => (
              <div 
                key={home._id} 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  width: "100%",
                  cursor: "pointer"
                }}
              >
                
         \
                <div style={{ position: "relative", width: "100%", height: "210px", borderRadius: "14px", overflow: "hidden", marginBottom: "10px" }}>
                  <img 
                    src={`http://localhost:8080${home.photo}`} 
                    alt={home.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                  {user?.userType === "guest" && (
                    <button 
                      type="button" 
                      onClick={(e) => handleToAddFavourite(e, home._id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
                      }}
                    >
                      ❤️
                    </button>
                  )}
                </div>
                
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "600", color: "#222222", textTransform: "capitalize" }}>
                    {home.title}
                  </h3>
                  <p style={{ margin: "0 0 4px 0", color: "#717171", fontSize: "13px" }}>
                    📍 {home.place}
                  </p>
                  <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#222222" }}>
                    <span style={{ fontWeight: "700" }}>₹{home.price}</span>
                    <span style={{ color: "#717171" }}> / night</span>
                  </p>

                  <Link 
                    to={`/details/${home._id}`} 
                    style={{
                      color: "#FF385C", 
                      fontSize: "13px", 
                      fontWeight: "600", 
                      textDecoration: "none"
                    }}
                  >
                    View Details →
                  </Link>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  )
}

export default Home;