import React from "react";
import "./index.css";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Incidents = () => {
  const maintenanceItems = [
    { id: 1, text: "Mark your maintenance periods" },
    { id: 2, text: "Eliminate any misunderstandings" },
    { id: 3, text: "Stop sending alerts in maintenance windows" },
  ];

  return (
    <div className="maintenance-checklist-main">
      <div className="maintenance-image"></div>
      <div className="maintenance-title">Create a maintenance window to</div>
      <div>
        {maintenanceItems.map((item) => (
          <div key={item.id} className="checklist-item">
            <CheckCircleOutlineIcon color="primary" />
            <div className="checklist-item-text">{item.text}</div>
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        color="primary"
        className="maintenance-checklist-button"
        sx={{ textTransform: "none" }}
      >
        Let&apos;s create your maintenance window
      </Button>
    </div>
  );
};

export default Incidents;
