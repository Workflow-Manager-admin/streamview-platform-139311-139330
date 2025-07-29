import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function TopNav({ theme, onThemeChange }) {
  const navigate = useNavigate();
  const { isAuthenticated, currentProfile, logout } = useAuth();

  const [search, setSearch] = React.useState("");

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(search)}`);
  }

  return (
    <nav className="top-nav">
      <span className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        StreamView
      </span>
      <form style={{ flex: 1, maxWidth: 340, marginLeft: 18, marginRight: 25 }} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies, series..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 1em",
            borderRadius: 6,
            background: "#232323cf",
            border: "1px solid #3c3c3c",
            color: "#fff",
            fontSize: "1rem"
          }}
        />
      </form>
      <div className="nav-actions">
        {onThemeChange && (
          <button onClick={() => onThemeChange(theme === "light" ? "dark" : "light")} aria-label="Toggle light/dark" style={{
            background:"none",border:"none",color:"#fff",marginRight:9,fontSize:"1.35rem",cursor:"pointer"
          }}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        )}
        {isAuthenticated && currentProfile ? (
          <>
            <span
              style={{
                borderRadius: "100%",
                overflow: "hidden",
                display: "inline-block",
                marginRight: 9,
                width: 34,
                height: 34,
                border: "2px solid #fff"
              }}
              onClick={() => navigate("/profiles")}
              title="Switch profile"
            >
              <img src={currentProfile.avatar || "https://placehold.co/34x34"} alt="profile"
                  width={34} height={34} />
            </span>
            <button className="btn secondary" style={{margin:"0 4px 0 0",padding:"8px 13px",fontSize:"1rem"}}
              onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("/login")}>Sign In</button>
            <button className="btn secondary" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}
