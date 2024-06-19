import React from "react";
import OpenIt from "../../assets/Images/Icon-open-in-tab-gray.png";

function Host(title, precentage, statusColor, link) {
  return (
    <div className="host-list-item">
      <a href={link} target="_blank">
        <img className="host-list-item-open" src={OpenIt} alt="OpenIt" />
      </a>
      <div className="host-list-item-name">{title}</div>
      <div className="host-list-item-precentage" style={{ color: statusColor }}>
        {precentage}%
      </div>
    </div>
  );
}

export default Host;
