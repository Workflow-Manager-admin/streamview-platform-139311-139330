import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import * as api from "../api";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function ProfileMenu() {
  const { profiles, currentProfile, pickProfile, refreshProfiles } = useAuth();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [err, setErr] = useState("");

  async function handleAddProfile(e) {
    e.preventDefault();
    try {
      await api.createProfile(name, avatar || "https://placehold.co/64x64");
      await refreshProfiles();
      setAddOpen(false);
      setName(""); setAvatar("");
      setErr("");
    } catch (e) {
      setErr("Could not add profile");
    }
  }

  return (
    <div style={{maxWidth: 600, margin:"40px auto", textAlign:"center"}}>
      <h2 style={{color:"var(--primary)"}}>Who's watching?</h2>
      <div style={{display:"flex",gap:"2em",flexWrap:"wrap",justifyContent:"center",margin:"2em 0"}}>
        {profiles && profiles.map(p => (
          <div key={p.id} onClick={() => pickProfile(p.id)}
              style={{
                cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
                border: currentProfile?.id === p.id ? "2px solid var(--primary)" : "2px solid #444",
                borderRadius: 10,
                padding: "12px 16px",
                transition:"border .15s" }}>
            <img src={p.avatar || "https://placehold.co/64x64"} alt={p.name} width={64} height={64}
                 style={{borderRadius: "100%", marginBottom:6}}/>
            <div style={{fontWeight:600,marginTop:2,fontSize:"1.1rem"}}>{p.name}</div>
          </div>
        ))}
        <div onClick={()=>setAddOpen(true)} style={{
          cursor:"pointer",border:"2px dashed #888",borderRadius:10,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          width:84,height:92,fontSize:"2.4em",color:"var(--primary)",marginTop:5
        }}>+</div>
      </div>
      {addOpen && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={handleAddProfile}>
            <div style={{fontWeight:"bold",fontSize:"1.1em",marginBottom:6}}>Add Profile</div>
            <input required placeholder="Name" style={PFIELD} value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Avatar URL" style={PFIELD} value={avatar} onChange={e=>setAvatar(e.target.value)} />
            <button className="btn" style={{width: "100%", marginTop: "1em"}}>Create</button>
            <button className="btn secondary" style={{width:"100%", marginTop:"0.4em"}} type="button" onClick={()=>setAddOpen(false)}>Cancel</button>
            {err && <div style={{ color: "crimson", fontSize: 13, marginTop: 7 }}>{err}</div>}
          </form>
        </div>
      )}
    </div>
  );
}
const PFIELD = {
  width: "100%",
  padding: "10px 1em",
  margin: "7px 0",
  borderRadius: 6,
  border: "1px solid #3c3c3c",
  fontSize: "1.06rem",
};
