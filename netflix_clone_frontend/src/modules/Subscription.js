import React, { useEffect, useState } from "react";
import * as api from "../api";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function Subscription() {
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("1");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.getSubscriptionStatus().then(setStatus).catch(()=>{});
    api.getPaymentHistory().then(setHistory).catch(()=>{});
    setLoading(false);
  }, []);

  async function handlePayment() {
    setMessage("");
    try {
      await api.startPayment(Number(plan));
      setMessage("Payment initiated!");
    } catch (e) {
      setMessage("Could not start payment.");
    }
  }

  return (
    <div style={{maxWidth:650,margin:"0 auto",padding:"2em"}}>
      <h2>Subscription & Billing</h2>
      {loading && <div>Loading...</div>}
      <div style={{margin:"2em 0"}}>
        {status && (
          <div style={{
            background: "var(--card-bg)", borderRadius: 10, padding: "1em 1.5em", boxShadow: "0 2px 12px #0003"
          }}>
            <b>Current Plan:</b> {status.plan_name}<br/>
            <b>Status:</b>{" "}
            <span style={{color: status.is_active?"lime":"crimson", fontWeight:700}}>{status.is_active?"Active":"Inactive"}</span>
            <br/>
            <b>Expires:</b> {status.expires_at}
          </div>
        )}
      </div>
      <hr/>
      <h3>Start New Payment</h3>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <label>
          Plan ID:
          <input style={{width:55,marginLeft:8}} value={plan} onChange={e=>setPlan(e.target.value)} type="number" min={1} />
        </label>
        <button className="btn" style={{marginLeft:12}} onClick={handlePayment}>Pay</button>
        {message && <span style={{marginLeft:16}}>{message}</span>}
      </div>
      <h3>Payment History</h3>
      <ul style={{paddingLeft:12}}>
        {history.map((rec,i)=><li key={i}>{rec.status} - {rec.message}</li>)}
      </ul>
    </div>
  );
}
