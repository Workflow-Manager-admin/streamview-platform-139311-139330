import React, { useEffect, useState } from "react";
import * as api from "../api";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function ParentControl() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getParentalSettings().then(setSettings).catch(()=>setSettings(null));
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!settings) return <div style={{color:"crimson"}}>No parental settings.</div>;

  return (
    <div style={{maxWidth:600,margin:"2em auto"}}>
      <h2>Parental Controls</h2>
      <div style={{background:"var(--card-bg)",padding:"1.2em",borderRadius:10}}>
        <div><b>Enabled:</b> {settings.enabled ? "Yes" : "No"}</div>
        <div><b>Allowed Ratings:</b> {settings.allowed_ratings.join(", ")}</div>
      </div>
    </div>
  );
}
