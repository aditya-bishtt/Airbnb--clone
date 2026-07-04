import {useState} from "react"
import {Link} from "react-router-dom"
let debouncerTimer;
const SearchBar=({registredHomes})=>{
  const [searchQuery,setSearchQuery]=useState("")
  const [suggestions,setSuggestions]=useState([])
  const [showSuggestions,setShowSuggestions]=useState(false);

  const handleSearchChange=(e)=>{
const value=e.target.value;
setSearchQuery(value);
if(debouncerTimer){
  clearTimeout(debouncerTimer);
}
if(value.trim().length>2){
  debouncerTimer=setTimeout(()=>{
    const matches=registredHomes.filter(home=>{
       return home.title?.toLowerCase().includes(value.toLowerCase()) ||
          home.place?.toLowerCase().includes(value.toLowerCase())
    }).slice(0,5);

    if(matches.length>0){
      setSuggestions(matches)
      setShowSuggestions(true)
    }
    else{
      setSuggestions([])
      setShowSuggestions(false)
    }
  },400)
}else{
      setSuggestions([])
      setShowSuggestions(false)}
  }
  return (
    <div style={{
      marginTop: "28px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      padding: "10px 10px 10px 24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      width: "90%",
      maxWidth: "420px",
      position: "relative"
    }}>
      <input
        type="text"
        placeholder="Search destinations"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
        style={{
          border: "none",
          outline: "none",
          flexGrow: 1,
          fontSize: "15px",
          color: "#222",
          background: "transparent"
        }}
      />
      <button
        type="button"
        style={{
          backgroundColor: "#FF385C",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          fontSize: "16px"
        }}
      >
        🔍
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          borderRadius: "14px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          zIndex: 10,
          overflow: "hidden",
          textAlign: "left"
        }}>
          {suggestions.map(home => (
           <Link
  key={home._id}
  to={`/details/${home._id}`}
  onClick={() => setShowSuggestions(false)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#222",
    borderBottom: "1px solid #f0f0f0",
    textDecoration: "none"
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
>
  <img
    src={`http://localhost:8080${home.photo}`}
    alt={home.title}
    style={{
      width: "48px",
      height: "48px",
      borderRadius: "8px",
      objectFit: "cover",
      flexShrink: 0
    }}
  />
  <div style={{ display: "flex", flexDirection: "column" }}>
    <span style={{ fontWeight: "600" }}>{home.title}</span>
    <span style={{ fontSize: "12px", color: "#717171" }}>📍 {home.place}</span>
  </div>
</Link>
          ))}
        </div>
      )}
    </div>
  )

}
export default SearchBar