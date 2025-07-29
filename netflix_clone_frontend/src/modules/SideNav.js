import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaListUl, FaHistory, FaMoneyCheck, FaUserShield, FaUserCog } from "react-icons/fa";
import "./../style/netflix-theme.css";

const navs = [
  { path: "/", icon: <FaHome />, label: "Home" },
  { path: "/search", icon: <FaSearch />, label: "Search" },
  { path: "/profiles", icon: <FaUserCog />, label: "Profiles" },
  { path: "/account", icon: <FaUser />, label: "Account" },
  { path: "/history", icon: <FaHistory />, label: "History" },
  { path: "/subscription", icon: <FaMoneyCheck />, label: "Subscription" },
  { path: "/parental", icon: <FaUserShield />, label: "Parental" },
];

export default function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="sidenav">
      {navs.map(nav => (
        <button
          key={nav.path}
          className={`nav-item${location.pathname === nav.path ? " active" : ""}`}
          onClick={() => navigate(nav.path)}
          title={nav.label}
        >
          {nav.icon}
        </button>
      ))}
    </aside>
  );
}
