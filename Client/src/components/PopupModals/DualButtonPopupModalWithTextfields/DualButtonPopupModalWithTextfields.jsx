import "./dualButtonPopupModalWithTextfields.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

function DualButtonPopupModalWithTextfields() {
  return (
    <div className="popup-modal-holder">
      <div className="popup-modal-header">
        <div className="popup-modal-title">Create new organization</div>
        <div className="popup-modal-close">
          <CloseIcon style={{ fill: "#98A2B3" }} />
        </div>
      </div>
      <div className="spacing-height"></div>
      {PopupModalTextfield()}
      <div className="spacing-height"></div>
      <div className="spacing-height"></div>
      <div className="popup-modal-controllers">
        <button className="white-cancel-button">Cancel</button>
        <button className="blue-save-button">Save</button>
      </div>
    </div>
  );
}

export default DualButtonPopupModalWithTextfields;

function PopupModalTextfield() {
  return (
    <div className="popup-modal-input">
      <div className="popup-modal-input-title">Name</div>
      <input type="text" className="popup-modal-text-field" />
    </div>
  );
}
