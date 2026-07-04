import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
let currentAbortController = null;
  let debounceTimer = null;
const AddHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    place: "",
    rating: "",
    description: "",
    oldPhotoUrl: "",
    category: "Villa",
    lat:"",
    long:""
  })

  const [predictions, setPredictions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      api.get(`/host/edit-home/${id}`)
        .then(res => {
          const home = res.data.home;
          setFormData({
            title: home.title || "",
            price: home.price || "",
            place: home.place || "",
            rating: home.rating || "",
            description: home.description || "",
            oldPhotoUrl: home.photo || "",
            category: home.category || "Villa",
            lat:home.lat||"",
            long:home.long||""

          })
          setLoading(false);
        }).catch(err => {
          console.log(err);
          setLoading(false)
          navigate("/host/myhomes")
        })
    } else {
      setFormData({ title: "", price: "", place: "", rating: "", description: "", oldPhotoUrl: "", category: "Villa",lat:"",long:"" });
    }
  }, [id, isEditMode, navigate])

  const handleInputChange = ((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  })



const handleLocationChange = (e) => {
  const value = e.target.value;
  setFormData({ ...formData, place: value })

  if (currentAbortController) {
    currentAbortController.abort();
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  if (value.length > 2) {
    debounceTimer = setTimeout(() => {
      console.log("Typing and sending request for:", value);

      currentAbortController = new AbortController();
      const signal = currentAbortController.signal;

      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=in&limit=5`, { signal })
        .then(res => res.json())
        .then(data => {
          console.log("API Response received:", data);
          if (data && data.length > 0) {
            setPredictions(data);
            setIsDropdownVisible(true);
          } else {
            setPredictions([]);
            setIsDropdownVisible(false);
          }
        }).catch(err => {
          if (err.name === 'AbortError') {
            console.log("Purani call abort/cancel ho gayi.");
          } else {
            console.log("Map API Error:", err);
            setPredictions([]);
            setIsDropdownVisible(false);
          }
        })
    }, 400);
  } else {
    setPredictions([]);
    setIsDropdownVisible(false);
  }
}
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { title, place, price, rating, description, category, photo: photoInput } = e.target;
    const data = new FormData();
    data.append("title", title.value);
    data.append("place", place.value);
    data.append("price", price.value);
    data.append("category", category.value)
    data.append("rating", rating.value);
    data.append("description", description.value);
    data.append("lat",formData.lat|| "28.6139");
    data.append("long",formData.long|| "77.2090");

    
    if (photoInput && photoInput.files[0]) {
      data.append("photo", photoInput.files[0]);
    }
    
    const url = isEditMode ? `/host/edit-home/${id}` : "/host/add-home";
    api.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      console.log("property adeed")
      navigate("/host/myhomes")
    }).catch(err => {
      console.log(err)
    })
  }

  if (loading) return <div> <h1>loadingg</h1></div>

  return (
    <div style={{
      maxWidth: "520px",
      margin: "3rem auto",
      background: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "16px",
      padding: "2.5rem",
      boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      
      <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#222222", margin: "0 0 0.5rem" }}>
        {isEditMode ? "Edit your property details" : "🏠 List your property "}
      </h2>
      <p style={{ fontSize: "14px", color: "#717171", margin: "0 0 2rem" }}>
        Share the details of your home with guests around the world.
      </p>

      <form onSubmit={handleOnSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        
        <div>
          <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Property Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange}
            placeholder="e.g., Luxury Sea View Apartment"
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #b0b0b0", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            required />
        </div>

        <div style={{ position: "relative", width: "100%", zIndex: 999 }}>
          <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Location / Place</label>
          <input 
            type="text" 
            name="place" 
            value={formData.place} 
            onChange={handleLocationChange}
            placeholder="e.g., Goa, India"
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #b0b0b0", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            required
            autoComplete="off"
          />

          {isDropdownVisible && predictions.length > 0 && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              zIndex: 99999,
              maxHeight: "200px",
              overflowY: "auto",
              boxSizing: "border-box",
              marginTop: "4px"
            }}>
              {predictions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setFormData({ ...formData, place: item.display_name,lat:item.lat,long:item.lon });
                    setIsDropdownVisible(false);
                  }}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    borderBottom: idx !== predictions.length - 1 ? "1px solid #eee" : "none",
                    fontSize: "14px",
                    textAlign: "left",
                    color: "#222",
                    backgroundColor: "#ffffff"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
                >
                  📍 {item.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Price per night (₹)</label>
            <input 
              type="text" 
              name="price" 
              value={formData.price} 
              onChange={handleInputChange}
              placeholder="3500"
              style={{ width: "100%", padding: "12px 14px", border: "1px solid #b0b0b0", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              required />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Initial Rating</label>
            <input 
              type="text" 
              name="rating" 
              value={formData.rating} 
              onChange={handleInputChange}
              placeholder="1 to 5"
              style={{ width: "100%", padding: "12px 14px", border: "1px solid #b0b0b0", borderRadius: "8px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              required />
          </div>
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Property Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleInputChange}
            style={{ 
              width: "100%", 
              padding: "12px 14px", 
              border: "1px solid #b0b0b0", 
              borderRadius: "8px", 
              fontSize: "15px", 
              outline: "none", 
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              cursor: "pointer"
            }}
            required
          >
            <option value="Villa">Villa 🏡</option>
            <option value="Hotel">Hotel 🏨</option>
            <option value="Beach">Beach 🏖️</option>
            <option value="Pool">Pool 🏊</option>
            <option value="Room">Room 🛏️</option>
            <option value="Mountain">Mountain ⛰️</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>
            {isEditMode ? "Change Property Photo " : "Upload your photo"}
          </label>

          {isEditMode && formData.oldPhotoUrl && (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={`${import.meta.env.VITE_API_URL}/${formData.oldPhotoUrl}`}
                alt="Current Home"
                style={{ width: "100px", height: "70px", objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
          )}
          <input 
            type="file" 
            className="user" 
            name="photo"  
            accept="image/jpg, image/jpeg "
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px dashed #b0b0b0", 
              borderRadius: "8px", 
              background: "#fafafa",
              fontSize: "14px",
              cursor: "pointer",
              boxSizing: "border-box"
            }}
            {...(!isEditMode && { required: true })}  />
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px", color: "#222222" }}>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            placeholder="Tell us what makes your place special, the vibes, and nearby attractions..."
            rows="4"
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #b0b0b0", borderRadius: "8px", fontSize: "15px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            required></textarea>
        </div>

        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "14px", 
            background: "#ff385c", 
            color: "#ffffff", 
            border: "none", 
            borderRadius: "8px", 
            fontSize: "16px", 
            fontWeight: "600", 
            cursor: "pointer",
            marginTop: "0.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.background = "#e61e4d"}
          onMouseOut={(e) => e.target.style.background = "#ff385c"}
        >
          {isEditMode ? "Edit Home" : "Add Home"}
        </button>
      </form>
    </div>
  )
}

export default AddHome;