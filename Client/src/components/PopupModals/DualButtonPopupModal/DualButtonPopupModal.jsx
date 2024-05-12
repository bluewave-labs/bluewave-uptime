import "./dualButtonPopupModal.css";
import React from "react";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {boolean} [props.open=true] - Controls the visibility of the modal (defaults to true)
 * @param {string} props.subject - The title text for the modal (required)
 * @param {string} props.description - The description text for the modal (required)
 * @param {string} props.esc - The text for the discard button (usually "Cancel", "Dismiss" or "Discard") (required)
 * @param {string} props.save - The text for the save button (required)
 * @returns {JSX.Element} - Renders the dual button popup modal component
 */
const DualButtonPopupModal = ({
  open = true,
  subject,
  description,
  esc,
  save,
}) => {
  return (
    <div className="dual-button-popup-modal-holder">
      <div className="dual-button-popup-modal-subject">{subject}</div>
      <div className="dual-button-popup-modal-description">{description}</div>
      <div className="dual-modal-spacing"></div>
      <div className="dual-button-popup-modal-controllers">
        <button className="transparent-discard-button">{esc}</button>
        <button className="blue-save-button">{save}</button>
      </div>
    </div>
  );
};

DualButtonPopupModal.propTypes = {
  open: PropTypes.bool,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  save: PropTypes.string.isRequired,
};

export default DualButtonPopupModal;
