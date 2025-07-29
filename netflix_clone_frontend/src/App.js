import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import TopNav from "./modules/TopNav";
import SideNav from "./modules/SideNav";
import Home from "./modules/Home";
import VideoPlayer from "./modules/VideoPlayer";
import Search from "./modules/Search";
import ProfileMenu from "./modules/ProfileMenu";
import Login from "./modules/Login";
import Register from "./modules/Register";
import Account from "./modules/Account";
import Subscription from "./modules/Subscription";
import WatchHistory from "./modules/WatchHistory";
import ParentControl from "./modules/ParentControl";
import { useAuth } from "./modules/AuthContext";

// PUBLIC_INTERFACE
function App() {
  // Implements layout shell, routing and theme switch
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-root">
        <TopNav theme={theme} onThemeChange={setTheme} />
        <div className="main-layout">
          {isAuthenticated && <SideNav />}
          <main className="main-view">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Home /> : <Navigate replace to="/login" />} />
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
              <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
              <Route path="/video/:videoId" element={isAuthenticated ? <VideoPlayer /> : <Navigate to="/login" />} />
              <Route path="/profiles" element={isAuthenticated ? <ProfileMenu /> : <Navigate to="/login" />} />
              <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
              <Route path="/subscription" element={isAuthenticated ? <Subscription /> : <Navigate to="/login" />} />
              <Route path="/history" element={isAuthenticated ? <WatchHistory /> : <Navigate to="/login" />} />
              <Route path="/parental" element={isAuthenticated ? <ParentControl /> : <Navigate to="/login" />} />
              <Route path="*" element={<div style={{textAlign:"center"}}>404 - Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
