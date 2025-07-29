import React from "react";
import { useAuth } from "./AuthContext";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function Account() {
  const { user, currentProfile, profiles, refreshProfiles } = useAuth();

  return (
    <div style={{maxWidth:680,margin:"2.5em auto"}}>
      <h2>Account</h2>
      <div style={{background:"var(--card-bg)",padding:"1.5em",borderRadius:12,marginBottom:16}}>
        <div><b>User:</b> {user?.full_name} ({user?.email})</div>
        <div><b>Active profile:</b> {currentProfile?.name || "None"}</div>
        <button className="btn" style={{marginTop:16}} onClick={refreshProfiles}>
          Refresh Profiles
        </button>
      </div>
      <div style={{background:"#221f1f99",borderRadius:12,padding:12,marginTop:18}}>
        <b>All Profiles:</b>
        <ul>
          {profiles && profiles.map((p)=>(
            <li key={p.id}>{p.name} <small>({p.id})</small></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
