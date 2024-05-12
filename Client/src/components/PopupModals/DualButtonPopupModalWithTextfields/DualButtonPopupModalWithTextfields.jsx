import "./dualButtonPopupModalWithTextfields.css";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {string} props.title - The title text for the modal (required)
 * @returns {JSX.Element} - Renders a single text field component within a popup modal
 */
const PopupModalTextfield = ({ title }) => {
  return (
    <div className="popup-modal-input">
      <div className="popup-modal-input-title">{title}</div>
      <input type="text" className="popup-modal-text-field" />
    </div>
  );
};

/**
 * @component
 * @param {Object} props
 * @param {string} props.title - The title text for the modal (required)
 * @param {string} props.esc - The text for the cancel button (required)
 * @param {string} props.save - The text for the save button (required)
 * @returns {JSX.Element} - Renders the dual button popup modal component with text fields
 */
const DualButtonPopupModalWithTextfields = ({ title, esc, save }) => {
  return (
    <div className="popup-modal-holder">
      <div className="popup-modal-header">
        <div className="popup-modal-title">{title}</div>
        <div className="popup-modal-close">
          <CloseIcon style={{ fill: "#98A2B3" }} />
        </div>
      </div>
      <div className="spacing-height"></div>
      <PopupModalTextfield title="Name" />
      <div className="spacing-height"></div>
      <div className="spacing-height"></div>
      <div className="popup-modal-controllers">
        <button className="white-cancel-button">{esc}</button>
        <button className="blue-save-button">{save}</button>
      </div>
    </div>
  );
};

DualButtonPopupModalWithTextfields.propTypes = {
  title: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  save: PropTypes.string.isRequired,
};

export default DualButtonPopupModalWithTextfields;
