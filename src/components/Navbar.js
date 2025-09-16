import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        
          <div style={{fontSize:14}}>Car Garage</div>
          <div style={{fontSize:12, color:'#ddd'}}>Management System</div>
       
      </div>

      <nav>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/add">Add Car</NavLink></li>
          <li><NavLink to="/cars">Cars</NavLink></li>
          <li><NavLink to="/reports">Reports</NavLink></li>
          <li><NavLink to="/history">History</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
