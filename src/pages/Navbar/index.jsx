import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {useDishes} from "../../context/DishesContext";
import { FaBars } from "react-icons/fa";
import "./index.css";
import Button from "../../components/Button";
import { HiOutlineLogout } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const {setSelectedDishes} = useDishes();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSelectedDishes([]);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="left-links">
        <Link to="/">Poll</Link>
        <Link to="/results">Results</Link>
        {user && user.isAdmin && <Link to="/admin">Admin Panel</Link>}
      </div>
      <div className="right-links">
        <Button
          children={
            <span className="btn-span">
              <HiOutlineLogout className="btn-icon" size={24} /> Logout
            </span>
          }
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
        />{" "}
      </div>
      <span className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </span>
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <Link to="/" onClick={toggleSidebar}>
          Poll
        </Link>
        <Link to="/results" onClick={toggleSidebar}>
          Results
        </Link>
        {user && user.isAdmin && (
          <Link to="/admin" onClick={toggleSidebar}>
            Admin Panel
          </Link>
        )}
        <Button
          children={
            <span>
              <HiOutlineLogout /> Logout
            </span>
          }
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
