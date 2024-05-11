import "./dualButtonPopupModalWithTextfields.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function DualButtonPopupModalWithTextfields({ title, esc, save }) {
  return (
    <div className="popup-modal-holder">
      <div className="popup-modal-header">
        <div className="popup-modal-title">{title}</div>
        <div className="popup-modal-close">
          <CloseIcon style={{ fill: "#98A2B3" }} />
        </div>
      </div>
      <div className="spacing-height"></div>
      {PopupModalTextfield()}
      <div className="spacing-height"></div>
      <div className="spacing-height"></div>
      <div className="popup-modal-controllers">
        <button className="white-cancel-button">{esc}</button>
        <button className="blue-save-button">{save}</button>
      </div>
    </div>
  );
}

DualButtonPopupModalWithTextfields.propTypes = {
  title: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  save: PropTypes.string.isRequired,
};

export default DualButtonPopupModalWithTextfields;

function PopupModalTextfield() {
  return (
    <div className="popup-modal-input">
      <div className="popup-modal-input-title">Name</div>
      <input type="text" className="popup-modal-text-field" />
    </div>
  );
}
