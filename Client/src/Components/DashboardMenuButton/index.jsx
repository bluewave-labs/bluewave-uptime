import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Renders a menu button with an icon and title.
 *
 * @component
 * @param {React.ElementType} icon - The icon component to be rendered.
 * @param {string} title - The title of the menu button.
 * @returns {React.ReactElement} The rendered menu button component.
 */

const DashboardMenuButton = (icon, title, to, isActive, onClick) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`icon-container ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <img className="icon" src={icon} alt="Monitors" />
      <div className="text-container">
        <span className="dashboard-menu-text">{title}</span>
      </div>
    </div>
  );
};

export default DashboardMenuButton;
