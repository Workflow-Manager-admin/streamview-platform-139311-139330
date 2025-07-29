import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../api";
import "./../style/netflix-theme.css";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

// PUBLIC_INTERFACE
export default function Search() {
  const [results, setResults] = useState([]);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const qin = query.get("q") || "";
    setQ(qin);
    setGenre(query.get("genre") || "");
    setLoading(true);
    api.searchVideos({
      q: qin,
      genre: query.get("genre") || "",
    }).then(data => {
      setResults(data);
      setLoading(false);
    });
  }, [window.location.search]); // Rerun when search params change

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}&genre=${encodeURIComponent(genre)}`);
    // Will trigger useEffect due to window.location.search change
  }

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2em 1.3em" }}>
      <form onSubmit={handleSubmit} style={{ display:"flex", gap:"1em", marginBottom:"1em"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search videos" style={SINPUT}/>
        <select value={genre} onChange={e=>setGenre(e.target.value)} style={SINPUT}>
          <option value="">All Genres</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Documentary</option>
          <option>Comedy</option>
        </select>
        <button className="btn" style={{padding:"0.6em 1.6em"}}>Search</button>
      </form>
      {loading && <div style={{color:"#bbb"}}>Searching...</div>}
      <div className="grid">
        {!loading &&
          results.map(vid => (
            <div
              className="card"
              key={vid.id}
              onClick={() => navigate(`/video/${vid.id}`)}
              title={vid.title}
            >
              <img src={vid.thumbnail} alt={vid.title} className="card-thumb" />
              <div className="card-info">
                <b>{vid.title}</b>
                <div style={{ fontSize: "0.97em", color: "#c0c0c0" }}>
                  {vid.genre} &bull; {vid.release_year}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const SINPUT = {
  fontSize: "1.11rem",
  border: "1px solid #2f2f2f",
  borderRadius: 6,
  padding: "12px",
  flex: "1 1 0",
  background: "#282828",
  color: "#fff"
};
