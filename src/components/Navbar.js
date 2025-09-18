import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  // Custom SVG Icons (since Heroicons is not installed)
  const CogIcon = () => (
    <svg className={navbarStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const BellIcon = () => (
    <svg className={navbarStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
  const navbarStyles = {
    header: "bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    wrapper: "flex justify-between items-center h-16",
    
    // Brand section
    brand: "flex items-center space-x-3 ml-4",
    logo: "w-24 h-26 object-contain flex-shrink-0",
    brandText: "flex flex-col",
    brandTitle: "text-black text-xl font-black leading-tight font-kode",
    brandSubtitle: "text-gray-600 text-xs leading-tight",
    
    // Navigation
    nav: "flex items-center justify-center flex-1",
    navList: "flex space-x-1",
    
    // Action icons
    actions: "flex items-center space-x-4 mr-4",
    iconButton: "p-2 rounded-full text-gray-600 hover:bg-gray-50 hover:text-black transition-colors duration-200",
    icon: "w-5 h-5"
  };

  // NavLink styling function
  const getLinkClassName = ({ isActive }) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-light transition-colors duration-200";
    const activeClasses = "bg-gray-100 text-black";
    const inactiveClasses = "text-black hover:bg-gray-50";
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <div className={navbarStyles.wrapper}>
          {/* Brand Section - Left */}
          <div className={navbarStyles.brand}>
            <img 
              src="/ie.png" 
              alt="Logo" 
              className={navbarStyles.logo}
            />
            <div className={navbarStyles.brandText}>
              <div className={navbarStyles.brandTitle}>
                Car Garage
              </div>
              <div className={navbarStyles.brandSubtitle}>
                Management System
              </div>
            </div>
          </div>

          {/* Navigation Links - Center */}
          <nav className={navbarStyles.nav}>
            <ul className={navbarStyles.navList}>
              <li>
                <NavLink to="/" className={getLinkClassName}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" className={getLinkClassName}>
                  Add Car
                </NavLink>
              </li>
              <li>
                <NavLink to="/cars" className={getLinkClassName}>
                  Cars
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={getLinkClassName}>
                  Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className={getLinkClassName}>
                  History
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Action Icons - Right */}
          <div className={navbarStyles.actions}>
            <button className={navbarStyles.iconButton}>
              <CogIcon />
            </button>
            <button className={navbarStyles.iconButton}>
              <BellIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}