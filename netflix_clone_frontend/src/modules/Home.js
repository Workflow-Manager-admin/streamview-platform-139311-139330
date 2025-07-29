import React, { useEffect, useState } from "react";
import * as api from "../api";
import { useNavigate } from "react-router-dom";
import "./../style/netflix-theme.css";

// Carousel component for horizontal scrolling
function Carousel({ title, videos }) {
  const navigate = useNavigate();

  return (
    <div className="carousel">
      <div className="carousel-title">{title}</div>
      <div className="carousel-row">
        {videos.map((vid) => (
          <div className="card" key={vid.id} onClick={() => navigate(`/video/${vid.id}`)}>
            <img src={vid.thumbnail} alt={vid.title} className="card-thumb" />
            <div className="card-info">
              <b>{vid.title}</b>
              <div style={{fontSize:"0.96em", color:"#c0c0c0"}}>{vid.genre} &bull; {vid.release_year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Home() {
  // top video, genre carousels, recs
  const [featured, setFeatured] = useState(null);
  const [byGenre, setByGenre] = useState({});
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load featured video
    api.searchVideos({limit: 8}).then(list => {
      if (list[0]) setFeatured(list[0]);
    });
    // Recs
    api.getRecommendations().then(data => setRecs(data)).catch(()=>{});
    // Load by genres (sample selection)
    Promise.all([
      api.searchVideos({genre:"Action",limit:8}),
      api.searchVideos({genre:"Drama",limit:8}),
      api.searchVideos({genre:"Documentary",limit:6}),
      api.searchVideos({genre:"Comedy",limit:8}),
    ]).then(([action,drama,doc,comedy]) => {
      setByGenre({
        "Action": action,
        "Drama": drama,
        "Documentary": doc,
        "Comedy": comedy,
      });
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ width:"100%", margin:"0 auto" }}>
      {featured && (
        <section className="featured-banner" style={{
          background: `var(--banner-gradient), url('${featured.thumbnail}') center/cover no-repeat`
        }}>
          <div>
            <div className="banner-title">{featured.title}</div>
            <div className="banner-desc">{featured.description}</div>
            <div className="banner-actions">
              <a href={`/video/${featured.id}`}>
                <button className="banner-btn" style={{fontSize: "1.22rem"}}>▶ Play</button>
              </a>
              <a href={`/search?genre=${encodeURIComponent(featured.genre)}`}>
                <button className="banner-btn secondary">More Like This</button>
              </a>
            </div>
          </div>
        </section>
      )}
      {loading && <div style={{textAlign:"center",color:"#999",margin:"2em"}}>Loading...</div>}
      {!loading && (
        <>
          {recs && recs.length > 0 && (
            <Carousel title="Recommended for You" videos={recs.map(r=>({id:r.video_id,title:r.title,thumbnail:featured?.thumbnail||"",genre:"",release_year:""}))} />
          )}
          {Object.entries(byGenre).map(([genre, vids]) =>
            vids.length > 0 ? <Carousel key={genre} title={genre} videos={vids} /> : null
          )}
        </>
      )}
    </div>
  );
}
