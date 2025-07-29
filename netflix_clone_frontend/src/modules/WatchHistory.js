import React, { useEffect, useState } from "react";
import * as api from "../api";
import { useNavigate } from "react-router-dom";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function WatchHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api.getWatchHistory().then(setRecords).catch(()=>setRecords([]));
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{maxWidth:800,margin:"2em auto"}}>
      <h2>Watch History</h2>
      <table style={{width:"100%",background:"var(--card-bg)",color:"#fff",borderRadius:10,boxShadow:"0 1px 8px #0007",overflow:"hidden",borderCollapse:"collapse"}}>
        <thead>
          <tr style={{background:"#2b2b2b"}}>
            <th style={TH}>Video</th>
            <th style={TH}>Watched At</th>
            <th style={TH}>Progress (sec)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec,i)=>(
            <tr key={i} style={{borderBottom:"1px solid #332"}}>
              <td style={TD}>
                <a style={{color:"var(--primary)",cursor:"pointer"}} onClick={()=>navigate(`/video/${rec.video_id}`)}>
                  {rec.video_id}
                </a>
              </td>
              <td style={TD}>{rec.watched_at}</td>
              <td style={TD}>{rec.progress_seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TH = {padding:"9px 12px",textAlign:"left",fontWeight:700,borderBottom:"1px solid #333"};
const TD = {padding:"7px 12px"};
