import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navigation.css";
import useRole from "./UseRole";

const Navigation = () => {
  const navigate = useNavigate();
  const {role} = useRole(); 
  
  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate("/"); 
  };

  const navItems = {
    admin: [
      { name: "Podkasti i Epizode", path: "/podkasti" },
      { name: "Korisnici", path: "/korisnici" },
      { name: "Kategorije Podkasta", path: "/kategorije" },
    ],
    creator: [
      { name: "Svi Podkasti", path: "/podkasti" },
      { name: "Kreiraj Podkast", path: "/add-podcast" },
      { name: "Naš Nalog", path: "/my-account" },

    ],
    viewer: [
      { name: "Svi Podkasti", path: "/podkasti" },
      { name: "Omiljeni Podkasti", path: "/omiljeni-podkasti" },
    ],
  };

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return navItems.admin;
      case "creator":
        return navItems.creator;
      case "viewer":
        return navItems.viewer;
      default:
        return [];
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <h1 className="nav-logo">Podkast Platforma</h1>
      </div>
      <ul className="nav-links">
        {getNavItems().map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.path} className="nav-link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
