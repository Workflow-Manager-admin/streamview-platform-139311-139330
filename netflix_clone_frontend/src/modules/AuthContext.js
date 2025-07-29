import React, { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api";

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    // Try to load user and profile if token present
    const token = api.getAccessToken();
    if (token) {
      api
        .getCurrentUser()
        .then((usr) => setUser(usr))
        .catch(() => setUser(null));
      api
        .getProfiles()
        .then(setProfiles)
        .catch(() => setProfiles([]));
    }
    setAuthReady(true);
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("access_token", data.access_token);
    const usr = await api.getCurrentUser();
    setUser(usr);
    const profs = await api.getProfiles();
    setProfiles(profs);
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setProfiles([]);
    setCurrentProfile(null);
  };

  // PUBLIC_INTERFACE
  const register = async (email, password, full_name) => {
    const resp = await api.register(email, password, full_name);
    // Auto login after registration:
    await login(email, password);
    return resp;
  };

  // PUBLIC_INTERFACE
  const pickProfile = async (profileId) => {
    if (!profiles.length) return;
    const found = profiles.find((p) => String(p.id) === String(profileId));
    setCurrentProfile(found || profiles[0]);
  };

  // PUBLIC_INTERFACE
  const refreshProfiles = async () => {
    const profs = await api.getProfiles();
    setProfiles(profs);
    if (!currentProfile && profs.length > 0)
      setCurrentProfile(profs[0]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        profiles,
        currentProfile,
        pickProfile,
        refreshProfiles,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom React hook for using AuthContext
// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
