import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./../style/netflix-theme.css";

// PUBLIC_INTERFACE
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(form.email, form.password, form.full_name);
      navigate("/");
    } catch (e) {
      setErr("Registration failed.");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", background: "var(--secondary)", borderRadius: 12, padding: 24, boxShadow: "0 4px 32px #0007" }}>
      <h2 style={{ color: "var(--primary)", marginBottom: 8, textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          required
          value={form.full_name}
          onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
          placeholder="Full Name"
          style={INPUT}
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Email"
          style={INPUT}
        />
        <input
          required
          type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          style={INPUT}
        />
        <button className="btn" style={{ width: "100%", marginTop: 16 }}>
          Register
        </button>
        {err && <div style={{ color: "crimson", fontSize: 13, marginTop: 8 }}>{err}</div>}
        <div style={{ marginTop: 18, textAlign:"center" }}>
          Have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}

const INPUT = {
  width: "100%",
  padding: "12px 1em",
  margin: "10px 0",
  borderRadius: 8,
  border: "1px solid #3c3c3c",
  fontSize: "1.09rem",
  background: "#2227",
  color: "#fff"
};
