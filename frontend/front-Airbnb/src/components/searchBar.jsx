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
    <div style={{ position: "relative", width: "90%", maxWidth: "420px" }}>
      <style>{`
        .searchbar-box {
          margin-top: 28px;
          background-color: #fff;
          border-radius: 999px;
          padding: 10px 10px 10px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          width: 100%;
          box-sizing: border-box;
        }
        .searchbar-input {
          border: none;
          outline: none;
          flex-grow: 1;
          font-size: 15px;
          color: #222;
          background: transparent;
          min-width: 0;
        }
        .searchbar-button {
          background-color: #FF385C;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          font-size: 16px;
          flex-shrink: 0;
        }
        .searchbar-suggestions {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background-color: #fff;
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          z-index: 10;
          overflow: hidden;
          text-align: left;
        }

        @media (max-width: 480px) {
          .searchbar-box {
            margin-top: 18px;
            padding: 8px 8px 8px 16px;
          }
          .searchbar-input {
            font-size: 14px;
          }
          .searchbar-button {
            width: 34px;
            height: 34px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="searchbar-box">
        <input
          type="text"
          placeholder="Search destinations"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
          className="searchbar-input"
        />
        <button
          type="button"
          className="searchbar-button"
        >
          🔍
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <div className="searchbar-suggestions">
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
      src={home.photo}
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
    </div>
  )

}
export default SearchBar