//
// API utility functions to interact with backend REST APIs
//

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001";

// Helper to get access token from local storage
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

// Add JWT token to requests if present
function authHeaders() {
  const token = getAccessToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
}

// -------------------------- AUTH --------------------------
// PUBLIC_INTERFACE
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function register(email, password, full_name) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Not authenticated");
  return await res.json();
}

// -------------------------- PROFILES --------------------------

export async function getProfiles() {
  const res = await fetch(`${API_BASE}/profiles/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Could not load profiles");
  return await res.json();
}

export async function createProfile(name, avatar) {
  const res = await fetch(`${API_BASE}/profiles/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, avatar }),
  });
  if (!res.ok) throw new Error("Could not create profile");
  return await res.json();
}

// -------------------------- VIDEO CATALOG --------------------------

export async function searchVideos({ q = "", genre = "", skip = 0, limit = 20 } = {}) {
  const params = new URLSearchParams({ q, genre, skip, limit });
  const res = await fetch(`${API_BASE}/videos/?${params.toString()}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return await res.json();
}

export async function getVideo(videoId) {
  const res = await fetch(`${API_BASE}/videos/${videoId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch video details");
  return await res.json();
}

// -------------------------- STREAMING --------------------------

export async function getVideoPlaybackInfo(videoId) {
  const res = await fetch(`${API_BASE}/streaming/${videoId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Playback info unavailable");
  return await res.json();
}

// -------------------------- SUBSCRIPTIONS & PAYMENTS --------------------------

export async function getSubscriptionStatus() {
  const res = await fetch(`${API_BASE}/subscriptions/status`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Could not get subscription status");
  return await res.json();
}

// PlanId is dummy since plan/view data comes from backend; for demo purposes
export async function startPayment(planId) {
  const res = await fetch(`${API_BASE}/payments/start`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ plan_id: planId }),
  });
  if (!res.ok) throw new Error("Failed to initiate payment");
  return await res.json();
}

export async function getPaymentHistory() {
  const res = await fetch(`${API_BASE}/payments/history`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Unable to fetch payment history");
  return await res.json();
}

// -------------------------- WATCH HISTORY & RECOMMENDATIONS --------------------------

export async function getWatchHistory() {
  const res = await fetch(`${API_BASE}/history/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Could not get watch history");
  return await res.json();
}

export async function getRecommendations() {
  const res = await fetch(`${API_BASE}/recommendations/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to get recommendations");
  return await res.json();
}

// -------------------------- PARENTAL CONTROLS --------------------------

export async function getParentalSettings() {
  const res = await fetch(`${API_BASE}/parental/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Unable to get parental settings");
  return await res.json();
}
