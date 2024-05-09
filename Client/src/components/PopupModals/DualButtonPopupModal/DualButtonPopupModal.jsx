import "./dualButtonPopupModal.css";
import React from "react";

function DualButtonPopupModal({ open = true }) {
  return (
    <div className="dual-button-popup-modal-holder">
      <div className="dual-button-popup-modal-subject">Unsaved changes</div>
      <div className="dual-button-popup-modal-description">
        Do you want to save or discard changes?
      </div>
      <div className="dual-modal-spacing"></div>
      <div className="dual-button-popup-modal-controllers">
        <button className="transparent-discard-button">Discard</button>
        <button className="blue-save-button">Save changes</button>
      </div>
    </div>
  );
}

export default DualButtonPopupModal;
