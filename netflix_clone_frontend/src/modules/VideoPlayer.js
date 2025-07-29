import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../api";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function VideoPlayer() {
  const { videoId } = useParams();
  const [meta, setMeta] = useState(null);
  const [playInfo, setPlayInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    api.getVideo(videoId)
      .then(setMeta)
      .catch(() => setErr("Video unavailable."));
    api.getVideoPlaybackInfo(videoId)
      .then(setPlayInfo)
      .catch(() => setErr("Could not load playback info."));
    setLoading(false);
  }, [videoId]);

  if (err) return <div style={{padding: 60, color:"crimson"}}>{err}</div>;
  if (loading || !meta || !playInfo)
    return <div style={{textAlign:"center", margin:50, color:"#999"}}>Loading player...</div>;

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "2.3em 0" }}>
      <Link to="/" style={{color:"var(--primary)", fontWeight:600,marginBottom:12,display:"inline-block"}}>&larr; Back</Link>
      <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 60px #0007" }}>
        {/* Real player would use DRM/streaming/hls solution; use <video> for demo */}
        <video
          src={playInfo.video_url}
          controls
          poster={meta.thumbnail}
          style={{ width: "100%", background: "#000" }}
        />
      </div>
      <div style={{marginTop: "1.4em"}}>
        <h2 style={{color:"var(--accent)",fontWeight:"bold",marginBottom:5}}>{meta.title}</h2>
        <div style={{color:"#dde", opacity:0.93, marginBottom:4, fontSize:"1.07em"}}>
          {meta.genre} &bull; {meta.release_year} &bull; {meta.duration} min
        </div>
        <div style={{color:"#ccc", margin:"8px 0 3px 0"}}>
          {meta.description}
        </div>
      </div>
    </div>
  );
}
